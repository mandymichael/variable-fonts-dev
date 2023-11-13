import type { Normalizer } from '../normalizer';
export declare class RSCPathnameNormalizer implements Normalizer {
    private readonly hasAppDir;
    constructor(hasAppDir: boolean);
    match(pathname: string): boolean;
    normalize(pathname: string, matched?: boolean): string;
}
