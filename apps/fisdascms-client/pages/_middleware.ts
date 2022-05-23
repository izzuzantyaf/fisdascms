import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import * as jose from "jose"
import { Route } from "../lib/constants"

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const access_token = req.cookies.jwt
  console.log("Access token :", access_token)
  let admin = null
  try {
    admin = jose.decodeJwt(access_token)
  } catch (error) {
    console.error(error)
  }
  console.log("Admin :", admin)
  console.log("Base URL :", process.env.VERCEL_URL)
  if (admin == null || typeof admin === "string")
    return NextResponse.redirect(process.env.VERCEL_URL + Route.SIGN_IN)
  return NextResponse.next()
}
