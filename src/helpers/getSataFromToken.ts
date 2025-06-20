import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const secret = process.env.TOKEN_SECRET;
    if (!secret) throw new Error("TOKEN_SECRET is not defined");

    const decodedToken: any = jwt.verify(token, secret);

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
