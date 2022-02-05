import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv";

const secret = process.env.JWT_SECRET;

if (!secret) throw Error("Missing JWT secret");

export default (req: Request, res: Response) => {
  const token = jwt.sign({ foo: "bar" }, secret);
  res.json({ token });
};
