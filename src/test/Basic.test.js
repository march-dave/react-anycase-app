import React from "react";
import Basic from "../Basic";
// import { shallow } from "enzyme";

import configureMockStore from "redux-mock-store";
// import configureStore from "../configureStore";

import { Provider } from "react-redux";
import action from "../Action";
import reducer from "../Reducer";

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
    component = setUp();
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
