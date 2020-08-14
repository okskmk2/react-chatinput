import React, { useState, useReducer } from "react";
import Editor from "./editor";
import Mention from "./Mention";
import AppDir from "./AppDir";
import Translator from "./Translator";
import editorReducer from './editor/reducer';


const ChatInput = () => {
  const [editorState, dispatchEditorState] = useReducer(editorReducer, {
    content: "",
    updateChanger: false,
  });
  const [isOpenTranslator, setIsOpenTranslator] = useState(false);
  const [isOpenAppdir, setIsOpenAppdir] = useState(false);
  return (
    <div className="chatinput-container">
      <Mention editorContent={editorState.content} />
      <div className="row ai-end">
        <div>
          <button>upload</button>
          <button
            onClick={() => {
              if (isOpenAppdir) {
                dispatchEditorState({
                  type: "UPDATE",
                  payload: { content: "" },
                });
              } else {
                dispatchEditorState({
                  type: "UPDATE",
                  payload: { content: "/" },
                });
              }
            }}
          >
            appdir
          </button>
        </div>
        <div className="rest">
          <AppDir
            editorContent={editorState.content}
            isOpenAppdir={isOpenAppdir}
            setIsOpenAppdir={setIsOpenAppdir}
          />
          <div className="row">
            <Editor
              editorState={editorState}
              dispatchEditorState={dispatchEditorState}
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
            editorContent={editorState.content}
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
              dispatchEditorState({
                type: "UPDATE",
                payload: { content: "" },
              });
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
