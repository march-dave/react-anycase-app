import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import axios from "axios";
import App from "../App";
import Weather from "../components/Weather";

jest.mock("axios");

describe("App", () => {
  beforeEach(() => axios.get.mockReset());

  it("renders the weather dashboard", () => {
    expect(shallow(<App />).find(Weather)).toHaveLength(1);
  });

  it("shows a loading status while the weather request is pending", () => {
    axios.get.mockReturnValueOnce(new Promise(() => {}));
    const component = mount(<App />);
    try {
      expect(component.getDOMNode().querySelector('[role="status"]').textContent)
        .toContain("날씨 정보를 불러오는 중");
    } finally {
      component.unmount();
    }
  });

  it("loads the weather from the API and displays the returned forecast", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        current: {
          temperature: "18°C", condition: "clear sky", feelsLike: "17°C",
          humidity: "60%", windSpeed: "3 m/s"
        },
        forecast: [{ day: "월", high: "21°C", low: "12°C", condition: "light rain" }]
      }
    });

    let component;
    await act(async () => {
      component = mount(<App />);
    });

    try {
      expect(axios.get).toHaveBeenCalledWith("/api/weather");
      expect(component.text()).toContain("18°C");
      expect(component.text()).toContain("21°C");
      expect(component.text()).toContain("light rain");
    } finally {
      component.unmount();
    }
  });
});
