import React, { useState, createRef } from "react";
import Editor from "./Editor";
import Mention from "./Mention";
import AppDir from "./AppDir";
import Translator from "./Translator";

const ChatInput = () => {
  const editorRef = createRef();
  const [editorContent, setEditorContent] = useState("");
  const [isOpenTranslator, setIsOpenTranslator] = useState(false);
  return (
    <div className="chatinput-container">
      <Mention editorContent={editorContent} />
      <div className="row ai-end">
        <div>
          <button>upload</button>
          <button>appdir</button>
        </div>
        <div className="rest">
          <AppDir editorContent={editorContent} />
          <div className='row'>
            <Editor
              setEditorContent={setEditorContent}
              ref={editorRef}
              className="rest"
            />
            {isOpenTranslator && (
              <select>
                <option>ko</option>
                <option>en</option>
              </select>
            )}
          </div>
          <Translator
            editorContent={editorContent}
            setIsOpenTranslator={setIsOpenTranslator}
            isOpenTranslator={isOpenTranslator}
          />
        </div>
        <div>
          <button>emoji</button>
          <button
            onClick={() => {
              setIsOpenTranslator(() => !isOpenTranslator);
            }}
          >
            tranlator
          </button>
          <button
            onClick={() => {
              editorRef.current.innerHTML = "";
            }}
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
