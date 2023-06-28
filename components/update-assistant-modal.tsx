// prettier-ignore
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react"
import { useContext, useMemo, useState } from "react"
import { AssistantContext } from "../contexts/assistant.context"
import { AssistantLevel, Gender } from "../core/lib/constants"
import { assistantService } from "../core/services/assistant.service"
import {
  Assistant,
  AssistantValidationError,
} from "../core/types/assistant.type"

export function UpdateAssistantModal({
  assistant,
  isOpen,
  onClose,
}: {
  assistant: Assistant
  isOpen: boolean
  onClose: () => void
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [validationError, setValidationError] =
    useState<AssistantValidationError>()
  const toast = useToast()
  const { setAssistants } = useContext(AssistantContext)

  const handleUpdateAssistant = async () => {
    setIsUpdating(true)
    const response = await assistantService.update(assistant as Assistant)
    setIsUpdating(false)
    if (!response?.isSuccess) {
      setValidationError(response?.data?.errors)
      toast({
        title: response.message,
        status: "error",
      })
    } else {
      setValidationError(undefined)
      const updatedAssistant = response.data
      setAssistants((prevState) =>
        prevState?.map((currentAssistant) =>
          currentAssistant._id === updatedAssistant._id
            ? updatedAssistant
            : currentAssistant
        )
      )
      toast({
        title: response.message,
        status: "success",
      })
      onClose()
    }
  }

  return useMemo(
    () => (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setValidationError(undefined)
        }}
      >
        <ModalOverlay />
        <ModalContent marginX="4" rounded="xl">
          <ModalHeader>Edit asisten</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="update-assistant-form">
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
                    defaultValue={assistant.name}
                    onChange={(e) => {
                      assistant.name = e.target.value
                    }}
                  />
                  {validationError?.name ? (
                    <FormErrorMessage>{validationError?.name}</FormErrorMessage>
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
                    defaultValue={assistant.code}
                    onChange={(e) => {
                      assistant.code = e.target.value
                    }}
                  />
                  {validationError?.code ? (
                    <FormErrorMessage>{validationError?.code}</FormErrorMessage>
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
                    defaultValue={assistant.phoneNumber}
                    onChange={(e) => {
                      assistant.phoneNumber = e.target.value
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
                    defaultValue={assistant.lineId}
                    onChange={(e) => {
                      assistant.lineId = e.target.value
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
                    defaultValue={assistant.level}
                    onChange={(e) => {
                      assistant.level = e.target.value
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
                    defaultValue={assistant.gender}
                    onChange={(e) => {
                      assistant.gender = e.target.value
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
                    defaultValue={assistant.feedbackUrl}
                    onChange={(e) => {
                      assistant.feedbackUrl = e.target.value
                    }}
                  />
                  {validationError?.feedbackUrl ? (
                    <FormErrorMessage>
                      {validationError?.feedbackUrl}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              form="update-assistant-form"
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
        </ModalContent>
      </Modal>
    ),
    [assistant, isOpen, isUpdating, validationError]
  )
}
