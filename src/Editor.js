import React, { useRef, useEffect } from "react";

const Editor = (props) => {
  const { setEditorState, onCompositionUpdate } = props;
  const editorRef = useRef();
  useEffect(() => {

    
    // setEditorState((prev) => ({
    //   dom: editorRef.current,
    //   editorChanger: ++prev.editorChanger,
    // }));
    // eslint-disable-next-line
  }, []);

  return (
    <div
      onCompositionUpdate={onCompositionUpdate}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      ref={editorRef}
      contentEditable="true"
      className="chatinput-container"
    />
  );
};

export default Editor;
