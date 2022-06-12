import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/fetcher"

export const organigramService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.ORGANIGRAM)
    console.log("Get organigram API response :", response)
    return response.data.organigram
  },
  update: async (newOrganigram: { _id: string; url: string }) => {
    const response = await putFetch(ApiRoute.ORGANIGRAM, newOrganigram)
    console.log("Update organigram API response :", response)
    return await response
  },
}
