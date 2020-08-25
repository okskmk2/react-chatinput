import React, { useState, useRef } from "react";
import Mention from "./Mention";
import { makeElementByConfig, setCaret } from "./utils";
import * as Hangul from "hangul-js";

let editorChanger = 0;

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

  const onCompositionUpdate = (e) => {};
  // 일반 텍스트
  const onKeyUp = (e) => {
    setEditorState(() => ({
      dom: editorRef.current,
      editorChanger: !editorState.editorChanger,
    }));
  };
  // 방향키
  const onKeyDown = (e) => {
    e.persist();
    setEditorState(() => ({
      ...editorState,
      editorChanger: !editorState.editorChanger,
      key: e.key,
    }));
  };

  return (
    <div className="App">
      <Mention
        editorState={editorState}
        setEditorState={setEditorState}
        setIsOpenMention={setIsOpenMention}
        isOpenMention={isOpenMention}
      />
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
