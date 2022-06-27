import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"

export const handoutService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.HANDOUT)
    console.log("Get handouts API response :", response)
    return response.data.handouts
  },
  update: async (newHandout: {
    _id: string
    isActive: boolean
    url: string
  }) => {
    const response = await putFetch(ApiRoute.HANDOUT, newHandout)
    console.log("Update handout API response :", response)
    return response
  },
}
