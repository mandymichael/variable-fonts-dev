/// <reference types="node" />
/// <reference types="node" />
import type { OutgoingHttpHeaders } from 'http';
import type RenderResult from '../render-result';
import type { Revalidate } from '../lib/revalidate';
export interface ResponseCacheBase {
    get(key: string | null, responseGenerator: ResponseGenerator, context: {
        isOnDemandRevalidate?: boolean;
        isPrefetch?: boolean;
        incrementalCache: IncrementalCache;
    }): Promise<ResponseCacheEntry | null>;
}
export interface CachedFetchValue {
    kind: 'FETCH';
    data: {
        headers: {
            [k: string]: string;
        };
        body: string;
        url: string;
        status?: number;
        tags?: string[];
    };
    revalidate: number;
}
export interface CachedRedirectValue {
    kind: 'REDIRECT';
    props: Object;
}
interface CachedPageValue {
    kind: 'PAGE';
    html: RenderResult;
    postponed: string | undefined;
    pageData: Object;
    status: number | undefined;
    headers: OutgoingHttpHeaders | undefined;
}
export interface CachedRouteValue {
    kind: 'ROUTE';
    body: Buffer;
    status: number;
    headers: OutgoingHttpHeaders;
}
export interface CachedImageValue {
    kind: 'IMAGE';
    etag: string;
    buffer: Buffer;
    extension: string;
    isMiss?: boolean;
    isStale?: boolean;
}
interface IncrementalCachedPageValue {
    kind: 'PAGE';
    html: string;
    pageData: Object;
    postponed: string | undefined;
    headers: OutgoingHttpHeaders | undefined;
    status: number | undefined;
}
export type IncrementalCacheEntry = {
    curRevalidate?: number | false;
    revalidateAfter: number | false;
    isStale?: boolean | -1;
    value: IncrementalCacheValue | null;
};
export type IncrementalCacheValue = CachedRedirectValue | IncrementalCachedPageValue | CachedImageValue | CachedFetchValue | CachedRouteValue;
export type ResponseCacheValue = CachedRedirectValue | CachedPageValue | CachedImageValue | CachedRouteValue;
export type ResponseCacheEntry = {
    revalidate?: Revalidate;
    value: ResponseCacheValue | null;
    isStale?: boolean | -1;
    isMiss?: boolean;
};
/**
 * @param hasResolved whether the responseGenerator has resolved it's promise
 * @param previousCacheEntry the previous cache entry if it exists or the current
 */
export type ResponseGenerator = (hasResolved: boolean, previousCacheEntry?: IncrementalCacheItem) => Promise<ResponseCacheEntry | null>;
export type IncrementalCacheItem = {
    revalidateAfter?: number | false;
    curRevalidate?: number | false;
    revalidate?: number | false;
    value: IncrementalCacheValue | null;
    isStale?: boolean | -1;
    isMiss?: boolean;
} | null;
export interface IncrementalCache {
    get: (key: string, ctx?: {
        fetchCache?: boolean;
    }) => Promise<IncrementalCacheItem>;
    set: (key: string, data: IncrementalCacheValue | null, ctx: {
        revalidate: Revalidate;
    }) => Promise<void>;
}
export {};
