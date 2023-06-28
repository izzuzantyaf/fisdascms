// prettier-ignore
import { Box, Heading, SimpleGrid, Skeleton, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Switch, Input, Flex, useToast, Square, Link, FormLabel, FormControl, FormHelperText, FormErrorMessage, Icon, ListItem, OrderedList } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { languageCodeMapper } from "../core/lib/helpers/language-code-mapper.helper"
import { handoutService } from "../core/services/handout.service"
import { repeatElement } from "../core/lib/helpers/repeat-element.helper"
import {
  Handout,
  HandoutValidationError,
  UpdateHandoutDto,
} from "../core/types/handout.type"

export default function HandoutPage() {
  const [handoutsState, setHandoutState] = useState<Handout[]>()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const onEditingHandoutRef = useRef<Handout>()
  const toast = useToast()
  const [isHandoutUpdating, setIsHandoutUpdating] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  const [validationError, setValidationError] =
    useState<HandoutValidationError>()

  const getHandouts = async () => {
    const handouts = await handoutService.getAll()
    setHandoutState(handouts)
  }

  const handleHandoutUpdate = async () => {
    setIsHandoutUpdating(true)
    const handoutUpdateResponse = await handoutService.update({
      _id: onEditingHandoutRef.current?._id,
      isActive: onEditingHandoutRef.current?.isActive,
      url: onEditingHandoutRef.current?.url,
    } as UpdateHandoutDto)
    setIsHandoutUpdating(false)
    if (!handoutUpdateResponse.isSuccess) {
      setValidationError(handoutUpdateResponse.data.validationErrors)
      //! munculkan pesan error
      toast({
        status: "error",
        title: handoutUpdateResponse.message,
      })
      return
    }
    const updatedHandout = handoutUpdateResponse.data
    setHandoutState((prevState) =>
      prevState?.map((state) =>
        state._id === updatedHandout._id ? updatedHandout : state
      )
    )
    // munculkan pesan sukses
    toast({
      status: "success",
      title: handoutUpdateResponse.message,
    })
    setValidationError(undefined)
    onClose()
  }

  useEffect(() => {
    getHandouts()
  }, [])

  return (
    <>
      <Head>
        <title>Modul Praktikum | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Modul Praktikum</Heading>
        <SimpleGrid columns={[1, 2, 2, 4]} gap="4" marginTop="4">
          {handoutsState?.map((handout) => (
            <Box padding="4" {...shadowedBoxStyle} key={handout._id}>
              <Flex alignItems="center">
                <Square
                  fontSize="xl"
                  bgColor="blue.50"
                  color="blue.500"
                  size="40px"
                  borderRadius="full"
                  marginRight="4"
                >
                  <FontAwesomeIcon icon="book" />
                </Square>
                <Box>
                  <Heading size="md">{handout?.faculty?.toUpperCase()}</Heading>
                  <Text>{languageCodeMapper(handout.language)}</Text>
                </Box>
              </Flex>

              <Flex direction="column" marginTop="4" gap="2">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>File</Text>
                  <Link href={handout.url} isExternal={true} fontSize="xs">
                    Buka <FontAwesomeIcon icon="arrow-up-right-from-square" />
                  </Link>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Perlihatkan</Text>
                  <Box
                    bgColor={handout.isActive ? "green.100" : "gray.100"}
                    color={handout.isActive ? "green.500" : "gray.500"}
                    borderRadius="full"
                    paddingX="2"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    {handout.isActive ? "Aktif" : "Nonaktif"}
                  </Box>
                </Flex>
              </Flex>

              <Button
                width="full"
                marginTop="4"
                onClick={() => {
                  onEditingHandoutRef.current = { ...handout }
                  setCanUpdate(false)
                  setValidationError(undefined)
                  onOpen()
                }}
                colorScheme="blue"
              >
                Edit modul
              </Button>
            </Box>
          )) ??
            repeatElement(
              <Skeleton
                isLoaded={handoutsState ? true : false}
                rounded="xl"
                height="200px"
              />,
              4
            )}
        </SimpleGrid>

        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <ModalHeader>Edit Modul</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex alignItems="center">
                <Square
                  fontSize="xl"
                  bgColor="blue.50"
                  color="blue.500"
                  size="40px"
                  borderRadius="full"
                  marginRight="4"
                >
                  <FontAwesomeIcon icon="book" />
                </Square>
                <Box>
                  <Heading size="md">
                    Modul {onEditingHandoutRef.current?.faculty?.toUpperCase()}
                  </Heading>
                  <Text>
                    {languageCodeMapper(onEditingHandoutRef.current?.language)}
                  </Text>
                </Box>
              </Flex>
              <Box
                className="guide"
                bgColor="blue.50"
                padding="8px"
                paddingX="12px"
                borderRadius="8px"
                marginTop="16px"
              >
                <Box
                  className="guide-header"
                  display="flex"
                  alignItems="center"
                >
                  <Icon marginRight="8px" color="blue.500" fontSize="xl">
                    <FontAwesomeIcon icon="circle-info" />
                  </Icon>
                  <Heading size="sm" color="gray.600">
                    Petunjuk
                  </Heading>
                </Box>
                <OrderedList fontSize="14px" marginTop="8px">
                  <ListItem>
                    Upload modul praktikum (pdf) ke Google Drive
                  </ListItem>
                  <ListItem>Ubah akses file menjadi public</ListItem>
                  <ListItem>
                    Copy paste link modul praktikum ke field di bawah ini
                  </ListItem>
                </OrderedList>
              </Box>
              <form id="handout-form" style={{ marginTop: "16px" }}>
                <FormControl isInvalid={validationError?.url ? true : false}>
                  <FormLabel>Link File</FormLabel>
                  <Input
                    type="url"
                    placeholder="Link file modul"
                    defaultValue={onEditingHandoutRef.current?.url}
                    onFocus={(e) => {
                      e.target.select()
                    }}
                    onChange={(e) => {
                      if (onEditingHandoutRef.current)
                        onEditingHandoutRef.current.url = e.target.value
                      setCanUpdate(true)
                    }}
                  />
                  {validationError?.url ? (
                    <FormErrorMessage>{validationError.url}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="2"
                  marginTop="4"
                >
                  <Box>
                    <FormLabel>Perlihatkan</FormLabel>
                    <FormHelperText>
                      Tampilkan modul agar dapat diakses oleh praktikan
                    </FormHelperText>
                  </Box>
                  <Switch
                    defaultChecked={onEditingHandoutRef.current?.isActive}
                    colorScheme="green"
                    onChange={(e) => {
                      if (onEditingHandoutRef.current)
                        onEditingHandoutRef.current.isActive =
                          !onEditingHandoutRef.current?.isActive
                      setCanUpdate(true)
                    }}
                  />
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                form="handout-form"
                type="submit"
                isLoading={isHandoutUpdating}
                isDisabled={!canUpdate}
                colorScheme="blue"
                width="full"
                onClick={(e) => {
                  e.preventDefault()
                  handleHandoutUpdate()
                }}
              >
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageLayout>
    </>
  )
}
