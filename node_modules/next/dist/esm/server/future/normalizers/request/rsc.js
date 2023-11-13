export class RSCPathnameNormalizer {
    constructor(hasAppDir){
        this.hasAppDir = hasAppDir;
    }
    match(pathname) {
        // If there's no app directory, we don't match.
        if (!this.hasAppDir) return false;
        // If the pathname doesn't end in `.rsc`, we don't match.
        if (!pathname.endsWith(".rsc")) return false;
        return true;
    }
    normalize(pathname, matched) {
        // If there's no app directory, we don't need to normalize.
        if (!this.hasAppDir) return pathname;
        // If we're not matched and we don't match, we don't need to normalize.
        if (!matched && !this.match(pathname)) return pathname;
        return pathname.substring(0, pathname.length - 4);
    }
}

//# sourceMappingURL=rsc.js.map