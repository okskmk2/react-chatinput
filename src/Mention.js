import React, { useEffect, useState } from "react";
import { makeElementByConfig } from "./utils";
import * as Hangul from "hangul-js";

const channelMemberList = [
  { name: "이은성" },
  { name: "max" },
  { name: "백승권" },
  { name: "백수진" },
];

const Mention = (props) => {
  const {
    editorState,
    setEditorState,
    isOpenMention,
    setIsOpenMention,
  } = props;

  const [suggestion, setSuggestion] = useState([]);

  const onClick = (e) => {
    editorState.dom.appendChild(
      makeElementByConfig({
        type: "span",
        innerHTML: e.target.innerHTML,
        attrs: [{ name: "class", value: "mention-label" }],
      })
    );
    editorState.dom.appendChild(
      makeElementByConfig({
        type: "span",
        innerHTML: "\u00A0",
      })
    );
  };

  useEffect(() => {
    if (editorState.dom) {
      const text = editorState.dom.textContent; // textContent => IE11 ok
      console.log("key", editorState.key);
      if (text.endsWith("@")) {
        setSuggestion(() => channelMemberList);
      } else if (text === "") {
        setSuggestion(() => []); // IE11 ok
      }
    }
  }, [editorState.editorChanger]);

  return (
    <div>
      <ul>
        {suggestion.map((member, i) => (
          <li key={i} onClick={onClick}>
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mention;
