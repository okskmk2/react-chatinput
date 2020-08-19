import React, { useRef, useEffect } from "react";

const Editor = (props) => {
  const { setEditorState } = props;
  const editorRef = useRef();

  const onChange = (e) => {
    e.persist();
    let key = "";
    if (e.type === "compositionupdate") {
      key = e.data;
    } else {
      key = e.key;
    }
    console.log(e);
    // if (editorRef.current.textContent.endsWith(e.key)) {
    // update editorChanger for event-wise
    setEditorState((prev) => {
      return {
        ...prev,
        editorChanger: ++prev.editorChanger,
        key,
      };
    });
    // }
  };

  useEffect(() => {
    setEditorState((prev) => ({
      dom: editorRef.current,
      editorChanger: ++prev.editorChanger,
    }));
    // eslint-disable-next-line
  }, []);

  return (
    <div
      onCompositionUpdate={onChange}
      onKeyUp={onChange}
      ref={editorRef}
      contentEditable="true"
      className="chatinput-container"
    />
  );
};

export default Editor;
