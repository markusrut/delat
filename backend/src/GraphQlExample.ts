import { buildSchema } from "graphql";
import { RandomDie } from "./RandomDie";

const messageStorage = {
  message: "Defualt Message",
};

type HelloRequestArgs = {
  name: string;
};
type RollDiceArgs = {
  numOfDice: number;
  numSides?: number;
};
type GetDieArgs = {
  numOfSides?: number;
};
type SetMessageArgs = {
  message: string;
};

export const schema = buildSchema(`
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
    getMessage: String
  }
  type Mutation {
    setMessage(message: String!): String!
  }
`);

export const root = {
  hello: (args: HelloRequestArgs) => {
    return `Hello ${args.name}!`;
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
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
  },
  getMessage: () => {
    return messageStorage.message;
  },
  setMessage: (args: SetMessageArgs) => {
    messageStorage.message = args.message;
    return messageStorage.message;
  },
};
