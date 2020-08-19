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
      if (text.endsWith("@")) {
        setSuggestion(() => channelMemberList);
      } else if (text === "") {
        setSuggestion(() => []); // IE11 ok
      }
    }
  }, [editorState.editorChanger]);

  useEffect(() => {
    const suggestionSelected = document.querySelector(".suggestion-selected");
    if (suggestionSelected) {
      switch (editorState.key) {
        case "ArrowUp":
          if (suggestionSelected.previousElementSibling) {
            suggestionSelected.previousElementSibling.classList.add(
              "suggestion-selected"
            );
            suggestionSelected.classList.remove("suggestion-selected");
          }
          break;
        case "ArrowDown":
          if (suggestionSelected.nextElementSibling) {
            suggestionSelected.nextElementSibling.classList.add(
              "suggestion-selected"
            );
            suggestionSelected.classList.remove("suggestion-selected");
          }
          break;
        case "Enter":
          editorState.dom.appendChild(
            makeElementByConfig({
              type: "span",
              innerHTML: suggestionSelected.innerHTML,
              attrs: [{ name: "class", value: "mention-label" }],
            })
          );
          editorState.dom.appendChild(
            makeElementByConfig({
              type: "span",
              innerHTML: "\u00A0",
            })
          );
          setSuggestion(() => []);
          break;
        default:
          break;
      }
    }
  }, [editorState.editorChanger]);

  useEffect(() => {
    if (suggestion.length > 0) {
      const mentionUl = document.querySelector(".mention-ul");
      mentionUl.firstElementChild.classList.add("suggestion-selected");
    }
  }, [suggestion]);

  return (
    <div>
      <ul className="mention-ul">
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
