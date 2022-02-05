import { AuthChecker } from "type-graphql";
import { ContextType } from "../routes/graphql";
import { validateSessionToken } from "./authTokens";

export const customAuthChecker: AuthChecker<ContextType> = (
  { root, args, context, info },
  roles
) => {
  try {
    const [tokenType, token] =
      context.req.headers.authorization?.split(" ") ?? [];
    if (tokenType !== "Bearer" || !token) return false;

    validateSessionToken(token);
    return true;
  } catch (error) {
    console.log("customAuthChecker error", error);

    return false;
  }
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
};
