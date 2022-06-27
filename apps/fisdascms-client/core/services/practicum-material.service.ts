import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"

export const practicumMaterialService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.PRACTICUM_MATERIAL)
    console.log("Get practicum material API response :", response)
    return response.data.practicumModules
  },
  update: async (newPracticumMaterial: object) => {
    const response = await putFetch(
      ApiRoute.PRACTICUM_MATERIAL,
      newPracticumMaterial
    )
    console.log("Update practicum material API response :", response)
    return response
  },
}
