import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react"
import { useContext, useMemo, useRef, useState } from "react"
import { AssistantContext } from "../contexts/assistant.context"
import { assistantService } from "../core/services/assistant.service"

export function DeleteAssistantModal({
  assistantID,
  isOpen,
  onClose,
}: {
  assistantID: string
  isOpen: boolean
  onClose: () => void
}) {
  const cancelRef = useRef()
  const [isDeleting, setIsDeleting] = useState(false)
  const toast = useToast()
  const { setAssistants } = useContext(AssistantContext)

  const handleDeleteAssistant = async () => {
    setIsDeleting(true)
    const response = await assistantService.delete(assistantID)
    if (!response?.isSuccess) {
      toast({
        title: response.message,
        status: "error",
      })
    } else {
      const deletedAssistant = response.data
      setAssistants((prevState) =>
        prevState?.filter(
          (currentAssistant) => currentAssistant._id !== deletedAssistant._id
        )
      )
      toast({
        title: response.message,
        status: "success",
      })
      onClose()
    }
    setIsDeleting(false)
  }

  return useMemo(
    () => (
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
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
              <Button ref={cancelRef} onClick={onClose}>
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
    ),
    [assistantID, isOpen, isDeleting]
  )
}
