import { AuthContext } from "./AuthProvider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as _ApolloProvider,
} from "@apollo/client";
import { useContext, FC } from "react";

export const ApolloProvider: FC = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
  return <_ApolloProvider client={client}>{children}</_ApolloProvider>;
};
