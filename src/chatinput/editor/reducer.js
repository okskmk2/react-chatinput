const editorReducer = (state, action) => {
  switch (action.type) {
    case "INNER_UPDATE":
      return { ...state, content: action.payload.content };
    case "UPDATE":
      return {
        ...state,
        content: action.payload.content,
        updateChanger: !state.updateChanger,
      };
    default:
      break;
  }
};

export default editorReducer;
