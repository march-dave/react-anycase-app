import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { shallow, mount, render } from "enzyme";
// import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.mount = mount;
// global.sinon = sinon;
