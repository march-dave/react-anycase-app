import React from "react";
import { shallow } from "enzyme";
import Counter from "./Counter";

describe("Counter", () => {
  test("starts at zero", () => {
    const counter = shallow(<Counter />);
    expect(counter.find("p").text()).toBe("0");
  });

  test("increments the displayed count for each click", () => {
    const counter = shallow(<Counter />);
    counter.find('input[value="+"]').simulate("click");
    counter.find('input[value="+"]').simulate("click");
    expect(counter.find("p").text()).toBe("2");
  });
});
