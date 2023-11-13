/// <reference types="react" />
import type { FlightRouterState } from '../app-render/types';
export type ReactReadableStream = ReadableStream<Uint8Array> & {
    allReady?: Promise<void> | undefined;
};
export declare function cloneTransformStream(source: TransformStream): TransformStream<any, any>;
export declare function chainStreams<T>(...streams: ReadableStream<T>[]): ReadableStream<T>;
export declare function streamFromString(str: string): ReadableStream<Uint8Array>;
export declare function streamToString(stream: ReadableStream<Uint8Array>): Promise<string>;
export declare function createBufferedTransformStream(): TransformStream<Uint8Array, Uint8Array>;
export declare function renderToInitialFizzStream({ ReactDOMServer, element, streamOptions, }: {
    ReactDOMServer: typeof import('react-dom/server.edge');
    element: React.ReactElement;
    streamOptions?: any;
}): Promise<ReactReadableStream>;
export declare function createRootLayoutValidatorStream(assetPrefix: string | undefined, getTree: () => FlightRouterState): TransformStream<Uint8Array, Uint8Array>;
export type ContinueStreamOptions = {
    inlinedDataStream: ReadableStream<Uint8Array> | undefined;
    generateStaticHTML: boolean;
    getServerInsertedHTML: (() => Promise<string>) | undefined;
    serverInsertedHTMLToHead: boolean;
    validateRootLayout: {
        assetPrefix: string | undefined;
        getTree: () => FlightRouterState;
    } | undefined;
    /**
     * Suffix to inject after the buffered data, but before the close tags.
     */
    suffix: string | undefined;
};
export declare function continueFizzStream(renderStream: ReactReadableStream, { suffix, inlinedDataStream, generateStaticHTML, getServerInsertedHTML, serverInsertedHTMLToHead, validateRootLayout, }: ContinueStreamOptions): Promise<ReadableStream<Uint8Array>>;
type ContinuePostponedStreamOptions = Pick<ContinueStreamOptions, 'inlinedDataStream' | 'generateStaticHTML' | 'getServerInsertedHTML' | 'serverInsertedHTMLToHead'>;
export declare function continuePostponedFizzStream(renderStream: ReactReadableStream, { inlinedDataStream, generateStaticHTML, getServerInsertedHTML, serverInsertedHTMLToHead, }: ContinuePostponedStreamOptions): Promise<ReadableStream<Uint8Array>>;
export {};
