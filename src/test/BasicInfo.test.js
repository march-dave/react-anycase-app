import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import BasicInfo from "../BasicInfo";
import configureStore from "../configureStore";
import setUsername from "../Action";

describe("BasicInfo", () => {
  let store;
  let component;

  beforeEach(() => {
    store = configureStore();
    store.dispatch(setUsername("jane"));
    component = mount(<Provider store={store}><BasicInfo /></Provider>);
  });

  afterEach(() => component.unmount());

  test("displays the username from the store", () => {
    expect(component.find("#username").prop("value")).toBe("jane");
  });

  test("keeps the displayed username read-only", () => {
    expect(component.find("#username").prop("readOnly")).toBe(true);
  });

  test("renders a separate editable field", () => {
    const fields = component.find('input[type="text"]');
    expect(fields.filterWhere(input => !input.prop("readOnly"))).toHaveLength(1);
  });

  test("refreshes the displayed username after a store update", () => {
    act(() => {
      store.dispatch(setUsername("anna"));
    });
    component.update();
    expect(component.find("#username").prop("value")).toBe("anna");
  });
});
