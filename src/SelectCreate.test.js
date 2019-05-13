import React from "react";
import { shallow } from "enzyme";
import SelectCreate from "./SelectCreate";

describe("SelectCreate Render", () => {
  let component = null;

  let changed = "";
  const handleSelect = name => {
    changed = name;
  };

  test("render correctly", () => {
    // component = shallow(<SelectCreate onChange={handleSelect} />);
    component = shallow(<SelectCreate />);
  });

  test("snap shot", () => {
    expect(component).toMatchSnapshot();
  });

  test("select click", () => {
    const mockedEvent = {
      target: {
        value: "1"
      }
    };

    component.find("select").simulate("change", mockedEvent);
    expect(component.state().country).toBe("1");
    // expect(changed).toBe("1");
  });
});
