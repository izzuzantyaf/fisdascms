import { MyResponse } from "../../types/my-response.type"

export const getFetch = async (path: string, query?: string) => {
  const url =
    process.env.NEXT_PUBLIC_SERVER_APP_BASEURL +
    path +
    (query ? `?${query}` : "")
  const response = await fetch(url)
  return (await response.json()) as MyResponse
}

export const postFetch = async (path: string, body: object = {}) => {
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
  return (await response.json()) as MyResponse
}

export const putFetch = async (path: string, body: object = {}) => {
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
  return (await response.json()) as MyResponse
}

export const deleteFetch = async (path: string, body: object = {}) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_APP_BASEURL + path,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  return (await response.json()) as MyResponse
}
