import { chainStreams, streamFromString, streamToString } from "./stream-utils/node-web-streams-helper";
import { isAbortError, pipeToNodeResponse } from "./pipe-readable";
export default class RenderResult {
    /**
   * Creates a new RenderResult instance from a static response.
   *
   * @param value the static response value
   * @returns a new RenderResult instance
   */ static fromStatic(value) {
        return new RenderResult(value);
    }
    constructor(response, { contentType, waitUntil, ...metadata } = {}){
        this.response = response;
        this.contentType = contentType;
        this.metadata = metadata;
        this.waitUntil = waitUntil;
    }
    extendMetadata(metadata) {
        Object.assign(this.metadata, metadata);
    }
    /**
   * Returns true if the response is null. It can be null if the response was
   * not found or was already sent.
   */ get isNull() {
        return this.response === null;
    }
    /**
   * Returns false if the response is a string. It can be a string if the page
   * was prerendered. If it's not, then it was generated dynamically.
   */ get isDynamic() {
        return typeof this.response !== "string";
    }
    toUnchunkedString(stream = false) {
        if (this.response === null) {
            throw new Error("Invariant: null responses cannot be unchunked");
        }
        if (typeof this.response !== "string") {
            if (!stream) {
                throw new Error("Invariant: dynamic responses cannot be unchunked. This is a bug in Next.js");
            }
            return streamToString(this.readable);
        }
        return this.response;
    }
    /**
   * Returns the response if it is a stream, or throws an error if it is a
   * string.
   */ get readable() {
        if (this.response === null) {
            throw new Error("Invariant: null responses cannot be streamed");
        }
        if (typeof this.response === "string") {
            throw new Error("Invariant: static responses cannot be streamed");
        }
        // If the response is an array of streams, then chain them together.
        if (Array.isArray(this.response)) {
            return chainStreams(...this.response);
        }
        return this.response;
    }
    /**
   * Chains a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the end. When this response is piped, all of the streams will be piped
   * one after the other.
   *
   * @param readable The new stream to chain
   */ chain(readable) {
        if (this.response === null) {
            throw new Error("Invariant: response is null. This is a bug in Next.js");
        }
        // If the response is not an array of streams already, make it one.
        let responses;
        if (typeof this.response === "string") {
            responses = [
                streamFromString(this.response)
            ];
        } else if (Array.isArray(this.response)) {
            responses = this.response;
        } else {
            responses = [
                this.response
            ];
        }
        // Add the new stream to the array.
        responses.push(readable);
        // Update the response.
        this.response = responses;
    }
    /**
   * Pipes the response to a writable stream. This will close/cancel the
   * writable stream if an error is encountered.
   *
   * @param writable Writable stream to pipe the response to
   */ async pipeTo(writable) {
        try {
            await this.readable.pipeTo(writable);
        } catch (err) {
            // If this isn't a client abort, then re-throw the error.
            if (!isAbortError(err)) {
                throw err;
            }
        } finally{
            if (this.waitUntil) {
                await this.waitUntil;
            }
        }
    }
    /**
   * Pipes the response to a node response. This will close/cancel the node
   * response if an error is encountered.
   *
   * @param res
   */ async pipeToNodeResponse(res) {
        try {
            await pipeToNodeResponse(this.readable, res);
        } finally{
            if (this.waitUntil) {
                await this.waitUntil;
            }
        }
    }
}

//# sourceMappingURL=render-result.js.map