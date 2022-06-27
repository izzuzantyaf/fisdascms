import { ApiRoute } from "../lib/constants"
import {
  deleteFetch,
  getFetch,
  postFetch,
  putFetch,
} from "../lib/helpers/fetcher.helper"

export const assistantService = {
  create: async (newAssistant: any) => {
    const response = await postFetch(ApiRoute.ASSISTANT, newAssistant)
    console.log("Create assistant API response :", response)
    return response
  },
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
    return response
  },
  delete: async (id: any) => {
    const response = await deleteFetch(`${ApiRoute.ASSISTANT}/${id}`)
    console.log("Update assistant API response :", response)
    return response
  },
}