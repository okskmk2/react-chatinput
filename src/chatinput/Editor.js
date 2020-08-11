import React, { useRef } from "react";
import PropTypes from "prop-types";

const Editor = (props) => {
  const { setEditorContent, className } = props;
  const editorRef = useRef(null);
  const onChange = () => {
    setTimeout(() => {
      setEditorContent(editorRef.current.innerText);
    }, 0);
  };
  return (
    <div
      className={className}
      contentEditable="true"
      ref={editorRef}
      onCompositionUpdate={onChange}
      onKeyDown={onChange}
    />
  );
};

Editor.propTypes = {
  setEditorContent: PropTypes.func.isRequired,
};

export default Editor;
