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
import { useEffect, useState } from "react"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import PageLayout from "../layouts/page-layout"
import { renderSkeleton } from "../lib/render-skeleton"
import { scheduleService } from "../services/schedule.service"

export default function Schedule() {
  const [schedulesState, setSchedulesState] = useState<object[]>()
  const [onEditingSchedule, setOnEditingSchedule] = useState<object>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()

  const getSchedules = async () => {
    setSchedulesState(await scheduleService.getAll())
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
                  schedule.faculty?.toUpperCase() ?? "kelas"
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
                  setOnEditingSchedule(
                    schedulesState.find(
                      (targetSchedule) => targetSchedule._id === schedule._id
                    )
                  )
                  onOpen()
                }}
                colorScheme="blue"
              >
                Edit jadwal
              </Button>
            </Box>
          )) ??
            renderSkeleton(
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
              <ModalHeader>Edit jadwal</ModalHeader>
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
                    onEditingSchedule?.faculty?.toUpperCase() ?? "kelas"
                  }`}</Heading>
                </Flex>
                <Flex direction="column" gap="1" marginTop="6">
                  <Text>Link file jadwal</Text>
                  <Flex
                    justifyContent="space-between"
                    gap="2"
                    alignItems="center"
                  >
                    <Input
                      type="url"
                      placeholder="Link file jadwal"
                      defaultValue={onEditingSchedule?.url}
                      onFocus={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        setOnEditingSchedule({
                          ...onEditingSchedule,
                          url: e.target.value,
                        })
                      }}
                    />
                    <Switch
                      defaultChecked={onEditingSchedule?.isActive}
                      colorScheme="green"
                      onChange={() => {
                        setOnEditingSchedule({
                          ...onEditingSchedule,
                          isActive: !onEditingSchedule?.isActive,
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
                    const response = await scheduleService.update(
                      onEditingSchedule
                    )
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
