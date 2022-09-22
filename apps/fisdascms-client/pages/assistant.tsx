// prettier-ignore
import { Button, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Link, Skeleton, Tag, TagLabel, TagRightIcon, Text, useDisclosure } from "@chakra-ui/react"
import Head from "next/head"
import { useContext, useMemo, useRef, useState } from "react"
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
  GenderFilter,
  LevelFilter,
} from "../core/types/assistant.type"
import { AssistantContext } from "../contexts/assistant.context"
import { CreateAssistantModal } from "../components/create-assistant-modal"
import { UpdateAssistantModal } from "../components/update-assistant-modal"
import { DeleteAssistantModal } from "../components/delete-assistant-modal"

export default function AssistantPage() {
  const { assistants } = useContext(AssistantContext)
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
  const onEditingAssistantRef = useRef<Assistant>()
  const onDeletingAssistantIdRef = useRef("")
  const [filterState, setFilterState] = useState<AssistantFilter>({
    level: "all",
    gender: "all",
  })
  const [searchKeyword, setSearchKeyword] = useState("")

  const handleSearchAssistants = async (keyword: string) => {
    setSearchKeyword(keyword)
  }

  const toggleOrChangeLevelFilter = (levelFilter: LevelFilter) => {
    if (filterState.level != levelFilter)
      setFilterState((prevState) => {
        prevState.level = levelFilter
        return { ...prevState }
      })
    else
      setFilterState((prevState) => {
        prevState.level = "all"
        return { ...prevState }
      })
  }

  const toggleOrChangeGenderFilter = (genderFilter: GenderFilter) => {
    if (filterState.gender != genderFilter)
      setFilterState((prevState) => {
        prevState.gender = genderFilter
        return { ...prevState }
      })
    else
      setFilterState((prevState) => {
        prevState.gender = "all"
        return { ...prevState }
      })
  }

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
            onClick={() => toggleOrChangeLevelFilter(AssistantLevel.JUNIOR)}
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
            onClick={() => toggleOrChangeLevelFilter(AssistantLevel.SENIOR)}
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
            onClick={() => toggleOrChangeGenderFilter(Gender.MALE)}
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
            onClick={() => toggleOrChangeGenderFilter(Gender.FEMALE)}
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
        {useMemo(
          () => (
            <Skeleton rounded="xl" isLoaded={assistants.length ? true : false}>
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
                    {assistants
                      ?.filter((assistant) =>
                        assistantService.filter(assistant, filterState)
                      )
                      .filter((assistant) =>
                        assistantService.searchLocal(assistant, searchKeyword)
                      )
                      .map((assistant, index) => (
                        <Tr key={index}>
                          <Td>
                            <IconButton
                              aria-label="Edit asisten"
                              size="sm"
                              icon={<FontAwesomeIcon icon="pen" />}
                              onClick={() => {
                                onEditingAssistantRef.current = {
                                  ...assistant,
                                }
                                console.log(onEditingAssistantRef.current)
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
                                onDeletingAssistantIdRef.current = assistant._id
                                onDeleteModalOpen()
                              }}
                            />
                          </Td>
                          <Td fontWeight="bold">{assistant?.code}</Td>
                          <Td maxWidth="60">{assistant?.name}</Td>
                          <Td textTransform="capitalize">
                            <Tag
                              colorScheme={
                                assistant?.level === AssistantLevel.JUNIOR
                                  ? "green"
                                  : "orange"
                              }
                            >
                              <TagLabel textTransform="capitalize">
                                {assistant?.level}
                              </TagLabel>
                              <TagRightIcon>
                                <FontAwesomeIcon
                                  icon={
                                    assistant?.level === AssistantLevel.JUNIOR
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
                                assistant?.gender === Gender.MALE
                                  ? "blue"
                                  : "pink"
                              }
                            >
                              <TagLabel textTransform="capitalize">
                                {assistant?.gender}
                              </TagLabel>
                              <TagRightIcon>
                                <FontAwesomeIcon
                                  icon={
                                    assistant?.gender === Gender.MALE
                                      ? "mars"
                                      : "venus"
                                  }
                                />
                              </TagRightIcon>
                            </Tag>
                          </Td>
                          <Td>{assistant?.phoneNumber}</Td>
                          <Td>{assistant?.lineId}</Td>
                          <Td>
                            {assistant?.feedbackUrl ? (
                              <Link
                                href={assistant?.feedbackUrl}
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
          ),
          [assistants, filterState, searchKeyword]
        )}
        {/* tabel asisten */}

        {/* modal create asisten */}
        <CreateAssistantModal
          isOpen={isCreateModalOpen}
          onClose={onCreateModalClose}
        />
        {/* modal create asisten */}

        {/* modal edit asisten */}
        {onEditingAssistantRef.current ? (
          <UpdateAssistantModal
            assistant={onEditingAssistantRef.current}
            isOpen={isOpen}
            onClose={onClose}
          />
        ) : undefined}

        {/* modal edit asisten */}

        {/* modal hapus asisten */}
        <DeleteAssistantModal
          assistantID={onDeletingAssistantIdRef.current}
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
        />
        {/* modal hapus asisten */}
      </PageLayout>
    </>
  )
}
