export class BasePathPathnameNormalizer {
    constructor(basePath){
        // A basePath of `/` is not a basePath.
        if (!basePath || basePath === "/") return;
        this.basePath = basePath;
    }
    match(pathname) {
        // If there's no basePath, we don't match.
        if (!this.basePath) return false;
        // If the pathname doesn't start with the basePath, we don't match.
        if (pathname !== this.basePath && !pathname.startsWith(this.basePath + "/")) return false;
        return true;
    }
    normalize(pathname, matched) {
        // If there's no basePath, we don't need to normalize.
        if (!this.basePath) return pathname;
        // If we're not matched and we don't match, we don't need to normalize.
        if (!matched && !this.match(pathname)) return pathname;
        return pathname.substring(this.basePath.length);
    }
}

//# sourceMappingURL=base-path.js.map