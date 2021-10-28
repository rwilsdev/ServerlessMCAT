// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {verify, JwtPayload} from 'jsonwebtoken'
import { USER_TOKEN, JWT_SECRET_KEY } from '../../lib/constants';
import { nanoid } from 'nanoid';

type Data = {
  nanoid: string
  jwtID: string
}

type HelloError = {
  error: { message: string }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | HelloError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: { message: 'Method not allowed'}
    })
  }
  try {
    const token = req.cookies[USER_TOKEN]
    const payload = verify(token, JWT_SECRET_KEY) as JwtPayload;
    payload.jti !== undefined 
      ? res.status(200).json({ nanoid: nanoid(), jwtID: payload.jti})
      : res.status(500).json({ error: { message: 'Internal server error' }})
  } catch (err) {
    res.status(401).json({ error: { message: 'Your token has expired.'}})
  }
}
