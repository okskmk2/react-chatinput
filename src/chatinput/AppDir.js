import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const AppDir = (props) => {
  const { editorContent } = props;
  const [isOpenAppdir, setIsOpenAppdir] = useState(false);
  useEffect(() => {
    if (editorContent.endsWith("/")) {
      setIsOpenAppdir(true);
    } else {
      setIsOpenAppdir(false);
    }
  }, [editorContent]);
  return <Fragment>{isOpenAppdir && <div>appdir</div>}</Fragment>;
};

AppDir.propTypes = {
  editorContent: PropTypes.string.isRequired,
};

export default AppDir;
