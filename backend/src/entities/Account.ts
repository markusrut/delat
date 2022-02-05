import { NeogmaInstance, ModelFactory } from "neogma";
import neoInstance from "../repository/neogma";

type AccountPropertiesI = {
  email: string;
  password: string;
  name: string;
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
        format: "email",
        required: true,
      },
      password: {
        type: "string",
        minLength: 3,
        required: true,
      },
      name: {
        type: "string",
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
