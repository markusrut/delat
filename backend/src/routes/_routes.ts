import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import health from "./health";
import auth from "./auth";
import expressPlayground from "graphql-playground-middleware-express";
import me from "./me";
import graphql from "./graphql";

export function addRoutes() {
  const router = express.Router();

  router.use("/health", health);
  router.use("/auth", auth);
  router.use("/playground", expressPlayground({ endpoint: "/graphql" }));

  router.use("/me", authMiddleware(), me);
  router.use("/graphql", authMiddleware(), graphql);

  return router;
}
