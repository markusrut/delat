import { NeogmaInstance, ModelFactory } from "neogma";
import neoInstance from "../repository/neogma";

// https://themetalfleece.github.io/neogma-docs/docs/Models/Defining-a-Model

type AccountPropertiesI = {
  email: string;
  password: string;
};
interface AccountsRelatedNodesI {}
interface MethodsI {}
interface StaticsI {}

export type AccountsInstance = NeogmaInstance<
  AccountPropertiesI,
  AccountsRelatedNodesI,
  MethodsI
>;

const Accounts = ModelFactory<
  AccountPropertiesI,
  AccountsRelatedNodesI,
  StaticsI,
  MethodsI
>(
  {
    label: "Account",
    schema: {
      email: {
        type: "string",
        minLength: 3,
        required: true,
      },
      password: {
        type: "string",
        minLength: 3,
        required: true,
      },
    },

    primaryKeyField: "email",
    relationships: {},
    statics: {},
    methods: {},
  },
  neoInstance
);
export default Accounts;
