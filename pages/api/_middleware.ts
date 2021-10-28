import { NextRequest } from "next/server";
import { verifyAuth } from "../../lib/auth";
import { jsonResponse } from '../../lib/utils';
import { nanoid } from 'nanoid';



export async function middleware(req: NextRequest) {
  const url = req.nextUrl

  if (url.searchParams.has('edge')) {
    const resOrPayload = await verifyAuth(req);

    //if verifyAuth did not give a response, we create the json response
    return resOrPayload instanceof Response ? resOrPayload : jsonResponse(200, { nanoid: nanoid(), jwtID: resOrPayload.jti })
  }
}