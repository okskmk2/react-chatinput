import React, { useState } from "react";
import Mention from "./Mention";
import Editor from "./Editor";

let editorChanger = 0;

function App() {
  // editor
  const [editorState, setEditorState] = useState({
    editorChanger,
    dom: null,
    key: "",
  });

  // mention
  const [isOpenMention, setIsOpenMention] = useState(false);

  return (
    <div className="App">
      <Mention
        editorState={editorState}
        setEditorState={setEditorState}
        setIsOpenMention={setIsOpenMention}
        isOpenMention={isOpenMention}
      />
      <Editor editorState={editorState} setEditorState={setEditorState} />
    </div>
  );
}

export default App;
