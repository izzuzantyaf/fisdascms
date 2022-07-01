import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"
import {
  PracticumMaterial,
  UpdatePracticumMaterialDto,
} from "../types/practicum-material.type"

export const practicumMaterialService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.PRACTICUM_MATERIAL)
    console.log("Get practicum material API response :", response)
    return response.data.practicumModules as PracticumMaterial[]
  },
  update: async (updatePracticumMaterialDto: UpdatePracticumMaterialDto) => {
    const response = await putFetch(
      ApiRoute.PRACTICUM_MATERIAL,
      updatePracticumMaterialDto
    )
    console.log("Update practicum material API response :", response)
    return response
  },
}
