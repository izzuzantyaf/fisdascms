import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
import { languageCodeMapper } from "../core/lib/helpers/language-code-mapper.helper"
import { practicumMaterialService } from "../core/services/practicum-material.service"
import { repeatElement } from "../core/lib/helpers/repeat-element.helper"

export default function PracticumMaterialPage() {
  const [practicumMaterialState, setPracticumMaterialState] =
    useState<object[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [onEditingMaterial, setOnEditingMaterial] = useState<object>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  const toast = useToast()

  const getPracticumMaterials = async () => {
    setPracticumMaterialState(await practicumMaterialService.getAll())
  }

  const handlePracticumMaterialUpdate = async () => {
    setIsUpdating(true)
    const response = await practicumMaterialService.update(onEditingMaterial)
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
                  setOnEditingMaterial(practicumMaterial)
                  setCanUpdate(false)
                  onOpen()
                }}
                colorScheme="blue"
              >
                Edit konten
              </Button>
            </Box>
          )) ??
            repeatElement(
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

                <Flex direction="column" gap="2" marginTop="6">
                  <FormControl>
                    <FormLabel>Link Soal TP</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link soal TP"
                      defaultValue={onEditingMaterial?.preTask?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          preTask: {
                            ...onEditingMaterial?.preTask,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display="flex"
                    gap="2"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel>Perlihatkan</FormLabel>
                      <FormHelperText>
                        Tampilkan soal TP agar dapat diakses oleh praktikan
                      </FormHelperText>
                    </Box>
                    <Switch
                      defaultChecked={onEditingMaterial?.preTask?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          preTask: {
                            ...onEditingMaterial?.preTask,
                            isActive: !onEditingMaterial?.preTask?.isActive,
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Link Video</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link YouTube video praktikum"
                      defaultValue={onEditingMaterial?.video?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          video: {
                            ...onEditingMaterial?.video,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display="flex"
                    gap="2"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel>Perlihatkan</FormLabel>
                      <FormHelperText>
                        Tampilkan video praktikum agar dapat diakses oleh
                        praktikan
                      </FormHelperText>
                    </Box>
                    <Switch
                      defaultChecked={onEditingMaterial?.video?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          video: {
                            ...onEditingMaterial?.video,
                            isActive: !onEditingMaterial?.video?.isActive,
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Link Cover Jurnal</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link cover jurnal"
                      defaultValue={onEditingMaterial?.journalCover?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          journalCover: {
                            ...onEditingMaterial?.journalCover,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display="flex"
                    gap="2"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel>Perlihatkan</FormLabel>
                      <FormHelperText>
                        Tampilkan cover jurnal agar dapat diakses oleh praktikan
                      </FormHelperText>
                    </Box>
                    <Switch
                      defaultChecked={onEditingMaterial?.journalCover?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setCanUpdate(true)
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
                  </FormControl>
                  <FormControl>
                    <FormLabel>Link Simulator</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link simulator praktikum"
                      defaultValue={onEditingMaterial?.simulator?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          simulator: {
                            ...onEditingMaterial?.simulator,
                            url: e.target.value,
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormControl
                    display="flex"
                    gap="2"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel>Perlihatkan</FormLabel>
                      <FormHelperText>
                        Tampilkan simulator agar dapat diakses oleh praktikan
                      </FormHelperText>
                    </Box>
                    <Switch
                      defaultChecked={onEditingMaterial?.simulator?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setCanUpdate(true)
                        setOnEditingMaterial({
                          ...onEditingMaterial,
                          simulator: {
                            ...onEditingMaterial?.simulator,
                            isActive: !onEditingMaterial?.simulator?.isActive,
                          },
                        })
                      }}
                    />
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={isUpdating}
                  isDisabled={!canUpdate}
                  colorScheme="blue"
                  width="full"
                  onClick={async (e) => {
                    e.preventDefault()
                    handlePracticumMaterialUpdate()
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
