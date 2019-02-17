import React from "react";
<<<<<<< HEAD:src/BasicInfo.test.js
import BasicInfo from "./BasicInfo";

// import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";

// configure({ adapter: new Adapter() });
=======
import BasicInfo from "../BasicInfo";
import { shallow } from "enzyme";
>>>>>>> 162079cac5d7098b085421a12b8df00cf5715b18:src/test/BasicInfo.test.js

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
