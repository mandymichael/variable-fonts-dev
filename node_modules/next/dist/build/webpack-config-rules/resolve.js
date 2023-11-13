"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    edgeConditionNames: null,
    getMainField: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    edgeConditionNames: function() {
        return edgeConditionNames;
    },
    getMainField: function() {
        return getMainField;
    }
});
const _constants = require("../../shared/lib/constants");
const edgeConditionNames = [
    "edge-light",
    "worker",
    // inherits the default conditions
    "..."
];
const mainFieldsPerCompiler = {
    // For default case, prefer CJS over ESM on server side. e.g. pages dir SSR
    [_constants.COMPILER_NAMES.server]: [
        "main",
        "module"
    ],
    [_constants.COMPILER_NAMES.client]: [
        "browser",
        "module",
        "main"
    ],
    [_constants.COMPILER_NAMES.edgeServer]: edgeConditionNames,
    // For app router since everything is bundled, prefer ESM over CJS
    "app-router-server": [
        "module",
        "main"
    ]
};
function getMainField(pageType, compilerType) {
    if (compilerType === _constants.COMPILER_NAMES.edgeServer) {
        return edgeConditionNames;
    } else if (compilerType === _constants.COMPILER_NAMES.client) {
        return mainFieldsPerCompiler[_constants.COMPILER_NAMES.client];
    }
    // Prefer module fields over main fields for isomorphic packages on server layer
    return pageType === "app" ? mainFieldsPerCompiler["app-router-server"] : mainFieldsPerCompiler[_constants.COMPILER_NAMES.server];
}

//# sourceMappingURL=resolve.js.map