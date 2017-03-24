// A hack for the Redux DevTools Chrome extension.



/**
 * require
 * 
 * @interface WebpackRequireEnsureCallback
 */
interface WebpackRequireEnsureCallback {
    (req: WebpackRequire): void
}

/**
 * If you has installed @types/node please uninstall it, we use require.ensure for code-splitting
 * and these definitions if for webpack require function use...
 */
interface WebpackRequire {
    (id: string): any;
    (paths: string[],
        callback: (...modules: any[]) => void
    ): void;
    ensure(ids: string[],
        callback: WebpackRequireEnsureCallback,
        chunkName?: string
    ): void;
    context(directory: string,
        useSubDirectories?: boolean,
        regExp?: RegExp
    ): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
    keys(): string[];
}

declare var require: WebpackRequire;

/**
 * process
 */
declare var process: {
    env: {
        NODE_ENV?: string
        [key: string]: any
    }
}
