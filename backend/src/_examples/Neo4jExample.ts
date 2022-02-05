import Users from "./entities/Users";

export const createPerson = async (name: string) => {
  const userWithOrder = await Users.createOne({
    id: "1",
    name: "Masse",
    Orders: {
      /* --> (optional) create new nodes and associate with them */
      properties: [
        {
          id: "3",
          name: "new order",
          rating: 100,
        },
      ],
      /* --> (optional) also associates the User node with existing Order nodes */
      where: [
        {
          params: {
            id: "1",
          },
          relationshipProperties: {
            rating: 4,
          },
        },
        {
          params: {
            items: 5,
          },
        },
      ],
    },
  });

  console.log(userWithOrder);
};
