import React, { useState, useRef } from "react";
import Mention from "./Mention";
import { makeElementByConfig, setCaret } from "./utils";
import * as Hangul from "hangul-js";

let editorChanger = 0;

const commandList = [
  { name: "Mail", subCommands: [{ command: "search" }, { command: "help" }] },
  { name: "Moto", subCommands: [{ command: "search" }, { command: "help" }] },
  {
    name: "Approval",
    subCommands: [{ command: "search" }, { command: "help" }],
  },
];

function App() {
  // editor
  const editorRef = useRef();
  const [editorState, setEditorState] = useState({
    editorChanger,
    dom: null,
    key: "",
  });

  // mention
  const [isOpenMention, setIsOpenMention] = useState(false);

  const levelDifiner = (text) => {
    if (text.slice(-1).charCodeAt() === 59) {
      text = text.replace('&nbsp;', ' ');
    }
    const token = text.split(" ");
    console.log({ token });
  };

  const onCompositionUpdate = (e) => {};

  // 일반 텍스트
  const onKeyUp = (e) => {
    const inputText = editorRef.current.innerHTML;
    levelDifiner(inputText);
  };
  // 방향키
  const onKeyDown = (e) => {};

  return (
    <div className="App">
      {/* <Mention
        editorState={editorState}
        setEditorState={setEditorState}
        setIsOpenMention={setIsOpenMention}
        isOpenMention={isOpenMention}
      /> */}
      <div
        onCompositionUpdate={onCompositionUpdate}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        ref={editorRef}
        contentEditable="true"
        className="chatinput-container"
      />
    </div>
  );
}

export default App;
