import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
// import { schema } from "./api-schema";
import { resolvers, schema } from "./GraphQlExample";

dotenv.config({
  path: ".env",
});

var server = express();
server.use(cors());

server.use("/health", (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const port = process.env.APP_PORT || 5000;
server.listen(port, () => {
  console.log("Server started on port", port);
});
