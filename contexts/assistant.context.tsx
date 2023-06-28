import { createContext, useState, useEffect } from "react"
import { assistantService } from "../core/services/assistant.service"
import { Assistant } from "../core/types/assistant.type"

export const AssistantContext = createContext<{
  assistants: Assistant[]
  setAssistants: (
    newState: Assistant[] | ((prevState: Assistant[]) => Assistant[])
  ) => void
}>({
  assistants: [],
  setAssistants: () => {},
})

export function AssistantProvider({ children }: { children: JSX.Element }) {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const handleGetAssistants = async () => {
    setAssistants(await assistantService.getAll())
  }
  useEffect(() => {
    handleGetAssistants()
  }, [])

  return (
    <AssistantContext.Provider value={{ assistants, setAssistants }}>
      {children}
    </AssistantContext.Provider>
  )
}
