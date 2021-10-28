import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET_KEY, USER_TOKEN } from "./constants";
import { jsonResponse } from "./utils";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { nanoid } from "nanoid";

interface UserJwtPayload {
  jti: string
  iat: number
}

/**
 * Verifies the user's jwt token and returns the payload if
 * it's valid or a response if it's not
 */
export async function verifyAuth(request: NextRequest) {
  const token = request.cookies[USER_TOKEN]

  if (!token) {
    return jsonResponse(401, { error: { message: "Missing user token" }})
  }

  if (!(await jwt.verify(token, JWT_SECRET_KEY))) {
    return jsonResponse(401, { error: { message: 'Your token has expired.' }})
  }

  return jwt.decode(token) as UserJwtPayload
}

export async function setUserCookie(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies[USER_TOKEN]

  if (!cookie) {
    //If they do not have a cookie, create one
    const token = await jwt.sign(
      {
        jti: nanoid(),
        iat: Date.now() / 1000
      },
      JWT_SECRET_KEY
    )
    //Set the cookie in the response
    response.cookie(USER_TOKEN, token)
  }

  return response;
}