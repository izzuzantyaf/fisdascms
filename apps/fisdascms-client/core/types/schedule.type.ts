import { Faculty } from "../lib/constants"

export type Schedule = {
  _id: string
  faculty?: Faculty
  isActive: boolean
  url?: string
}

export type UpdateScheduleDto = Omit<Schedule, "faculty">

export type ScheduleValidationError = Partial<
  Record<keyof Pick<Schedule, "url">, string>
>
