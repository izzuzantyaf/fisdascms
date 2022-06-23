import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
  Text,
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
  const onEditingAssistantRef = useRef<object>()
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()
  const keyword = useRef("")

  const getAssistants = async () => {
    setAssistantsState(await assistantService.getAll())
  }

  const searchAssistants = async (keyword: string) => {
    setAssistantsState(await assistantService.search(keyword))
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

  useEffect(() => {
    getAssistants()
  }, [])

  return (
    <>
      <Head>
        <title>Asisten | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Asisten</Heading>
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
              keyword.current = e.target.value
              searchAssistants(keyword.current)
            }}
          />
        </InputGroup>

        <TableContainer marginTop="4" shadow="xl" rounded="lg">
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
                      aria-label="Search assistants"
                      size="xs"
                      icon={<FontAwesomeIcon icon="pen" />}
                      onClick={() => {
                        onEditingAssistantRef.current = { ...assistantState }
                        onOpen()
                      }}
                    />
                  </Td>
                  <Td fontWeight="bold">{assistantState?.code}</Td>
                  <Td>{assistantState?.name}</Td>
                  <Td textTransform="capitalize">{assistantState?.level}</Td>
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
                  <Td>{assistantState?.feedbackUrl}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <form>
              <ModalHeader>Edit asisten</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" gap="2">
                  <Box>
                    <Text fontWeight="semibold" fontWeight="semibold">
                      Nama
                    </Text>
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
                    <Text fontWeight="semibold">Kode</Text>
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
                    <Text fontWeight="semibold">Nomor HP</Text>
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
                    <Text fontWeight="semibold">ID Line</Text>
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
                    <Text fontWeight="semibold">Level</Text>
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
                    <Text fontWeight="semibold">Gender</Text>
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
                    <Text fontWeight="semibold">Link Feedback</Text>
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
      </PageLayout>
    </>
  )
}
