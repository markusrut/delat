import { AuthChecker } from "type-graphql";
import { ContextType } from "../routes/graphql";
import {
  fetchAccessToken as fetchAccessToken,
  validateAccessToken as validateAccessToken,
} from "./authTokens";

export const customAuthChecker: AuthChecker<ContextType> = (
  { root, args, context, info },
  roles
) => {
  try {
    const token = fetchAccessToken(context.req);
    const tokenPayload = validateAccessToken(token);
    return tokenPayload ? true : false;
  } catch (error) {
    console.log("customAuthChecker error", error);
    return false;
  }
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
};
