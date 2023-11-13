class StaticRenderer {
    async render(children, streamOptions) {
        const { prelude, postponed } = await this.prerender(children, streamOptions);
        return {
            stream: prelude,
            postponed
        };
    }
    constructor(){
        // this is for tree shaking. Couldn't find a better way to do it for some reason
        this.prerender = process.env.__NEXT_EXPERIMENTAL_REACT ? require("react-dom/static.edge").prerender : null;
    }
}
class StaticResumeRenderer {
    constructor(postponed){
        this.postponed = postponed;
        this.resume = require("react-dom/server.edge").resume;
    }
    async render(children, streamOptions) {
        const stream = await this.resume(children, this.postponed, streamOptions);
        return {
            stream
        };
    }
}
export class ServerRenderer {
    async render(children, options) {
        const stream = await this.renderToReadableStream(children, options);
        return {
            stream
        };
    }
    constructor(){
        this.renderToReadableStream = require("react-dom/server.edge").renderToReadableStream;
    }
}
export function createStaticRenderer({ ppr, isStaticGeneration, postponed }) {
    if (ppr) {
        if (isStaticGeneration) {
            return new StaticRenderer();
        }
        if (postponed) {
            return new StaticResumeRenderer(postponed);
        }
    }
    return new ServerRenderer();
}

//# sourceMappingURL=static-renderer.js.map