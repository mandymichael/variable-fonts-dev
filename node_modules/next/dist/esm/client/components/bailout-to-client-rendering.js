import { throwWithNoSSR } from "../../shared/lib/lazy-dynamic/no-ssr-error";
import { staticGenerationAsyncStorage } from "./static-generation-async-storage.external";
export function bailoutToClientRendering() {
    const staticGenerationStore = staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        throwWithNoSSR();
    }
    return false;
}

//# sourceMappingURL=bailout-to-client-rendering.js.map