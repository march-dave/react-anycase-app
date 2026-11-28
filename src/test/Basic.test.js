import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import Basic from "../Basic";
import configureStore from "../configureStore";

describe("Basic", () => {
  let store;
  let component;

  beforeEach(() => {
    store = configureStore();
    component = mount(<Provider store={store}><Basic /></Provider>);
  });

  afterEach(() => component.unmount());

  it("renders a text field", () => {
    expect(component.find('input[type="text"]')).toHaveLength(1);
  });

  it("updates the username in the store when the field changes", () => {
    component.find("input").simulate("change", { target: { value: "jane" } });
    expect(store.getState().username).toBe("jane");
  });
});
