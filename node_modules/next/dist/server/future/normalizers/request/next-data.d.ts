import type { Normalizer } from '../normalizer';
export declare class NextDataPathnameNormalizer implements Normalizer {
    private readonly prefix;
    constructor(buildID: string);
    match(pathname: string): boolean;
    normalize(pathname: string, matched?: boolean): string;
}
