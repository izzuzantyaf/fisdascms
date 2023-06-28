import { createContext, useEffect } from "react"
import * as jose from "jose"
import { Route } from "../core/lib/constants"

const AuthContext = createContext({})

const cookieToObject = (cookie: string) => {
  const cookieObject: Record<string, string> = {}
  cookie.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=")
    cookieObject[key.trim()] = value
  })
  return cookieObject
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  useEffect(() => {
    const cookieObject = cookieToObject(document.cookie)
    const access_token = cookieObject["jwt"]
    let payload
    try {
      payload = jose.decodeJwt(access_token)
    } catch (error) {}
    if (location.pathname === Route.SIGN_IN && payload) {
      location.href = location.origin
    } else if (location.pathname !== Route.SIGN_IN && !payload) {
      location.href = location.origin + Route.SIGN_IN
    }
  }, [])
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
