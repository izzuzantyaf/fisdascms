import { Language } from "../lib/constants"

export type PracticumMaterial = {
  _id: string
  name: string
  code: string
  language: Language
  faIconName: string
  preTask: {
    url: string
    isActive: boolean
  }
  video: {
    url: string
    isActive: boolean
  }
  simulator: {
    url: string
    isActive: boolean
  }
  journalCover: {
    url: string
    isActive: boolean
  }
}

export type UpdatePracticumMaterialDto = Omit<
  PracticumMaterial,
  "name" | "code" | "language" | "faIconName"
>

export type PracticumMaterialValidationError = Record<
  keyof Omit<
    PracticumMaterial,
    "_id" | "name" | "code" | "language" | "faIconName"
  >,
  { url: string }
>
