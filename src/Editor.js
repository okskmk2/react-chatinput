import React, { useRef, useEffect } from "react";

const Editor = (props) => {
  const { setEditorState } = props;
  const editorRef = useRef();

  const onChange = (e) => {
    // e.persist();
    let key = "";
    if (e.type === "compositionupdate") {
      key = e.data;
    } else {
      key = e.key;
    }

    if (e.key) {
      console.log(e.key);
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          console.log(11);
          break;
        case "ArrowDown":
          e.preventDefault();
          console.log(22);
          break;
        case "Enter":
          e.preventDefault();
          break;
        default:
          break;
      }
    }

    setEditorState((prev) => {
      return {
        ...prev,
        key,
        editorChanger: ++prev.editorChanger,
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
