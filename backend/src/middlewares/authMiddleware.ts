import jwtMiddleware from "express-jwt";

export default () => {
  const secret = process.env.JWT_SECRET;
  const jwtAlgorithm = process.env.JWT_ALGORITHM;

  if (!secret) throw Error("Missing JWT secret");
  if (!jwtAlgorithm) throw Error("Missing JWT secret");

  const jwtOptions = {
    secret,
    algorithms: [jwtAlgorithm],
  };

  return jwtMiddleware(jwtOptions);
};
