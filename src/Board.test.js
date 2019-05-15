import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Board from "./Board";

//shallow smoke test
it("renders using shallow", function() {
  shallow(<Board />);
});

//mount smoke test
it("renders using mount", function() {
  mount(<Board />);
});

// snapshot test
it("matches snapshot", function() {
  let wrapper = shallow(<Board />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});