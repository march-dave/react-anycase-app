import React from "react";
import ReactDOM from "react-dom";
import SeeRef from "../SeeRef";

describe("SeeRef", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    jest.restoreAllMocks();
  });

  test("displays the measured content height on mount", () => {
    jest.spyOn(Element.prototype, "clientHeight", "get").mockReturnValue(135);
    ReactDOM.render(<SeeRef />, container);
    expect(container.textContent).toContain("height: 135");
  });

  test("focuses the input when the button is clicked", () => {
    ReactDOM.render(<SeeRef />, container);
    container.querySelector("button").click();
    expect(document.activeElement).toBe(container.querySelector("input"));
  });
});
