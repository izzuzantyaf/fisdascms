import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"
import { Organigram, UpdateOrganigramDto } from "../types/organigram.type"

export const organigramService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.ORGANIGRAM)
    console.log("Get organigram API response :", response)
    return response.data as Organigram
  },
  update: async (newOrganigram: UpdateOrganigramDto) => {
    const response = await putFetch(ApiRoute.ORGANIGRAM, newOrganigram)
    console.log("Update organigram API response :", response)
    return response
  },
}
