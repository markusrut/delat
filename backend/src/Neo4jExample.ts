import neo4j from "neo4j-driver";

export const createPerson = async (name: string) => {
  const driver = neo4j.driver("neo4j://localhost");
  const session = driver.session();

  try {
    const result = await session.run(
      "CREATE (a:Person {name: $name}) RETURN a",
      { name }
    );

    const singleRecord = result.records[0];
    console.log(singleRecord);

    const node = singleRecord.get(0);

    console.log(node);

    // console.log(node.properties.name)
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
};
