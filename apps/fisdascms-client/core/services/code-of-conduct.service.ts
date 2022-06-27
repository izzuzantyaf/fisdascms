import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"
import {
  CodeOfConduct,
  UpdateCodeOfConductDto,
} from "../types/code-of-conduct.type"

export const codeOfConductService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.CODE_OF_CONDUCT)
    console.log("Get code of conduct API response :", response)
    return response.data.codeOfConduct as CodeOfConduct
  },
  update: async (updateCodeOfConductDto: UpdateCodeOfConductDto) => {
    const response = await putFetch(
      ApiRoute.CODE_OF_CONDUCT,
      updateCodeOfConductDto
    )
    console.log("Update code of conduct API response :", response)
    return response
  },
}
