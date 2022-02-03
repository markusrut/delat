import { Neogma } from "neogma";

const neoInstance = new Neogma(
  {
    url: "bolt://localhost:7687",
    username: "neo4j",
    password: "password",
  },
  {
    logger: console.log,
  }
);

export default neoInstance;
