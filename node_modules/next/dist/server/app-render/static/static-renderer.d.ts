/// <reference types="react" />
type StreamOptions = {
    onError?: (error: Error) => void;
    nonce?: string;
    bootstrapScripts?: {
        src: string;
        integrity?: string;
        crossOrigin?: string;
    }[];
    formState?: boolean;
};
type RenderResult = {
    stream: ReadableStream<Uint8Array>;
    postponed?: object | null;
};
export interface Renderer {
    render(children: JSX.Element, options: StreamOptions): Promise<RenderResult>;
}
export declare class ServerRenderer implements Renderer {
    private readonly renderToReadableStream;
    render(children: JSX.Element, options: StreamOptions): Promise<RenderResult>;
}
type Options = {
    ppr: boolean;
    isStaticGeneration: boolean;
    postponed: object | null;
};
export declare function createStaticRenderer({ ppr, isStaticGeneration, postponed, }: Options): Renderer;
export {};
