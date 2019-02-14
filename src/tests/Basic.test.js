import React from 'react';
// import renderer from 'react-test-renderer';
import Basic from '../Basic'
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });


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