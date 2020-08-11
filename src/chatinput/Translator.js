import React, { Fragment } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Translator = (props) => {
  const { editorContent, isOpenTranslator, setIsOpenTranslator } = props;
  const [translatedInput, setTranslatedInput] = useState("");

  useEffect(() => {
    setTranslatedInput(() =>
      editorContent.split("").reverse().join("").split(" ").reverse().join(" ")
    );
  }, [editorContent]);

  return (
    <Fragment>{isOpenTranslator && <div>{translatedInput}</div>}</Fragment>
  );
};
Translator.propTypes = {
  editorContent: PropTypes.string.isRequired,
};
export default Translator;
