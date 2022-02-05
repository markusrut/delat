import express from "express";
import health from "./health";
import expressPlayground from "graphql-playground-middleware-express";
import graphql from "./graphql";

export function addRoutes() {
  const router = express.Router();

  router.use("/health", health);
  router.use("/playground", expressPlayground({ endpoint: "/graphql" }));
  router.use("/graphql", graphql);

  return router;
}
