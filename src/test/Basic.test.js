import React from "react";
import Basic from "../Basic";
import { shallow } from "enzyme";

const setUp = (props = {}) => {
  const component = shallow(<Basic {...props} />);
  return component;
};

describe("Counter", () => {
  let component = null;

  beforeEach(() => {
    
    let wrapper;
    const props = {
      header: "Test Header",
      desc: "Test Desc"
    };
    wrapper = setUp(props);
    
    component = setUp();
  });

  it("renders correctly", () => {
    component = shallow(<Basic />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

});
