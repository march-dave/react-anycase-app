import React from "react";
import BasicInfo from "../BasicInfo";

import { shallow } from "enzyme";

let component = null;

describe("BasicInfo Component Load", () => {
  test("Render correctly", () => {
    component = shallow(<BasicInfo />);
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  describe("insert new text", () => {
    test("has an input", () => {
      expect(component.find("input").exists());
    });
  });

  let changed = null;
  const handleChange = name => {
    changed = name;
  };

  // test("handleChange", () => {
  //   const wrapper = shallow(<BasicInfo onChange={handleChange} />);
  //   expect(wrapper.);
  // } )
});
