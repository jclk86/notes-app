import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddNote from "./AddNote";

describe(`AddNoteForm component`, () => {
  const folders = [
    {
      id: 1,
      name: "folder"
    }
  ];
  it("renders the complete form", () => {
    const wrapper = shallow(<AddNote {...folders} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
