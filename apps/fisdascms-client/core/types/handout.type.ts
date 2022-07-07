import { Faculty, Language } from "../lib/constants"

export type Handout = {
  _id: string
  faculty: Faculty
  language: Language
  isActive: boolean
  url: string
}

export type UpdateHandoutDto = Omit<Handout, "faculty" | "language">

export type HandoutValidationError = Partial<Pick<Handout, "url">>
