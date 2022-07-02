import { ApiRoute } from "../lib/constants"
import { getFetch, putFetch } from "../lib/helpers/fetcher.helper"
import { Schedule, UpdateScheduleDto } from "../types/schedule.type"

export const scheduleService = {
  getAll: async () => {
    const response = await getFetch(ApiRoute.SCHEDULE)
    console.log("Get schedules API response :", response)
    return response.data.schedules as Schedule[]
  },
  update: async (newSchedule: UpdateScheduleDto) => {
    const response = await putFetch(ApiRoute.SCHEDULE, newSchedule)
    console.log("Update schedule API response :", response)
    return response
  },
}
