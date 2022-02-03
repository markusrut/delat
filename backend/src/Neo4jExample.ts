import neoInstance from "./neogma";

export const createPerson = async (name: string) => {
  const result = await neoInstance.queryRunner.create({
    label: "Person",
    data: [{ name: name }],
  });
  console.log(result);
};
