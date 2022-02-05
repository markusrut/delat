import { ModelRelatedNodesI, NeogmaInstance, ModelFactory } from "neogma";
import neoInstance from "../../repository/neogma";
import Orders, { OrdersInstance } from "./Orders";

// https://themetalfleece.github.io/neogma-docs/docs/Models/Defining-a-Model

type UserPropertiesI = {
  name: string;
  age?: number;
  id: string;
};
interface UsersRelatedNodesI {
  Orders: ModelRelatedNodesI<
    typeof Orders,
    OrdersInstance,
    {
      rating: number;
    },
    {
      rating: number;
    }
  >;
}
interface MethodsI {
  bar: (this: UsersInstance) => string;
}
interface StaticsI {
  foo: () => string;
}

export type UsersInstance = NeogmaInstance<
  UserPropertiesI,
  UsersRelatedNodesI,
  MethodsI
>;

const Users = ModelFactory<
  UserPropertiesI,
  UsersRelatedNodesI,
  StaticsI,
  MethodsI
>(
  {
    label: "User",
    schema: {
      name: {
        type: "string",
        minLength: 3,
        required: true,
      },
      age: {
        type: "number",
        minimum: 0,
      },
      id: {
        type: "string",
        required: true,
      },
    },
    relationships: {
      Orders: {
        model: Orders,
        direction: "out",
        name: "CREATES",
        properties: {
          rating: {
            property: "rating",
            schema: {
              type: "number",
            },
          },
        },
      },
    },
    primaryKeyField: "id",
    statics: {
      foo: () => {
        return "foo";
      },
    },
    methods: {
      bar: function () {
        return "The name of this user is: " + this.name;
      },
    },
  },
  neoInstance
);
export default Users;
