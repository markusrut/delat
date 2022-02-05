import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { AccountResolver } from "../resolvers/AccountResolver";

export default graphqlHTTP(async () => ({
  schema: await buildSchema({
    resolvers: [AccountResolver],
  }),
  graphiql: {
    headerEditorEnabled: true,
  },
}));
