import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Skeleton,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import PageLayout from "../layouts/page-layout"
import { assistantService } from "../core/services/assistant.service"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AssistantLevel, Gender } from "../core/lib/constants"
import {
  Assistant,
  AssistantFilter,
  AssistantValidationError,
  CreateAssistantDto,
} from "../core/types/assistant.type"

export default function AssistantPage() {
  const [assistantsState, setAssistantsState] = useState<Assistant[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure()
  const newAssistantRef = useRef<CreateAssistantDto>({} as CreateAssistantDto)
  const onEditingAssistantRef = useRef<Assistant>()
  const onDeletingAssistantIdRef = useRef()
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const toast = useToast()
  const [validationError, setValidationError] =
    useState<AssistantValidationError>()
  const [filterState, setFilterState] = useState<AssistantFilter>({
    level: "all",
    gender: "all",
  })
  const cancelRef = useRef()
  const [searchKeyword, setSearchKeyword] = useState("")

  const handleGetAssistants = async () => {
    setAssistantsState(await assistantService.getAll())
  }

  const handleSearchAssistants = async (keyword: string) => {
    setSearchKeyword(keyword)
  }

  const handleCreateAssistant = async (newAssistant: CreateAssistantDto) => {
    setIsCreating(true)
    const response = await assistantService.create(newAssistant)
    setIsCreating(false)
    if (!response?.isSuccess) {
      setValidationError(response?.data?.errors)
      toast({
        title: response.message,
        status: "error",
      })
    } else {
      setValidationError(undefined)
      toast({
        title: response.message,
        status: "success",
      })
      onCreateModalClose()
      handleGetAssistants()
    }
  }

  const handleUpdateAssistant = async () => {
    setIsUpdating(true)
    const response = await assistantService.update(
      onEditingAssistantRef.current as Assistant
    )
    setIsUpdating(false)
    if (!response?.isSuccess) {
      setValidationError(response?.data?.errors)
      toast({
        title: response.message,
        status: "error",
      })
    } else {
      setValidationError(undefined)
      const { updatedAssistant } = response.data
      setAssistantsState((prevState) =>
        prevState?.map((prev) =>
          prev._id === updatedAssistant._id ? updatedAssistant : prev
        )
      )
      toast({
        title: response.message,
        status: "success",
      })
      onClose()
    }
  }

  const handleDeleteAssistant = async () => {
    setIsDeleting(true)
    const response = await assistantService.delete(
      onDeletingAssistantIdRef.current
    )
    if (!response?.isSuccess) {
      toast({
        title: response.message,
        status: "error",
      })
    } else {
      const { deletedAssistant } = response.data
      setAssistantsState((prevState) =>
        prevState?.filter((prev) => prev._id !== deletedAssistant._id)
      )
      toast({
        title: response.message,
        status: "success",
      })
      onDeleteModalClose()
    }
    setIsDeleting(false)
  }

  useEffect(() => {
    handleGetAssistants()
  }, [])

  return (
    <>
      <Head>
        <title>Asisten | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Asisten</Heading>

        {/* tambah asisten button */}
        <Button
          marginTop="4"
          colorScheme="blue"
          leftIcon={<FontAwesomeIcon icon="plus" />}
          onClick={onCreateModalOpen}
        >
          Tambah asisten
        </Button>
        {/* tambah asisten button */}

        {/* filter list */}
        <HStack marginTop="4" gap="2" spacing="0" wrap="wrap">
          <Text>Filter : </Text>
          <Tag
            size="lg"
            cursor="pointer"
            colorScheme={
              filterState.level == AssistantLevel.JUNIOR ? "green" : "gray"
            }
            variant={
              filterState.level == AssistantLevel.JUNIOR ? "subtle" : "outline"
            }
            onClick={() => {
              if (filterState.level != AssistantLevel.JUNIOR)
                setFilterState((prevState) => {
                  prevState.level = AssistantLevel.JUNIOR
                  return { ...prevState }
                })
              else
                setFilterState((prevState) => {
                  prevState.level = "all"
                  return { ...prevState }
                })
            }}
          >
            <TagLabel textTransform="capitalize">
              {AssistantLevel.JUNIOR}
            </TagLabel>
            <TagRightIcon>
              <FontAwesomeIcon icon="chess-pawn" />
            </TagRightIcon>
          </Tag>
          <Tag
            size="lg"
            cursor="pointer"
            colorScheme={
              filterState.level == AssistantLevel.SENIOR ? "orange" : "gray"
            }
            variant={
              filterState.level == AssistantLevel.SENIOR ? "subtle" : "outline"
            }
            onClick={() => {
              if (filterState.level != AssistantLevel.SENIOR)
                setFilterState((prevState) => {
                  prevState.level = AssistantLevel.SENIOR
                  return { ...prevState }
                })
              else
                setFilterState((prevState) => {
                  prevState.level = "all"
                  return { ...prevState }
                })
            }}
          >
            <TagLabel textTransform="capitalize">
              {AssistantLevel.SENIOR}
            </TagLabel>
            <TagRightIcon>
              <FontAwesomeIcon icon="chess-queen" />
            </TagRightIcon>
          </Tag>
          <Tag
            size="lg"
            cursor="pointer"
            colorScheme={filterState.gender == Gender.MALE ? "blue" : "gray"}
            variant={filterState.gender == Gender.MALE ? "subtle" : "outline"}
            onClick={() => {
              if (filterState.gender != Gender.MALE)
                setFilterState((prevState) => {
                  prevState.gender = Gender.MALE
                  return { ...prevState }
                })
              else
                setFilterState((prevState) => {
                  prevState.gender = "all"
                  return { ...prevState }
                })
            }}
          >
            <TagLabel textTransform="capitalize">{Gender.MALE}</TagLabel>
            <TagRightIcon>
              <FontAwesomeIcon icon="mars" />
            </TagRightIcon>
          </Tag>
          <Tag
            size="lg"
            cursor="pointer"
            colorScheme={filterState.gender == Gender.FEMALE ? "pink" : "gray"}
            variant={filterState.gender == Gender.FEMALE ? "subtle" : "outline"}
            onClick={() => {
              if (filterState.gender != Gender.FEMALE)
                setFilterState((prevState) => {
                  prevState.gender = Gender.FEMALE
                  return { ...prevState }
                })
              else
                setFilterState((prevState) => {
                  prevState.gender = "all"
                  return { ...prevState }
                })
            }}
          >
            <TagLabel textTransform="capitalize">{Gender.FEMALE}</TagLabel>
            <TagRightIcon>
              <FontAwesomeIcon icon="venus" />
            </TagRightIcon>
          </Tag>
        </HStack>
        {/* filter list */}

        {/* search bar */}
        <InputGroup marginTop="4">
          <InputLeftElement>
            <Icon color="gray.400">
              <FontAwesomeIcon icon="magnifying-glass" />
            </Icon>
          </InputLeftElement>
          <Input
            type="text"
            defaultValue=""
            placeholder="Cari nama atau kode"
            variant="filled"
            onChange={(e: any) => {
              handleSearchAssistants(e.target.value)
            }}
          />
        </InputGroup>
        {/* search bar */}

        {/* tabel asisten */}
        <Skeleton rounded="xl" isLoaded={assistantsState ? true : false}>
          <TableContainer
            marginTop="4"
            shadow="xl"
            rounded="lg"
            height="67vh"
            overflowY="auto"
          >
            <Table size="sm" bgColor="white">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Kode</Th>
                  <Th>Nama</Th>
                  <Th>Level</Th>
                  <Th>Gender</Th>
                  <Th>No. HP</Th>
                  <Th>ID Line</Th>
                  <Th>Link Feedback</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assistantsState
                  ?.filter((assistantState) =>
                    assistantService.filter(assistantState, filterState)
                  )
                  .filter((assistantState) =>
                    assistantService.searchLocal(assistantState, searchKeyword)
                  )
                  .map((assistantState, index) => (
                    <Tr key={index}>
                      <Td>
                        <IconButton
                          aria-label="Edit asisten"
                          size="sm"
                          icon={<FontAwesomeIcon icon="pen" />}
                          onClick={() => {
                            onEditingAssistantRef.current = {
                              ...assistantState,
                            }
                            onOpen()
                          }}
                        />
                        <IconButton
                          aria-label="Hapus asisten"
                          size="sm"
                          icon={<FontAwesomeIcon icon="trash-can" />}
                          marginLeft="2"
                          bgColor="red.100"
                          color="red.500"
                          colorScheme="red"
                          variant="unstyled"
                          _hover={{ backgroundColor: "red.200" }}
                          onClick={() => {
                            onDeletingAssistantIdRef.current =
                              assistantState._id
                            onDeleteModalOpen()
                          }}
                        />
                      </Td>
                      <Td fontWeight="bold">{assistantState?.code}</Td>
                      <Td maxWidth="60" isTruncated={true}>
                        {assistantState?.name}
                      </Td>
                      <Td textTransform="capitalize">
                        <Tag
                          colorScheme={
                            assistantState?.level === AssistantLevel.JUNIOR
                              ? "green"
                              : "orange"
                          }
                        >
                          <TagLabel textTransform="capitalize">
                            {assistantState?.level}
                          </TagLabel>
                          <TagRightIcon>
                            <FontAwesomeIcon
                              icon={
                                assistantState?.level === AssistantLevel.JUNIOR
                                  ? "chess-pawn"
                                  : "chess-queen"
                              }
                            />
                          </TagRightIcon>
                        </Tag>
                      </Td>
                      <Td>
                        <Tag
                          colorScheme={
                            assistantState?.gender === Gender.MALE
                              ? "blue"
                              : "pink"
                          }
                        >
                          <TagLabel textTransform="capitalize">
                            {assistantState?.gender}
                          </TagLabel>
                          <TagRightIcon>
                            <FontAwesomeIcon
                              icon={
                                assistantState?.gender === Gender.MALE
                                  ? "mars"
                                  : "venus"
                              }
                            />
                          </TagRightIcon>
                        </Tag>
                      </Td>
                      <Td>{assistantState?.phoneNumber}</Td>
                      <Td>{assistantState?.lineId}</Td>
                      <Td>
                        {assistantState?.feedbackUrl ? (
                          <Link
                            href={assistantState?.feedbackUrl}
                            isExternal={true}
                          >
                            Open{" "}
                            <FontAwesomeIcon icon="arrow-up-right-from-square" />
                          </Link>
                        ) : null}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Skeleton>
        {/* tabel asisten */}

        {/* modal create asisten */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            onCreateModalClose()
            setValidationError(undefined)
          }}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <form>
              <ModalHeader>Tambah asisten</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" gap="2">
                  <FormControl
                    isInvalid={validationError?.name ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Nama</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nama"
                      onChange={(e: any) => {
                        newAssistantRef.current.name = e.target.value
                      }}
                    />
                    {validationError?.name ? (
                      <FormErrorMessage>
                        {validationError?.name}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.code ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Kode</FormLabel>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Kode asisten"
                      onChange={(e: any) => {
                        newAssistantRef.current.code = e.target.value
                      }}
                    />
                    {validationError?.code ? (
                      <FormErrorMessage>
                        {validationError?.code}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.phoneNumber ? true : false}
                  >
                    <FormLabel>Nomor HP</FormLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Nomor HP"
                      onChange={(e: any) => {
                        newAssistantRef.current.phoneNumber = e.target.value
                      }}
                    />
                    {validationError?.phoneNumber ? (
                      <FormErrorMessage>
                        {validationError?.phoneNumber}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel>ID Line</FormLabel>
                    <Input
                      id="lineId"
                      name="lineId"
                      type="text"
                      placeholder="ID Line"
                      onChange={(e: any) => {
                        newAssistantRef.current.lineId = e.target.value
                      }}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.level ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Level</FormLabel>
                    <Select
                      id="level"
                      name="level"
                      placeholder="Pilih level"
                      textTransform="capitalize"
                      onChange={(e: any) => {
                        newAssistantRef.current.level = e.target.value
                      }}
                    >
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={AssistantLevel.JUNIOR}
                      >
                        {AssistantLevel.JUNIOR}
                      </option>
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={AssistantLevel.SENIOR}
                      >
                        {AssistantLevel.SENIOR}
                      </option>
                    </Select>
                    {validationError?.level ? (
                      <FormErrorMessage>
                        {validationError?.level}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.gender ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Pilih gender"
                      textTransform="capitalize"
                      onChange={(e: any) => {
                        newAssistantRef.current.gender = e.target.value
                      }}
                    >
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={Gender.MALE}
                      >
                        {Gender.MALE}
                      </option>
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={Gender.FEMALE}
                      >
                        {Gender.FEMALE}
                      </option>
                    </Select>
                    {validationError?.gender ? (
                      <FormErrorMessage>
                        {validationError?.gender}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.feedbackUrl ? true : false}
                  >
                    <FormLabel>Link Feedback</FormLabel>
                    <Input
                      id="feedbackUrl"
                      name="feedbackUrl"
                      type="url"
                      placeholder="Link feedback"
                      onChange={(e: any) => {
                        newAssistantRef.current.feedbackUrl = e.target.value
                      }}
                    />
                    {validationError?.feedbackUrl ? (
                      <FormErrorMessage>
                        {validationError?.feedbackUrl}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={isCreating}
                  colorScheme="blue"
                  width="full"
                  onClick={(e: any) => {
                    e.preventDefault()
                    handleCreateAssistant(newAssistantRef.current)
                  }}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        {/* modal create asisten */}

        {/* modal edit asisten */}
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose()
            setValidationError(undefined)
          }}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <form>
              <ModalHeader>Edit asisten</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" gap="2">
                  <FormControl
                    isInvalid={validationError?.name ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Nama</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nama"
                      defaultValue={onEditingAssistantRef.current?.name}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.name = e.target.value
                      }}
                    />
                    {validationError?.name ? (
                      <FormErrorMessage>
                        {validationError?.name}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.code ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Kode</FormLabel>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Kode asisten"
                      defaultValue={onEditingAssistantRef.current?.code}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.code = e.target.value
                      }}
                    />
                    {validationError?.code ? (
                      <FormErrorMessage>
                        {validationError?.code}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.phoneNumber ? true : false}
                  >
                    <FormLabel>Nomor HP</FormLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Nomor HP"
                      defaultValue={onEditingAssistantRef.current?.phoneNumber}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.phoneNumber =
                          e.target.value
                      }}
                    />
                    {validationError?.phoneNumber ? (
                      <FormErrorMessage>
                        {validationError?.phoneNumber}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel>ID Line</FormLabel>
                    <Input
                      id="lineId"
                      name="lineId"
                      type="text"
                      placeholder="ID Line"
                      defaultValue={onEditingAssistantRef.current?.lineId}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.lineId = e.target.value
                      }}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.level ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Level</FormLabel>
                    <Select
                      id="level"
                      name="level"
                      placeholder="Pilih level"
                      textTransform="capitalize"
                      defaultValue={onEditingAssistantRef.current?.level}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.level = e.target.value
                      }}
                    >
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={AssistantLevel.JUNIOR}
                      >
                        {AssistantLevel.JUNIOR}
                      </option>
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={AssistantLevel.SENIOR}
                      >
                        {AssistantLevel.SENIOR}
                      </option>
                    </Select>
                    {validationError?.level ? (
                      <FormErrorMessage>
                        {validationError?.level}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.gender ? true : false}
                    isRequired={true}
                  >
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Pilih gender"
                      textTransform="capitalize"
                      defaultValue={onEditingAssistantRef.current?.gender}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.gender = e.target.value
                      }}
                    >
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={Gender.MALE}
                      >
                        {Gender.MALE}
                      </option>
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={Gender.FEMALE}
                      >
                        {Gender.FEMALE}
                      </option>
                    </Select>
                    {validationError?.gender ? (
                      <FormErrorMessage>
                        {validationError?.gender}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={validationError?.feedbackUrl ? true : false}
                  >
                    <FormLabel>Link Feedback</FormLabel>
                    <Input
                      id="feedbackUrl"
                      name="feedbackUrl"
                      type="url"
                      placeholder="Link feedback"
                      defaultValue={onEditingAssistantRef.current?.feedbackUrl}
                      onChange={(e: any) => {
                        onEditingAssistantRef.current.feedbackUrl =
                          e.target.value
                      }}
                    />
                    {validationError?.feedbackUrl ? (
                      <FormErrorMessage>
                        {validationError?.feedbackUrl}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={isUpdating}
                  colorScheme="blue"
                  width="full"
                  onClick={(e: any) => {
                    e.preventDefault()
                    handleUpdateAssistant()
                  }}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        {/* modal edit asisten */}

        {/* modal hapus asisten */}
        <AlertDialog
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          leastDestructiveRef={cancelRef}
          isCentered={true}
        >
          <AlertDialogOverlay>
            <AlertDialogContent marginX="4" rounded="xl">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Hapus asisten
              </AlertDialogHeader>

              <AlertDialogBody>Yakin untuk menghapus?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteModalClose}>
                  Batal
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleDeleteAssistant}
                  marginLeft={3}
                  isLoading={isDeleting}
                >
                  Hapus
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        {/* modal hapus asisten */}
      </PageLayout>
    </>
  )
}
