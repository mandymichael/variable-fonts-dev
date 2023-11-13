import type { Normalizer } from '../normalizer';
export declare class BasePathPathnameNormalizer implements Normalizer {
    private readonly basePath?;
    constructor(basePath: string);
    match(pathname: string): boolean;
    normalize(pathname: string, matched?: boolean): string;
}
