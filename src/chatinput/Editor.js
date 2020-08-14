import React from "react";
import PropTypes from "prop-types";

const Editor = React.forwardRef((props, ref) => {
  const { setEditorContent, className } = props;
  const onChange = () => {
    setTimeout(() => {
      if (ref.current) {
        console.log(ref.current.innerText);
        if (setEditorContent) setEditorContent(ref.current.innerText);
      }
    }, 0);
  };
  return (
    <div
      ref={ref}
      className={className}
      contentEditable="true"
      onCompositionUpdate={onChange}
      onKeyDown={onChange}
    />
  );
});

Editor.propTypes = {
  setEditorContent: PropTypes.func,
};

export default Editor;
