import dotenv from "dotenv";
import express from "express";
import jwtMiddleware from "express-jwt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
// import { schema } from "./api-schema";
import { resolvers, schema } from "./GraphQlExample";

dotenv.config({
  path: ".env",
});

var server = express();
server.use(cors());

const jwtAlgorithm = "HS256";
const jwtOptions = {
  secret: process.env.JWT_SECRET ?? "MissingSecret",
  algorithms: [jwtAlgorithm],
};
server.use(jwtMiddleware(jwtOptions).unless({ path: ["/health", "/token"] }));

server.use("/token", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, jwtOptions.secret, {
    algorithm: jwtAlgorithm,
  });
  res.json({ token });
});

server.use("/health", (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});
server.use("/me", (_req, res) => {
  const user = _req.user ?? {};
  res.status(200).json({ user });
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
  console.log(`http://localhost:${port}`);
});
