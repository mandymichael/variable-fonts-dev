"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostponedPathnameNormalizer", {
    enumerable: true,
    get: function() {
        return PostponedPathnameNormalizer;
    }
});
class PostponedPathnameNormalizer {
    constructor(ppr){
        this.ppr = ppr;
    }
    match(pathname) {
        // If PPR isn't enabled, we don't match.
        if (!this.ppr) return false;
        // If the pathname doesn't start with the prefix, we don't match.
        if (!pathname.startsWith("/_next/postponed")) return false;
        return true;
    }
    normalize(pathname, matched) {
        // If PPR isn't enabled, we don't need to normalize.
        if (!this.ppr) return pathname;
        // If we're not matched and we don't match, we don't need to normalize.
        if (!matched && !this.match(pathname)) return pathname;
        // Remove the prefix.
        return pathname.substring("/_next/postponed".length) || "/";
    }
}

//# sourceMappingURL=postponed.js.map