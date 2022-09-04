import { ApiRoute } from "../lib/constants"
import {
  deleteFetch,
  getFetch,
  postFetch,
  putFetch,
} from "../lib/helpers/fetcher.helper"
import {
  Assistant,
  AssistantFilter,
  CreateAssistantDto,
} from "../types/assistant.type"

export const assistantService = {
  /**
   * Menambahkan asisten baru
   * @param newAssistant
   * @returns
   */
  create: async (newAssistant: CreateAssistantDto) => {
    const response = await postFetch(ApiRoute.ASSISTANT, newAssistant)
    console.log("Create assistant API response :", response)
    return response
  },
  /**
   * Mengambil semua data asisten
   * @returns
   */
  getAll: async () => {
    const response = await getFetch(ApiRoute.ASSISTANT)
    console.log("Get assistants API response :", response)
    return response.data as Assistant[]
  },
  /**
   * Mencari asisten berdasarkan keyword
   * @param keyword
   * @returns
   */
  search: async (keyword: string) => {
    const response = await getFetch(ApiRoute.ASSISTANT, `keyword=${keyword}`)
    console.log("Search assistants API response :", response)
    return response.data as Assistant[]
  },
  searchLocal: (assistant: Assistant, keyword: string) => {
    const searchRegex = new RegExp(keyword, "i")
    const isPass =
      searchRegex.test(assistant.name) || searchRegex.test(assistant.code)
    return isPass
  },
  /**
   * Memfilter asisten berdasarkan level dan gender
   * @param assistant
   * @param filter
   * @returns
   */
  filter: (assistant: Assistant, filter: AssistantFilter) => {
    if (filter.level == "all" && filter.gender == "all") return true
    else if (filter.level != "all" && filter.gender == "all") {
      return assistant.level == filter.level ? true : false
    } else if (filter.level == "all" && filter.gender != "all") {
      return assistant.gender == filter.gender ? true : false
    } else {
      return assistant.level == filter.level &&
        assistant.gender == filter.gender
        ? true
        : false
    }
  },
  /**
   * Mengupdate data asisten
   * @param newAssistant
   * @returns
   */
  update: async (newAssistant: Assistant) => {
    const response = await putFetch(ApiRoute.ASSISTANT, newAssistant)
    console.log("Update assistant API response :", response)
    return response
  },
  /**
   * Menghapus asisten berdasarkan id
   * @param id
   * @returns
   */
  delete: async (id: string) => {
    const response = await deleteFetch(`${ApiRoute.ASSISTANT}/${id}`)
    console.log("Update assistant API response :", response)
    return response
  },
}
