import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"
import { Handout, UpdateHandoutDto } from "../types/handout.type"

export const handoutService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.HANDOUT)
    console.log("Get handouts API response :", response)
    return response.data.handouts as Handout[]
  },
  update: async (updateHandoutDto: UpdateHandoutDto) => {
    const response = await putFetch(ApiRoute.HANDOUT, updateHandoutDto)
    console.log("Update handout API response :", response)
    return response
  },
}
