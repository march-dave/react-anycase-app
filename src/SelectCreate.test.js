import React from "react";
import { shallow } from "enzyme";
import SelectCreate from "./SelectCreate";

describe("SelectCreate", () => {
  test("offers the supported countries", () => {
    const component = shallow(<SelectCreate />);
    expect(component.find("option").map(option => option.text())).toEqual([
      "Canada", "USA", "Korea"
    ]);
  });

  test("starts with an empty read-only country field", () => {
    const field = shallow(<SelectCreate />).find("input");
    expect(field.prop("readOnly")).toBe(true);
    expect(field.prop("value")).toBe("");
  });

  test("displays the selected country value", () => {
    const component = shallow(<SelectCreate />);
    component.find("select").simulate("change", { target: { value: "2" } });
    expect(component.find("input").prop("value")).toBe("2");
  });
});
