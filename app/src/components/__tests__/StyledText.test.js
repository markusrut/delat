import renderer from "react-test-renderer";
import { MonoText } from "../StyledText";

describe("StyledText", () => {
  const monoComponent = <MonoText>testing mono text!</MonoText>;
  it("renders correctly", () => {
    const tree = renderer.create(monoComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
