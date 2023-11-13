/// <reference types="node" />
import type { ServerResponse } from 'http';
import type { StaticGenerationStore } from '../client/components/static-generation-async-storage.external';
import type { Revalidate } from './lib/revalidate';
type ContentTypeOption = string | undefined;
export type RenderResultMetadata = {
    pageData?: any;
    revalidate?: Revalidate;
    staticBailoutInfo?: any;
    assetQueryString?: string;
    isNotFound?: boolean;
    isRedirect?: boolean;
    fetchMetrics?: StaticGenerationStore['fetchMetrics'];
    fetchTags?: string;
    waitUntil?: Promise<any>;
    postponed?: string;
};
type RenderResultResponse = ReadableStream<Uint8Array>[] | ReadableStream<Uint8Array> | string | null;
export default class RenderResult {
    /**
     * The detected content type for the response. This is used to set the
     * `Content-Type` header.
     */
    readonly contentType: ContentTypeOption;
    /**
     * The metadata for the response. This is used to set the revalidation times
     * and other metadata.
     */
    readonly metadata: RenderResultMetadata;
    /**
     * The response itself. This can be a string, a stream, or null. If it's a
     * string, then it's a static response. If it's a stream, then it's a
     * dynamic response. If it's null, then the response was not found or was
     * already sent.
     */
    private response;
    /**
     * Creates a new RenderResult instance from a static response.
     *
     * @param value the static response value
     * @returns a new RenderResult instance
     */
    static fromStatic(value: string): RenderResult;
    private waitUntil?;
    constructor(response: RenderResultResponse, { contentType, waitUntil, ...metadata }?: {
        contentType?: ContentTypeOption;
    } & RenderResultMetadata);
    extendMetadata(metadata: RenderResultMetadata): void;
    /**
     * Returns true if the response is null. It can be null if the response was
     * not found or was already sent.
     */
    get isNull(): boolean;
    /**
     * Returns false if the response is a string. It can be a string if the page
     * was prerendered. If it's not, then it was generated dynamically.
     */
    get isDynamic(): boolean;
    /**
     * Returns the response if it is a string. If the page was dynamic, this will
     * return a promise if the `stream` option is true, or it will throw an error.
     *
     * @param stream Whether or not to return a promise if the response is dynamic
     * @returns The response as a string
     */
    toUnchunkedString(stream?: false): string;
    toUnchunkedString(stream: true): Promise<string>;
    /**
     * Returns the response if it is a stream, or throws an error if it is a
     * string.
     */
    private get readable();
    /**
     * Chains a new stream to the response. This will convert the response to an
     * array of streams if it is not already one and will add the new stream to
     * the end. When this response is piped, all of the streams will be piped
     * one after the other.
     *
     * @param readable The new stream to chain
     */
    chain(readable: ReadableStream<Uint8Array>): void;
    /**
     * Pipes the response to a writable stream. This will close/cancel the
     * writable stream if an error is encountered.
     *
     * @param writable Writable stream to pipe the response to
     */
    pipeTo(writable: WritableStream<Uint8Array>): Promise<void>;
    /**
     * Pipes the response to a node response. This will close/cancel the node
     * response if an error is encountered.
     *
     * @param res
     */
    pipeToNodeResponse(res: ServerResponse): Promise<void>;
}
export {};
