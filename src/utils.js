export function makeElementByConfig(config) {
  const el = document.createElement(config.type);
  if (typeof config.innerHTML === "string") {
    el.innerHTML = config.innerHTML;
  } else if (config.innerHTML instanceof Node) {
    el.appendChild(config.innerHTML);
  }
  const handlers = config.handlers || [];
  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];
    el.addEventListener(handler.name, handler.callback);
  }
  const attrs = config.attrs || [];
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    el.setAttribute(attr.name, attr.value);
  }
  return el;
}

export function setCaret(el) {
  const selection = window.getSelection();
  const range = document.createRange();
//   range.selectNodeContents(el);
  range.setStart(el, 1);
  selection.removeAllRanges();
  selection.addRange(range);
}
