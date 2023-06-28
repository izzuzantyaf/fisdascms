// prettier-ignore
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react"
import { useContext, useMemo, useRef, useState } from "react"
import { AssistantContext } from "../contexts/assistant.context"
import { AssistantLevel, Gender } from "../core/lib/constants"
import { assistantService } from "../core/services/assistant.service"
import {
  AssistantValidationError,
  CreateAssistantDto,
} from "../core/types/assistant.type"

export function CreateAssistantModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isCreating, setIsCreating] = useState(false)
  const [validationError, setValidationError] =
    useState<AssistantValidationError>()
  const newAssistantRef = useRef<CreateAssistantDto>({} as CreateAssistantDto)
  const toast = useToast()
  const { setAssistants } = useContext(AssistantContext)

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
      onClose()
      setAssistants((prevState) => [response.data, ...prevState])
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
          <ModalHeader>Tambah asisten</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="create-assistant-form">
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
                    onChange={(e) => {
                      newAssistantRef.current.name = e.target.value
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
                    onChange={(e) => {
                      newAssistantRef.current.code = e.target.value
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
                    onChange={(e) => {
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
                    onChange={(e) => {
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
                    onChange={(e) => {
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
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              form="create-assistant-form"
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
        </ModalContent>
      </Modal>
    ),
    [isOpen, validationError, isCreating]
  )
}
