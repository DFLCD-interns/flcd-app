import { x as identity } from './ssr-D-0G9OQq.js';

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
//# sourceMappingURL=index4-DJfRHyEc.js.map
