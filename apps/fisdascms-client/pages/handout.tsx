import {
  Box,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Switch,
  Input,
  Flex,
  Spacer,
  useToast,
  Square,
  Link,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import { useEffect, useState } from "react"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { languageCodeMapper } from "../lib/language-code-mapper"
import { renderSkeleton } from "../lib/render-skeleton"
import { handoutService } from "../services/handout.service"

export default function HandoutPage() {
  const [handoutsState, setHandoutState] = useState<object[]>()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [onEditingHandout, setOnEditingHandout] = useState<object>()
  const toast = useToast()
  const [isHandoutUpdating, setIsHandoutUpdating] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)

  const getHandouts = async () => {
    const handouts = await handoutService.getAll()
    setHandoutState(handouts)
  }

  const handleHandoutUpdate = async () => {
    setIsHandoutUpdating(true)
    const handoutUpdateResponse = await handoutService.update({
      _id: onEditingHandout._id,
      isActive: onEditingHandout.isActive,
      url: onEditingHandout.url,
    })
    if (!handoutUpdateResponse.isSuccess) {
      //! munculkan pesan error
      toast({
        status: "error",
        title: handoutUpdateResponse.message,
      })
      return
    }
    // munculkan pesan sukses
    toast({
      status: "success",
      title: handoutUpdateResponse.message,
    })
    setIsHandoutUpdating(false)
    getHandouts()
    onClose()
  }

  useEffect(() => {
    getHandouts()
  }, [])

  return (
    <>
      <Head>
        <title>Modul | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Modul</Heading>
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
                  setOnEditingHandout(handout)
                  setCanUpdate(false)
                  onOpen()
                }}
                colorScheme="blue"
              >
                Edit modul
              </Button>
            </Box>
          )) ??
            renderSkeleton(
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
            <form>
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
                      {onEditingHandout?.faculty?.toUpperCase()}
                    </Heading>
                    <Text>
                      {languageCodeMapper(onEditingHandout?.language)}
                    </Text>
                  </Box>
                </Flex>
                <Heading size="sm" marginTop="6">
                  Link File
                </Heading>
                <Input
                  type="url"
                  placeholder="Link dokumen"
                  defaultValue={onEditingHandout?.url}
                  onFocus={(e) => {
                    e.target.select()
                  }}
                  onChange={(e) => {
                    setCanUpdate(true)
                    setOnEditingHandout((prevState) => ({
                      ...prevState,
                      url: e.target.value,
                    }))
                  }}
                />
                <Flex alignItems="center" marginTop="4">
                  <Box>
                    <Heading size="sm">Perlihatkan</Heading>
                    <Text fontSize="sm">
                      Tampilkan modul agar dapat diakses oleh praktikan
                    </Text>
                  </Box>
                  <Spacer />
                  <Switch
                    defaultChecked={onEditingHandout?.isActive}
                    colorScheme="green"
                    onChange={(e) => {
                      setCanUpdate(true)
                      setOnEditingHandout((prevState) => ({
                        ...prevState,
                        isActive: !onEditingHandout?.isActive,
                      }))
                    }}
                  />
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
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
            </form>
          </ModalContent>
        </Modal>
      </PageLayout>
    </>
  )
}
