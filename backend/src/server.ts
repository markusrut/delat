import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { RandomDie } from "./RandomDie";

dotenv.config({
  path: ".env"
})

var schema = buildSchema(`
  type RandomDie {
    numOfSides: Int!
    rollOnce: Int!
    roll(numOfRolls: Int!): [Int]
  }
  type Query {
    hello(name: String!): String
    quoteOfTheDay: String
    random: Float!
    rollDice(numOfDice: Int!, numSides: Int): [Int]
    getDie(numOfSides: Int): RandomDie
  }
`);


type HelloRequestArgs = {
  name: String
}
type RollDiceArgs = {
  numOfDice: number,
  numSides?: number
}
type GetDieArgs = {
  numOfSides?: number,
}

var root = {
  hello: (args: HelloRequestArgs) => {
    return `Hello ${args.name}!`;
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollDice: (args: RollDiceArgs) => {
    var output = [];
    for (var i = 0; i < args.numOfDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  },
  getDie: (args: GetDieArgs) => {
    return new RandomDie(args.numOfSides || 6);
  }
};

var app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port", port);
})
