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
  console.log(req.nextUrl)
  if (req.nextUrl.pathname === Route.SIGN_IN && admin == null)
    return NextResponse.next()
  if (req.nextUrl.pathname === Route.SIGN_IN && admin != null)
    return NextResponse.redirect(req.nextUrl.origin)
  if (req.nextUrl.pathname !== Route.SIGN_IN && admin == null)
    return NextResponse.redirect(req.nextUrl.origin + Route.SIGN_IN)
  else return NextResponse.next()
}
