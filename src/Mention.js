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
    const cs = editorState.dom.children;
    console.log(cs[editorState.dom.children.length-1]);
    for (let i = 0; i < cs.length; i++) {
      const element = cs[i];
      console.log(element);
    }
    editorState.dom.appendChild(
      makeElementByConfig({
        type: "span",
        innerHTML: "@" + e.target.innerHTML,
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
    // console.log(editorState.dom);
    if (editorState.dom) {
      const text = editorState.dom.textContent; // textContent => IE11 ok
      if (text.endsWith("@")) {
        setSuggestion(() => channelMemberList);
      } else if (text === "") {
        setSuggestion(() => []); // IE11 ok
      } else {
        let rtn2 = [...text.matchAll(/(?<=@)\S+(?=$)/ig)];
        console.log(rtn2);
        let rtn = text.match(/(?<=@)\S+(?=$)/i);
        if (rtn) {
          let searchValue = text.match(/(?<=@)\S+(?=$)/i).pop();
          console.log(searchValue);
          setSuggestion(() =>
            channelMemberList.filter(
              (v) => Hangul.search(v.name, searchValue) > -1
            )
          );
        }
      }
    }
  }, [editorState.editorChanger]);

  useEffect(() => {
    console.log(editorState.key);
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
