import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.status(200).json({ uptime: process.uptime() });
};
