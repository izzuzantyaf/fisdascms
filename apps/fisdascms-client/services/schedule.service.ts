import { ApiRoute, Faculty } from "../lib/constants"
import { getFetch, putFetch } from "../lib/fetcher"

export const scheduleService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.SCHEDULE)
    console.log("Get schedules API response :", response)
    return response.data.schedules
  },
  update: async (newSchedule: {
    _id: string
    faculty: Faculty | null
    isActive: boolean
    url: string
  }) => {
    const response = await putFetch(ApiRoute.SCHEDULE, newSchedule)
    console.log("Update schedule API response :", response)
    return await response
  },
}
