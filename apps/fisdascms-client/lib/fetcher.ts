import { ApiRoute } from "./constants"

export const getFetch = async (path: ApiRoute) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_APP_BASEURL + path
  )
  return await response.json()
}

export const postFetch = async (path: ApiRoute, body: object | [] = {}) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_APP_BASEURL + path,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  return await response.json()
}

export const putFetch = async (path: ApiRoute, body: object | [] = {}) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_APP_BASEURL + path,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  return await response.json()
}
