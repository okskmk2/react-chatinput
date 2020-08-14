import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Editor = (props) => {
  const ref = useRef();
  const { editorState, dispatchEditorState, className } = props;
  const onChange = () => {
    setTimeout(() => {
      if (ref.current) {
        dispatchEditorState({
          type: "INNER_UPDATE",
          payload: { content: ref.current.innerText },
        });
      }
    }, 0);
  };
  useEffect(() => {
    ref.current.innerText = editorState.content;
  }, [editorState.updateChanger]);
  return (
    <div
      ref={ref}
      className={className}
      contentEditable="true"
      onCompositionUpdate={onChange}
      onKeyDown={onChange}
    />
  );
};

Editor.propTypes = {
  setEditorContent: PropTypes.func,
};

export default Editor;
