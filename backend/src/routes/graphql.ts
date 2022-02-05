import { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { resolvers, schema } from "../GraphQlExample";

export default graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
});
