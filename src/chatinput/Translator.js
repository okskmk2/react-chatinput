import React, { Fragment, useReducer } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Editor from "./editor";
import editorReducer from "./editor/reducer";

const Translator = (props) => {
  const { editorContent, isOpenTranslator } = props;
  const [editorState, dispatchEditorState] = useReducer(editorReducer, {
    content: "",
    updateChanger: false,
  });

  useEffect(() => {
    dispatchEditorState({
      type: "UPDATE",
      payload: {
        content: editorContent
          .split("")
          .reverse()
          .join("")
          .split(" ")
          .reverse()
          .join(" "),
      },
    });
    // eslint-disable-next-line
  }, [editorContent]);

  return (
    <Fragment>
      {isOpenTranslator && (
        <div className="row">
          <div className="rest">
            <Editor
              editorState={editorState}
              dispatchEditorState={dispatchEditorState}
            />
          </div>
          <select>
            <option>ko</option>
            <option>en</option>
          </select>
        </div>
      )}
    </Fragment>
  );
};
Translator.propTypes = {
  editorContent: PropTypes.string.isRequired,
};
export default Translator;
