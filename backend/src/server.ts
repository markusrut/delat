import dotenv from "dotenv";
import express, { RequestHandler } from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { root, schema } from "./GraphQlExample";

dotenv.config({
  path: ".env",
});

const loggingMiddleware: RequestHandler = (req, res, next) => {
  console.log(`Request from ${req.ip}, Response status code ${res.statusCode}`);
  next();
};

var app = express();
app.use(cors());
app.use(loggingMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port", port);
});
