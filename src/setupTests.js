import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { shallow, mount, render } from "enzyme";
import { createSerializer } from "enzyme-to-json";
// import sinon from "sinon";
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
// global.sinon = sinon;
