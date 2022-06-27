export type CodeOfConduct = {
  _id: string
  url?: string
  previewUrl?: string
}

export type UpdateCodeOfConductDto = Pick<CodeOfConduct, "_id" | "url">

export type CodeOfConductValidationError = Partial<Pick<CodeOfConduct, "url">>
