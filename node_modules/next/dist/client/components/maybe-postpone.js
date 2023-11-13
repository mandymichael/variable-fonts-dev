"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "maybePostpone", {
    enumerable: true,
    get: function() {
        return maybePostpone;
    }
});
function maybePostpone(staticGenerationStore, reason) {
    // If we aren't performing a static generation or we aren't using PPR then
    // we don't need to postpone.
    if (!staticGenerationStore.isStaticGeneration || !staticGenerationStore.experimental.ppr) {
        return;
    }
    // App Route's cannot be postponed, so we only postpone if it's a page. If the
    // postpone API is available, use it now.
    const React = require("react");
    if (typeof React.unstable_postpone !== "function") return;
    React.unstable_postpone(reason);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=maybe-postpone.js.map