import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

dotenv.config({
  path: ".env"
})

var schema = buildSchema(`
  type Query {
    hello(name: String!): String
  }
`);


type HelloRequestArgs = {
  name: String
}

var root = {
  hello: ({ name }: HelloRequestArgs) => {
    return `Hello ${name}!`;
  },
};

var app = express();
app.use(cors());

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
})
