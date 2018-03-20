// A hack for the Redux DevTools Chrome extension.

/**
 * require
 *
 * @interface WebpackRequireEnsureCallback
 */
interface WebpackRequireEnsureCallback {
  (req: WebpackRequire): void;
}

/**
 * If you has installed @types/node please uninstall it, we use require.ensure for code-splitting
 * and these definitions if for webpack require function use...
 */
interface WebpackRequire extends NodeRequire{
  (id: string): any;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure(
    ids: string[],
    callback: WebpackRequireEnsureCallback,
    chunkName?: string
  ): void;
  context(
    directory: string,
    useSubDirectories?: boolean,
    regExp?: RegExp
  ): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
  keys(): string[];
}

declare var require: WebpackRequire;
