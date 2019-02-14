import React from "react";
import BasicInfo from "./BasicInfo";

import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

configure({ adapter: new Adapter() });

let component = null;

describe("BasicInfo Component Load", () => {
  it("Render correctly", () => {
    component = shallow(<BasicInfo />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  describe("insert new text", () => {
    it("has an input", () => {
      expect(component.find("input").exists());
    });
  });

  let changed = null;
  const handleChange = (name) => {
    changed = name;
  }

  // it("handleChange", () => {
  //   const wrapper = shallow(<BasicInfo onChange={handleChange} />);
  //   expect(wrapper.);  
  // } )
});
