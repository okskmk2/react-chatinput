import React, { useState, Fragment } from "react";
import Editor from "./Editor";
import Mention from "./Mention";
import AppDir from "./AppDir";
import Translator from "./Translator";

const ChatInput = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isOpenTranslator, setIsOpenTranslator] = useState(false);
  const onClick = () => {
    setIsOpenTranslator(() => !isOpenTranslator);
  };
  return (
    <Fragment>
      <Mention editorContent={editorContent} />
      <div className="row ai-end">
        <div>
          <button>upload</button>
          <button>appdir</button>
        </div>
        <div className="rest">
          <AppDir editorContent={editorContent} />
          <Editor setEditorContent={setEditorContent} />
          <Translator
            editorContent={editorContent}
            setIsOpenTranslator={setIsOpenTranslator}
            isOpenTranslator={isOpenTranslator}
          />
        </div>
        <div>
          <button>emoji</button>
          <button onClick={onClick}>tranlator</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatInput;
