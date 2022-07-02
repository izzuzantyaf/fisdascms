// prettier-ignore
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Skeleton, Square, Switch, Tag, TagLabel, TagRightIcon, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import { useEffect, useState } from "react"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { languageCodeMapper } from "../core/lib/helpers/language-code-mapper.helper"
import { practicumMaterialService } from "../core/services/practicum-material.service"
import { repeatElement } from "../core/lib/helpers/repeat-element.helper"
import {
  LanguageFilter,
  PracticmMaterialFilter,
  PracticumMaterial,
  PracticumMaterialValidationError,
} from "../core/types/practicum-material.type"
import { Language } from "../core/lib/constants"

export default function PracticumMaterialPage() {
  const [practicumMaterialState, setPracticumMaterialState] =
    useState<PracticumMaterial[]>()
  const [onEditingMaterialState, setOnEditingMaterialState] =
    useState<PracticumMaterial>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isUpdating, setIsUpdating] = useState(false)
  const [canUpdate, setCanUpdate] = useState(false)
  const toast = useToast()
  const [validationError, setValidationError] =
    useState<PracticumMaterialValidationError>()
  const [filterState, setFilterState] = useState<PracticmMaterialFilter>({
    language: "all",
  })

  const getPracticumMaterials = async () => {
    setPracticumMaterialState(await practicumMaterialService.getAll())
  }

  const handlePracticumMaterialUpdate = async () => {
    setIsUpdating(true)
    const { _id, preTask, video, simulator, journalCover } =
      onEditingMaterialState as PracticumMaterial
    const response = await practicumMaterialService.update({
      _id,
      preTask,
      video,
      simulator,
      journalCover,
    })
    setIsUpdating(false)
    if (!response?.isSuccess) {
      setValidationError(response.data.validationError)
      toast({
        title: response.message,
        status: "error",
      })
      return
    }
    setValidationError(undefined)
    const { updatedPracticumModule } = response.data
    setPracticumMaterialState((prevState) => {
      const oldIndex = prevState?.findIndex(
        (old) => old._id == updatedPracticumModule._id
      )
      prevState[oldIndex] = updatedPracticumModule
      return prevState
    })
    toast({
      title: response.message,
      status: "success",
    })
    onClose()
  }

  const toggleOrChangeLanguageFilter = (languageFilter: LanguageFilter) => {
    if (filterState.language != languageFilter)
      setFilterState((prevState) => {
        prevState.language = languageFilter
        return { ...prevState }
      })
    else
      setFilterState((prevState) => {
        prevState.language = "all"
        return { ...prevState }
      })
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

        {/* filter list */}
        <HStack marginTop="4" gap="2" spacing="0" wrap="wrap">
          <Text>Filter : </Text>
          <Tag
            size="lg"
            cursor="pointer"
            colorScheme={filterState.language == Language.ID ? "red" : "gray"}
            variant={filterState.language == Language.ID ? "subtle" : "outline"}
            onClick={() => toggleOrChangeLanguageFilter(Language.ID)}
          >
            <TagLabel textTransform="capitalize">
              {languageCodeMapper(Language.ID)}
            </TagLabel>
            <TagRightIcon>
              <FontAwesomeIcon icon="language" />
            </TagRightIcon>
          </Tag>
          <Tag
            size="lg"
            cursor="pointer"
            colorScheme={filterState.language == Language.EN ? "blue" : "gray"}
            variant={filterState.language == Language.EN ? "subtle" : "outline"}
            onClick={() => toggleOrChangeLanguageFilter(Language.EN)}
          >
            <TagLabel textTransform="capitalize">
              {languageCodeMapper(Language.EN)}
            </TagLabel>
            <TagRightIcon>
              <FontAwesomeIcon icon="language" />
            </TagRightIcon>
          </Tag>
        </HStack>
        {/* filter list */}

        <SimpleGrid columns={[1, 2, 2, 4]} gap="4" marginTop="4">
          {practicumMaterialState
            ?.filter((practicumMaterial) =>
              practicumMaterialService.filter(practicumMaterial, filterState)
            )
            ?.map((practicumMaterial) => (
              <Box
                padding="4"
                {...shadowedBoxStyle}
                key={practicumMaterial._id}
              >
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
                    <Text>
                      {languageCodeMapper(practicumMaterial.language)}
                    </Text>
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
                      {practicumMaterial.preTask.isActive
                        ? "Aktif"
                        : "Nonaktif"}
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
                    setOnEditingMaterialState(practicumMaterial)
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

        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose()
            setOnEditingMaterialState(undefined)
            setValidationError(undefined)
          }}
        >
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
                    <FontAwesomeIcon
                      icon={onEditingMaterialState?.faIconName}
                    />
                  </Square>
                  <Box>
                    <Heading size="md">{onEditingMaterialState?.code}</Heading>
                    <Text fontWeight="normal" fontSize="sm">
                      {onEditingMaterialState?.name}
                    </Text>
                  </Box>
                </Flex>

                <Flex direction="column" gap="2" marginTop="6">
                  <FormControl
                    isInvalid={validationError?.preTask?.url ? true : false}
                  >
                    <FormLabel>Link Soal TP</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link soal TP"
                      defaultValue={onEditingMaterialState?.preTask?.url}
                      onFocus={(e: any) => {
                        e.target.select()
                      }}
                      onChange={(e: any) => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.preTask.url = e.target.value
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                    {validationError?.preTask?.url ? (
                      <FormErrorMessage>
                        {validationError.preTask.url}
                      </FormErrorMessage>
                    ) : null}
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
                      defaultChecked={onEditingMaterialState?.preTask?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.preTask.isActive =
                            !prevState.preTask.isActive
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.video?.url ? true : false}
                  >
                    <FormLabel>Link Video</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link YouTube video praktikum"
                      defaultValue={onEditingMaterialState?.video?.url}
                      onFocus={(e: any) => {
                        e.target.select()
                      }}
                      onChange={(e: any) => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.video.url = e.target.value
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                    {validationError?.video?.url ? (
                      <FormErrorMessage>
                        {validationError.video.url}
                      </FormErrorMessage>
                    ) : null}
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
                      defaultChecked={onEditingMaterialState?.video?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.video.isActive = !prevState.video.isActive
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={
                      validationError?.journalCover?.url ? true : false
                    }
                  >
                    <FormLabel>Link Cover Jurnal</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link cover jurnal"
                      defaultValue={onEditingMaterialState?.journalCover?.url}
                      onFocus={(e: any) => {
                        e.target.select()
                      }}
                      onChange={(e: any) => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.journalCover.url = e.target.value
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                    {validationError?.journalCover?.url ? (
                      <FormErrorMessage>
                        {validationError.journalCover.url}
                      </FormErrorMessage>
                    ) : null}
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
                      defaultChecked={
                        onEditingMaterialState?.journalCover?.isActive
                      }
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.journalCover.isActive =
                            !prevState.journalCover.isActive
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.simulator?.url ? true : false}
                  >
                    <FormLabel>Link Simulator</FormLabel>
                    <Input
                      type="url"
                      placeholder="Link simulator praktikum"
                      defaultValue={onEditingMaterialState?.simulator?.url}
                      onFocus={(e: any) => {
                        e.target.select()
                      }}
                      onChange={(e: any) => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.simulator.url = e.target.value
                          return prevState
                        })
                        setCanUpdate(true)
                      }}
                    />
                    {validationError?.simulator?.url ? (
                      <FormErrorMessage>
                        {validationError.simulator.url}
                      </FormErrorMessage>
                    ) : null}
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
                      defaultChecked={
                        onEditingMaterialState?.simulator?.isActive
                      }
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingMaterialState((prevState) => {
                          prevState.simulator.isActive =
                            !prevState.simulator.isActive
                          return prevState
                        })
                        setCanUpdate(true)
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
                  onClick={async (e: any) => {
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
