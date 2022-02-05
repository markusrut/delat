import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import auth from "./auth";
import graphql from "./graphql";
import health from "./health";
import me from "./me";

export function addRoutes() {
  const router = express.Router();

  router.use("/health", health);
  router.use("/me", authMiddleware(), me);
  router.use("/auth", auth);
  router.use("/graphql", graphql);

  return router;
}
