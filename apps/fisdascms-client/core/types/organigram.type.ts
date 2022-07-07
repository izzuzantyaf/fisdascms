export type Organigram = {
  _id: string
  url?: string
  previewUrl?: string
}

export type UpdateOrganigramDto = Omit<Organigram, "previewUrl">

export type OrganigramValidationError = Partial<
  Record<keyof Pick<Organigram, "url">, string>
>
