import { graphqlHTTP } from "express-graphql";
import { resolvers, schema } from "../examples/GraphQlExample";

export default graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
});
