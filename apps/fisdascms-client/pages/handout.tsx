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
} from "@chakra-ui/react"
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
    setIsHandoutUpdating(false)
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
    getHandouts()
    onClose()
  }

  useEffect(() => {
    console.log(handoutsState)
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
              <Heading size="md">{handout.faculty.toUpperCase()}</Heading>
              <Text>{languageCodeMapper(handout.language)}</Text>
              <Button
                width="full"
                marginTop="4"
                onClick={() => {
                  setOnEditingHandout(
                    handoutsState.find(
                      (handoutState) => handoutState._id === handout._id
                    )
                  )
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
                height="100px"
              />,
              4
            )}
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent marginX="4">
            <form action="#">
              <ModalHeader>Edit Modul</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading size="sm">Fakultas</Heading>
                <Text>{onEditingHandout?.faculty.toUpperCase()}</Text>
                <Heading size="sm" marginTop="4">
                  Bahasa
                </Heading>
                <Text>{languageCodeMapper(onEditingHandout?.language)}</Text>
                <Flex alignItems="center" marginTop="4">
                  <Box>
                    <Heading size="sm">Status</Heading>
                    <Text>
                      {onEditingHandout?.isActive ? "Aktif" : "Nonaktif"}
                    </Text>
                  </Box>
                  <Spacer />
                  <Switch
                    defaultChecked={onEditingHandout?.isActive}
                    colorScheme="green"
                    onChange={(e) => {
                      setOnEditingHandout({
                        ...onEditingHandout,
                        isActive: !onEditingHandout?.isActive,
                      })
                    }}
                  />
                </Flex>
                <Heading size="sm" marginTop="4">
                  Link dokumen
                </Heading>
                <Input
                  type="url"
                  placeholder="Link dokumen"
                  defaultValue={onEditingHandout?.url}
                  onFocus={(e) => {
                    e.target.select()
                  }}
                  onChange={(e) => {
                    setOnEditingHandout({
                      ...onEditingHandout,
                      url: e.target.value,
                    })
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={isHandoutUpdating}
                  colorScheme="blue"
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
