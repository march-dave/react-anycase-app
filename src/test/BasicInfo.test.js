import React from "react";
import BasicInfo from "../BasicInfo";

import { shallow, mount } from "enzyme";

// import configureMockStore from "redux-mock-store";
import configureStore from "../configureStore";
import { Provider } from "react-redux";

let component = null;

describe("BasicInfo Component Load", () => {
  test("Render correctly", () => {
    component = shallow(<BasicInfo />);

    // const mockStore = configureMockStore();

    // 데이터들을 받아올 가짜 스토어 만들기
    // let store = mockStore({
    //   username: "dave"
    // });

    // Real Store
    // let store = configureStore();
  });

  test("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  describe("insert new text", () => {
    test("has an input", () => {
      expect(component.find("input").exists());
    });
  });

  // it("renders properly", () => {
  //   const context = { store };
  //   // component = mount(<Basic />, { context });
  //   component = mount(
  //     <Provider store={store}>
  //       <Basic />
  //     </Provider>
  //   ).exists;
  //   // 혹은 component = mount(<CounterContainer store={store} />);
  // });

  // it('dispatches action', () => {
  //   const mockedEvent = {
  //     target: {
  //       value: 'world'
  //     }
  //   };
  //   component.find('input').simulate('change', mockedEvent);
  //   expect(store.getState().names.input).toBe('world');
  // });

  let changed = null;
  const handleChange = name => {
    changed = name;
  };

  // test("handleChange", () => {
  //   const wrapper = shallow(<BasicInfo onChange={handleChange} />);
  //   expect(wrapper.);
  // } )
});
