import React, { Fragment, createRef } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Editor from "./Editor";

const Translator = (props) => {
  const { editorContent, isOpenTranslator } = props;
  const editorRef = createRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent
        .split("")
        .reverse()
        .join("")
        .split(" ")
        .reverse()
        .join(" ");
    }
    // eslint-disable-next-line
  }, [editorContent]);

  return (
    <Fragment>
      {isOpenTranslator && (
        <div className="row">
          <div className="rest">
            <Editor ref={editorRef} />
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
