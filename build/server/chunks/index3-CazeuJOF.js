import { x as identity } from './ssr-C5koH-x7.js';

function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}

export { fade as f };
//# sourceMappingURL=index3-CazeuJOF.js.map
