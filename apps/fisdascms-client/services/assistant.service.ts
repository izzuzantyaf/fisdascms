import { ApiRoute, Faculty } from "../lib/constants"
import { getFetch, putFetch } from "../lib/fetcher"

export const assistantService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.ASSISTANT)
    console.log("Get assistants API response :", response)
    return response.data.assistants
  },
  search: async (keyword: string) => {
    const response = await getFetch(ApiRoute.ASSISTANT, `keyword=${keyword}`)
    console.log("Search assistants API response :", response)
    return response.data.assistants
  },
  update: async (newAssistant: any) => {
    const response = await putFetch(ApiRoute.ASSISTANT, newAssistant)
    console.log("Update assistant API response :", response)
    return await response
  },
}
