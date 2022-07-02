import { AssistantLevel, Gender } from "../lib/constants"

export type Assistant = {
  _id: string
  name: string
  code: string
  phoneNumber?: string
  lineId?: string
  gender: Gender
  level: AssistantLevel
  feedbackUrl?: string
  profilePictureUrl?: string
}

export type CreateAssistantDto = Omit<Assistant, "_id">

export type AssistantFilter = {
  level: "all" | `${AssistantLevel}`
  gender: "all" | `${Gender}`
}

export type AssistantValidationError = Partial<
  Record<keyof Omit<Assistant, "_id">, string>
>
