import jwt from "jsonwebtoken";

export type SessionPayload = {
  email: string;
};

export const getSessionToken = (email: string) => {
  const secret = process.env.JWT_SESSION_SECRET;
  if (!secret) throw Error("Missing JWT secret");

  const payload: SessionPayload = {
    email,
  };

  return jwt.sign(payload, secret, {
    expiresIn: "15m",
  });
};

export const validateSessionToken = (token: string): SessionPayload => {
  const secret = process.env.JWT_SESSION_SECRET;
  if (!secret) throw Error("Missing JWT secret");

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

export const getRefreshToken = (email: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw Error("Missing JWT secret");

  const payload: RefreshPayload = {
    email,
  };

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};
