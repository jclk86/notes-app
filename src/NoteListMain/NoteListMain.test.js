import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NoteListMain from "./NoteListMain";
import ApiContext from "../ApiContext";

describe(`NoteListMain component`, () => {
  const props = {
    notes: [
      {
        id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Dogs",
        modified: "2019-01-03T00:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Corporis accusamus placeat.\n \rUnde."
      },
      {
        id: "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Cats",
        modified: "2018-08-15T23:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Eos\n \rlaudantium."
      },
      {
        id: "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Pigs",
        modified: "2018-03-01T00:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Occaecati dignissimos\nvoluptatum nihil."
      },
      {
        id: "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Birds",
        modified: "2019-01-04T00:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: "Eum culpa odit."
      }
    ]
  };

  it("renders a .NoteListMain by default", () => {
    const wrapper = shallow(
      <ApiContext.Provider>
        <NoteListMain />
      </ApiContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders a Note in ul for each notes in array", () => {
    const ul = shallow(
      <ApiContext.Provider>
        <NoteListMain
          {...props}
          match={{
            params: { folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1" }
          }}
        />
      </ApiContext.Provider>
    ).find("ul");
    expect(toJson(ul)).toMatchSnapshot();
  });
});
