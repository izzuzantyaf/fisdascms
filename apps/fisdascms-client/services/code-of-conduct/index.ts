import { ApiRoute } from "../../lib/constants"
import { getFetch, putFetch } from "../../lib/fetcher"

export const codeOfConductService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.CODE_OF_CONDUCT)
    console.log("Get code of conduct API response :", response)
    return response.data.codeOfConduct
  },
  update: async (newCodeOfConduct: { _id: string; url: string }) => {
    const response = await putFetch(ApiRoute.CODE_OF_CONDUCT, newCodeOfConduct)
    console.log("Update code of conduct API response :", response)
    return await response
  },
}
