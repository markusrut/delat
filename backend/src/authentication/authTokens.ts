import { Request } from "express";
import jwt from "jsonwebtoken";

export type SessionPayload = {
  email: string;
};

export const fetchAccessToken = (req: Request): string => {
  const [tokenType, token] = req.headers.authorization?.split(" ") ?? [];
  if (tokenType !== "Bearer") throw new Error("Invalid token type");
  if (!token) throw new Error("No token");

  return token;
};

export const createAccessToken = (email: string) => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw Error("Missing access token secret");

  const payload: SessionPayload = {
    email,
  };

  return jwt.sign(payload, secret, {
    expiresIn: "15m",
  });
};

export const validateAccessToken = (token: string): SessionPayload => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw Error("Missing access token secret");

  try {
    const decoded = jwt.verify(token, secret);
    return decoded as SessionPayload;
  } catch (error) {
    throw Error("Invalid session token");
  }
};

export type RefreshPayload = {
  email: string;
};

export const createRefreshToken = (email: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw Error("Missing JWT secret");

  const payload: RefreshPayload = {
    email,
  };

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};
