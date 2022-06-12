import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Square,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import { useEffect, useState } from "react"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { languageCodeMapper } from "../lib/language-code-mapper"
import { renderSkeleton } from "../lib/render-skeleton"
import { practicumMaterialService } from "../services/practicum-material.service"

export default function PracticumMaterialPage() {
  const [practicumMaterialState, setPracticumMaterialState] =
    useState<object[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [onEditingMaterial, setOnEditingMaterial] = useState<object>()
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()

  const getPracticumMaterials = async () => {
    setPracticumMaterialState(await practicumMaterialService.getAll())
  }

  useEffect(() => {
    getPracticumMaterials()
  }, [])

  return (
    <>
      <Head>
        <title>Konten Praktikum | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Konten praktikum</Heading>
        <SimpleGrid columns={[1, 2, 2, 4]} gap="4" marginTop="4">
          {practicumMaterialState?.map((practicumMaterial) => (
            <Box padding="4" {...shadowedBoxStyle} key={practicumMaterial._id}>
              <Flex alignItems="center">
                <Square
                  fontSize="xl"
                  bgColor="blue.50"
                  color="blue.500"
                  size="40px"
                  borderRadius="full"
                  marginRight="4"
                >
                  <FontAwesomeIcon icon={practicumMaterial.faIconName} />
                </Square>
                <Box>
                  <Heading size="md">{practicumMaterial.code}</Heading>
                  <Text>{languageCodeMapper(practicumMaterial.language)}</Text>
                </Box>
              </Flex>

              <Flex direction="column" marginTop="4" gap="2">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Soal TP</Text>
                  <Box
                    bgColor={
                      practicumMaterial.preTask.isActive
                        ? "green.100"
                        : "gray.100"
                    }
                    color={
                      practicumMaterial.preTask.isActive
                        ? "green.500"
                        : "gray.500"
                    }
                    borderRadius="full"
                    paddingX="2"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    {practicumMaterial.preTask.isActive ? "Aktif" : "Nonaktif"}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Video</Text>
                  <Box
                    bgColor={
                      practicumMaterial.video.isActive
                        ? "green.100"
                        : "gray.100"
                    }
                    color={
                      practicumMaterial.video.isActive
                        ? "green.500"
                        : "gray.500"
                    }
                    borderRadius="full"
                    paddingX="2"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    {practicumMaterial.video.isActive ? "Aktif" : "Nonaktif"}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Cover jurnal</Text>
                  <Box
                    bgColor={
                      practicumMaterial.journalCover.isActive
                        ? "green.100"
                        : "gray.100"
                    }
                    color={
                      practicumMaterial.journalCover.isActive
                        ? "green.500"
                        : "gray.500"
                    }
                    borderRadius="full"
                    paddingX="2"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    {practicumMaterial.journalCover.isActive
                      ? "Aktif"
                      : "Nonaktif"}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Simulator</Text>
                  <Box
                    bgColor={
                      practicumMaterial.simulator.isActive
                        ? "green.100"
                        : "gray.100"
                    }
                    color={
                      practicumMaterial.simulator.isActive
                        ? "green.500"
                        : "gray.500"
                    }
                    borderRadius="full"
                    paddingX="2"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    {practicumMaterial.simulator.isActive
                      ? "Aktif"
                      : "Nonaktif"}
                  </Box>
                </Flex>
              </Flex>

              <Button
                width="full"
                marginTop="4"
                onClick={() => {
                  setOnEditingMaterial(
                    practicumMaterialState.find(
                      (pmState) => pmState._id === practicumMaterial._id
                    )
                  )
                  onOpen()
                }}
                colorScheme="blue"
              >
                Edit konten
              </Button>
            </Box>
          )) ??
            renderSkeleton(
              <Skeleton
                isLoaded={practicumMaterialState ? true : false}
                rounded="xl"
                height="250px"
              />,
              8
            )}
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <form>
              <ModalHeader>Edit konten praktikum</ModalHeader>
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
                    <FontAwesomeIcon icon={onEditingMaterial?.faIconName} />
                  </Square>
                  <Box>
                    <Heading size="md">{onEditingMaterial?.code}</Heading>
                    <Text fontWeight="normal" fontSize="sm">
                      {onEditingMaterial?.name}
                    </Text>
                  </Box>
                </Flex>
                <Flex direction="column" gap="1" marginTop="6">
                  <Text>Link soal TP</Text>
                  <Flex
                    justifyContent="space-between"
                    gap="2"
                    alignItems="center"
                  >
                    <Input
                      type="url"
                      placeholder="Link soal TP"
                      defaultValue={onEditingMaterial?.preTask?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          preTask: {
                            ...onEditingMaterial?.preTask,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                    <Switch
                      defaultChecked={onEditingMaterial?.preTask?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          preTask: {
                            ...onEditingMaterial?.preTask,
                            isActive: !onEditingMaterial?.preTask?.isActive,
                          },
                        })
                      }}
                    />
                  </Flex>
                  <Text>Link video</Text>
                  <Flex
                    justifyContent="space-between"
                    gap="2"
                    alignItems="center"
                  >
                    <Input
                      type="url"
                      placeholder="Link YouTube video praktikum"
                      defaultValue={onEditingMaterial?.video?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          video: {
                            ...onEditingMaterial?.video,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                    <Switch
                      defaultChecked={onEditingMaterial?.video?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          video: {
                            ...onEditingMaterial?.video,
                            isActive: !onEditingMaterial?.video?.isActive,
                          },
                        })
                      }}
                    />
                  </Flex>
                  <Text>Link cover jurnal</Text>
                  <Flex
                    justifyContent="space-between"
                    gap="2"
                    alignItems="center"
                  >
                    <Input
                      type="url"
                      placeholder="Link cover jurnal"
                      defaultValue={onEditingMaterial?.journalCover?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          journalCover: {
                            ...onEditingMaterial?.journalCover,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                    <Switch
                      defaultChecked={onEditingMaterial?.journalCover?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          journalCover: {
                            ...onEditingMaterial?.journalCover,
                            isActive:
                              !onEditingMaterial?.journalCover?.isActive,
                          },
                        })
                      }}
                    />
                  </Flex>
                  <Text>Link Simulator</Text>
                  <Flex
                    justifyContent="space-between"
                    gap="2"
                    alignItems="center"
                  >
                    <Input
                      type="url"
                      placeholder="Link simulator"
                      defaultValue={onEditingMaterial?.simulator?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          simulator: {
                            ...onEditingMaterial?.simulator,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                    <Switch
                      defaultChecked={onEditingMaterial?.simulator?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          simulator: {
                            ...onEditingMaterial?.simulator,
                            isActive: !onEditingMaterial?.simulator?.isActive,
                          },
                        })
                      }}
                    />
                  </Flex>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={isUpdating}
                  colorScheme="blue"
                  width="full"
                  onClick={async (e) => {
                    e.preventDefault()
                    setIsUpdating(true)
                    const response = await practicumMaterialService.update(
                      onEditingMaterial
                    )
                    if (!response?.isSuccess) {
                      toast({
                        title: response.message,
                        status: "error",
                      })
                      return
                    }
                    const { updatedPracticumModule } = response.data
                    setPracticumMaterialState(
                      practicumMaterialState?.map((pmState) =>
                        pmState._id === updatedPracticumModule._id
                          ? updatedPracticumModule
                          : pmState
                      )
                    )
                    toast({
                      title: response.message,
                      status: "success",
                    })
                    setIsUpdating(false)
                    onClose()
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
