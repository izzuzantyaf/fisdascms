import { ApiRoute } from "../lib/constants"
import { postFetch } from "../lib/fetcher"

export const authService = {
  signIn: async (email: string, password: string) => {
    const response = await postFetch(ApiRoute.SIGN_IN, {
      username: email,
      password,
    })
    console.log("Sign in API response :", response)
    return response
  },
  signOut: () => {
    document.cookie = "jwt=; path=/"
  },
  protect: () => {},
}
