import { NeogmaInstance, ModelFactory } from "neogma";
import neoInstance from "../repository/neogma";

type OrderPropertiesI = {
  name: string;
  id: string;
  items?: number;
};
interface OrdersRelatedNodesI {}

export type OrdersInstance = NeogmaInstance<
  OrderPropertiesI,
  OrdersRelatedNodesI
>;

const Orders = ModelFactory<OrderPropertiesI, OrdersRelatedNodesI>(
  {
    label: "Order",
    schema: {
      name: {
        type: "string",
        required: true,
      },
      items: {
        type: "number",
      },
      id: {
        type: "string",
        required: true,
      },
    },
    primaryKeyField: "id",
  },
  neoInstance
);
export default Orders;
