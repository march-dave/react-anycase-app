import React from 'react';
import SeeRef from '../SeeRef';
import { shallow } from "enzyme";

describe("SeeRef", () => {
  let component = null;

  it("renders correctly", () => {
    component = shallow(<SeeRef />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });


  // it("renders correctly", () => {
  //   const wrapper = shallow(<App />);
  //   // const countState = wrapper.state().totalNumber
  //   const text = wrapper.find('p').text();
  //   expect(text).toEqual("1")
  // });


  // let totalNumber = 1;
  // const onIncrease = (totalNumber) => {
  //   totalNumber = totalNumber + 1
  // };

  // it("render correclty button click", () => {
  //   component = shallow(<Counter onClick={onIncrease} />);
  // });

  // it("matches snapshot", () => {
  //   expect(component).toMatchSnapshot();
  // });

  // describe("button", () => {
  //   it("has a button", () => {
  //     expect(component.find("button").exists()).toBe(true);
  //   });
  // });

});


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
