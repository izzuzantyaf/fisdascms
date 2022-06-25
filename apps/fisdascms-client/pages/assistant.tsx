import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
  Tag,
  TagLabel,
  TagRightIcon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import PageLayout from "../layouts/page-layout"
import { assistantService } from "../services/assistant.service"
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
import { AssistantLevel, Gender } from "../lib/constants"

export default function Assistant() {
  const [assistantsState, setAssistantsState] = useState<object[]>()
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
  const newAssistantRef = useRef({})
  const onEditingAssistantRef = useRef<object>()
  const onDeletingAssistantIdRef = useRef()
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const toast = useToast()
  const [errors, setErrors] = useState()

  const handleGetAssistants = async () => {
    setAssistantsState(await assistantService.getAll())
  }

  const handleSearchAssistants = async (keyword: string) => {
    setAssistantsState(await assistantService.search(keyword))
  }

  const handleCreateAssistant = async (newAssistant) => {
    setIsCreating(true)
    const response = await assistantService.create(newAssistant)
    setIsCreating(false)
    if (!response?.isSuccess) {
      setErrors(response?.data?.errors)
      toast({
        title: response.message,
        status: "error",
      })
    } else {
      setErrors(undefined)
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
      onEditingAssistantRef.current
    )
    if (!response?.isSuccess) {
      toast({
        title: response.message,
        status: "error",
      })
    } else {
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
    setIsUpdating(false)
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
        <Button
          marginTop="4"
          colorScheme="blue"
          leftIcon={<FontAwesomeIcon icon="plus" />}
          onClick={onCreateModalOpen}
        >
          Tambah asisten
        </Button>
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
            onChange={(e) => {
              handleSearchAssistants(e.target.value)
            }}
          />
        </InputGroup>

        <TableContainer
          marginTop="4"
          shadow="xl"
          rounded="lg"
          maxHeight="67vh"
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
              {assistantsState?.map((assistantState, index) => (
                <Tr key={index}>
                  <Td>
                    <IconButton
                      aria-label="Edit asisten"
                      size="sm"
                      icon={<FontAwesomeIcon icon="pen" />}
                      onClick={() => {
                        onEditingAssistantRef.current = { ...assistantState }
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
                        onDeletingAssistantIdRef.current = assistantState._id
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
                        assistantState?.gender === Gender.MALE ? "blue" : "pink"
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

        {/* Create Assistant Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            onCreateModalClose()
            setErrors(undefined)
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
                  <FormControl isInvalid={errors?.name} isRequired={true}>
                    <FormLabel>Nama</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nama"
                      onChange={(e) => {
                        newAssistantRef.current.name = e.target.value
                      }}
                    />
                    {errors?.name ? (
                      <FormErrorMessage>{errors?.name}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors?.code} isRequired={true}>
                    <FormLabel>Kode</FormLabel>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Kode asisten"
                      onChange={(e) => {
                        newAssistantRef.current.code = e.target.value
                      }}
                    />
                    {errors?.code ? (
                      <FormErrorMessage>{errors?.code}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors?.phoneNumber}>
                    <FormLabel>Nomor HP</FormLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Nomor HP"
                      onChange={(e) => {
                        newAssistantRef.current.phoneNumber = e.target.value
                      }}
                    />
                    {errors?.phoneNumber ? (
                      <FormErrorMessage>{errors?.phoneNumber}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <FormLabel>ID Line</FormLabel>
                    <Input
                      id="lineId"
                      name="lineId"
                      type="text"
                      placeholder="ID Line"
                      onChange={(e) => {
                        newAssistantRef.current.lineId = e.target.value
                      }}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors?.level} isRequired={true}>
                    <FormLabel>Level</FormLabel>
                    <Select
                      id="level"
                      name="level"
                      placeholder="Pilih level"
                      textTransform="capitalize"
                      onChange={(e) => {
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
                    {errors?.level ? (
                      <FormErrorMessage>{errors?.level}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors?.gender} isRequired={true}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Pilih gender"
                      textTransform="capitalize"
                      onChange={(e) => {
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
                    {errors?.gender ? (
                      <FormErrorMessage>{errors?.gender}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors?.feedbackUrl}>
                    <FormLabel>Link Feedback</FormLabel>
                    <Input
                      id="feedbackUrl"
                      name="feedbackUrl"
                      type="url"
                      placeholder="Link feedback"
                      onChange={(e) => {
                        newAssistantRef.current.feedbackUrl = e.target.value
                      }}
                    />
                    {errors?.feedbackUrl ? (
                      <FormErrorMessage>{errors?.feedbackUrl}</FormErrorMessage>
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
                  onClick={(e) => {
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
        {/* Create Assistant Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered={true}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <form>
              <ModalHeader>Edit asisten</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" gap="2">
                  <Box>
                    <FormLabel>Nama</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nama"
                      defaultValue={onEditingAssistantRef.current?.name}
                      onChange={(e) => {
                        onEditingAssistantRef.current.name = e.target.value
                      }}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Kode</FormLabel>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Kode asisten"
                      defaultValue={onEditingAssistantRef.current?.code}
                      onChange={(e) => {
                        onEditingAssistantRef.current.code = e.target.value
                      }}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Nomor HP</FormLabel>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Nomor HP"
                      defaultValue={onEditingAssistantRef.current?.phoneNumber}
                      onChange={(e) => {
                        onEditingAssistantRef.current.phoneNumber =
                          e.target.value
                      }}
                    />
                  </Box>
                  <Box>
                    <FormLabel>ID Line</FormLabel>
                    <Input
                      id="lineId"
                      name="lineId"
                      type="text"
                      placeholder="ID Line"
                      defaultValue={onEditingAssistantRef.current?.lineId}
                      onChange={(e) => {
                        onEditingAssistantRef.current.lineId = e.target.value
                      }}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Level</FormLabel>
                    <Select
                      id="level"
                      name="level"
                      placeholder="Pilih level"
                      textTransform="capitalize"
                      defaultValue={onEditingAssistantRef.current?.level}
                      onChange={(e) => {
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
                  </Box>
                  <Box>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Pilih gender"
                      textTransform="capitalize"
                      defaultValue={onEditingAssistantRef.current?.gender}
                      onChange={(e) => {
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
                  </Box>
                  <Box>
                    <FormLabel>Link Feedback</FormLabel>
                    <Input
                      id="feedbackUrl"
                      name="feedbackUrl"
                      type="url"
                      placeholder="Link feedback"
                      defaultValue={onEditingAssistantRef.current?.feedbackUrl}
                      onChange={(e) => {
                        onEditingAssistantRef.current.feedbackUrl =
                          e.target.value
                      }}
                    />
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  isLoading={isUpdating}
                  colorScheme="blue"
                  width="full"
                  onClick={(e) => {
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

        <DeleteAssistantModal
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteModalClose={onDeleteModalClose}
          handleDeleteAssistant={handleDeleteAssistant}
          isDeleting={isDeleting}
        />
      </PageLayout>
    </>
  )
}

const DeleteAssistantModal = ({
  isDeleteModalOpen,
  onDeleteModalClose,
  handleDeleteAssistant,
  isDeleting,
}) => {
  const cancelRef = useRef()

  return (
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
  )
}
