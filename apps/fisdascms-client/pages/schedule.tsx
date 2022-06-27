import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Square,
  Text,
  Link,
  Skeleton,
  useDisclosure,
  useToast,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { scheduleService } from "../core/services/schedule.service"
import { repeatElement } from "../core/lib/helpers/repeat-element.helper"

export default function Schedule() {
  const [schedulesState, setSchedulesState] = useState<object[]>()
  const onEditingScheduleRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()
  const [canUpdate, setCanUpdate] = useState(false)

  const getSchedules = async () => {
    setSchedulesState(await scheduleService.getAll())
  }

  const handleScheduleUpdate = async () => {
    setIsUpdating(true)
    const response = await scheduleService.update(onEditingScheduleRef.current)
    if (!response?.isSuccess) {
      toast({
        title: response.message,
        status: "error",
      })
      return
    }
    const { updatedSchedule } = response.data
    setSchedulesState(
      schedulesState?.map((scheduleState) =>
        scheduleState._id === updatedSchedule._id
          ? updatedSchedule
          : scheduleState
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
    getSchedules()
  }, [])
  return (
    <>
      <Head>
        <title>Jadwal | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Jadwal praktikum</Heading>
        <SimpleGrid columns={[1, 2, 2, 3]} gap="4" marginTop="4">
          {schedulesState?.map((schedule) => (
            <Box padding="4" {...shadowedBoxStyle} key={schedule._id}>
              <Flex alignItems="center">
                <Square
                  fontSize="xl"
                  bgColor="blue.50"
                  color="blue.500"
                  size="40px"
                  borderRadius="full"
                  marginRight="4"
                >
                  <FontAwesomeIcon icon="calendar-minus" />
                </Square>
                <Heading size="md">{`Jadwal ${
                  schedule.faculty?.toUpperCase() ?? "Kelas"
                }`}</Heading>
              </Flex>

              <Flex direction="column" marginTop="4" gap="2">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>File</Text>
                  <Link href={schedule.url} isExternal={true} fontSize="xs">
                    Buka <FontAwesomeIcon icon="arrow-up-right-from-square" />
                  </Link>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Status</Text>
                  <Box
                    bgColor={schedule.isActive ? "green.100" : "gray.100"}
                    color={schedule.isActive ? "green.500" : "gray.500"}
                    borderRadius="full"
                    paddingX="2"
                    fontWeight="semibold"
                    fontSize="xs"
                  >
                    {schedule.isActive ? "Aktif" : "Nonaktif"}
                  </Box>
                </Flex>
              </Flex>

              <Button
                width="full"
                marginTop="4"
                onClick={() => {
                  onEditingScheduleRef.current = { ...schedule }
                  setCanUpdate(false)
                  onOpen()
                }}
                colorScheme="blue"
              >
                Edit jadwal
              </Button>
            </Box>
          )) ??
            repeatElement(
              <Skeleton
                isLoaded={schedulesState ? true : false}
                rounded="xl"
                height="200px"
              />,
              3
            )}
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent marginX="4" rounded="xl">
            <form>
              <ModalHeader>Edit Jadwal</ModalHeader>
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
                    <FontAwesomeIcon icon="calendar-minus" />
                  </Square>
                  <Heading size="md">{`Jadwal ${
                    onEditingScheduleRef.current?.faculty?.toUpperCase() ??
                    "Kelas"
                  }`}</Heading>
                </Flex>
                <Flex direction="column" gap="1" marginTop="6">
                  <Heading size="sm">Link File</Heading>
                  <Flex
                    justifyContent="space-between"
                    gap="2"
                    alignItems="center"
                  >
                    <Input
                      type="url"
                      placeholder="Link file jadwal"
                      defaultValue={onEditingScheduleRef.current?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setCanUpdate(true)
                        onEditingScheduleRef.current.url = e.target.value
                      }}
                    />
                    <Switch
                      defaultChecked={onEditingScheduleRef.current?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setCanUpdate(true)
                        onEditingScheduleRef.current.isActive =
                          !onEditingScheduleRef.current.isActive
                        // setOnEditingSchedule((prevState) => ({
                        //   ...prevState,
                        //   isActive: !prevState?.isActive,
                        // }))
                      }}
                    />
                  </Flex>
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
                    handleScheduleUpdate()
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
