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

  const [slashInputLevel, setSlashInputLevel] = useState(0);

  const levelDifiner = (text) => {
    if (text.slice(-1).charCodeAt() === 59) {
      text = text.replace("&nbsp;", " ");
    }
    const token = text.split(" ");
    console.log({ token });
    switch (token.length) {
      case 1:
        setSlashInputLevel(1);
        break;
      case 2:
        setSlashInputLevel(2);
        break;
      case 3:
        setSlashInputLevel(3);
        break;
      default:
        setSlashInputLevel(0);
        break;
    }
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
      {slashInputLevel === 1 && (
        <div>
          {commandList.map((v) => (
            <div>{v.name}</div>
          ))}
        </div>
      )}
      {slashInputLevel === 2 && (
        <div>
          {commandList[0].subCommands.map((v) => (
            <div>{v.command}</div>
          ))}
        </div>
      )}
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
