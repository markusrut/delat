import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { resolvers } from "./GraphQlExample";

// https://www.graphql-tools.com/docs/introduction

const typesArray = loadFilesSync(path.join(__dirname, "./schemas"));

const types = mergeTypeDefs(typesArray);

console.log(types);

export const schema = makeExecutableSchema({
  typeDefs: types,
  resolvers: resolvers,
});
