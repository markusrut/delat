import { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "../authentication/authChecker";
import { AccountResolver } from "../resolvers/AccountResolver";

export type ContextType = {
  req: Request;
  res: Response;
};

export default graphqlHTTP(async (req, res) => ({
  schema: await buildSchema({
    resolvers: [AccountResolver],
    authChecker: customAuthChecker,
  }),
  context: { req, res },
  graphiql: {
    headerEditorEnabled: true,
  },
}));
