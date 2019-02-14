import React from 'react';
import Basic from '../Basic'
import { shallow } from "enzyme";

describe('Counter', () => {
  let component = null;

  it("renders correctly", () => {
    component = shallow(<Basic />);
  });

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });


  // it('renders correctly', () => {
  //   component = renderer.create(<Basic />);
  // });

  // it('matches snapshot', () => {
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // })
}); 