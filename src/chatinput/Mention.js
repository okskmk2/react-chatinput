import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import * as Hangul from "hangul-js";
import PropTypes from "prop-types";

const Mention = (props) => {
  const mentionRegEx = /(?<=@)\S*/gi;
  const { editorContent } = props;
  const [suggestions, setSuggestions] = useState([]);
  const mentions = [
    { name: "백수진" },
    { name: "백승권" },
    { name: "배수진" },
    { name: "이은성" },
    { name: "mark" },
    { name: "max" },
  ];
  const mentionFilter = (searchValue, cadidates) => {
    return cadidates.filter(
      ({ name }) =>
        Hangul.search(name.toLowerCase(), searchValue.toLowerCase()) > -1
    );
  };
  useEffect(() => {
    let mention = editorContent.match(mentionRegEx);
    if (mention !== null) {
      setSuggestions(() =>
        mentionFilter(mention[mention.length - 1], mentions)
      );
    } else {
      setSuggestions(() => []);
    }
    // eslint-disable-next-line
  }, [editorContent]);
  return (
    <Fragment>
      {suggestions.length > 0 && (
        <div>
          {suggestions.map((item, i) => (
            <div key={i}>{item.name}</div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

Mention.propTypes = {
  editorContent: PropTypes.string.isRequired,
};

export default Mention;
