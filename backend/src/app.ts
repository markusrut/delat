import dotenv from "dotenv";
import express from "express"
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

dotenv.config({
  path: ".env"
})

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello Markus!";
  },
};

var app = express();
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
  console.log(`Running GraphQL API at http://localhost:${port}/graphql`);
});
