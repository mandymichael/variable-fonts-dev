import type { Normalizer } from '../normalizer';
export declare class PostponedPathnameNormalizer implements Normalizer {
    private readonly ppr;
    constructor(ppr: boolean | undefined);
    match(pathname: string): boolean;
    normalize(pathname: string, matched?: boolean): string;
}
