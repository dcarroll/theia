/**
 * On POSIX:
 * ┌──────────────────────┬────────────┐
 * │          dir         │    base    │
 * ├──────┬               ├──────┬─────┤
 * │ root │               │ name │ ext │
 * "  /     home/user/dir / file  .txt "
 * └──────┴───────────────┴──────┴─────┘
 *
 * On Windows:
 * ┌──────────────────────┬────────────┐
 * │           dir        │    base    │
 * ├──────┬               ├──────┬─────┤
 * │ root │               │ name │ ext │
 * "  /c: / home/user/dir / file  .txt "
 * └──────┴───────────────┴──────┴─────┘
 */
export declare class Path {
    private raw;
    static separator: '/';
    static isDrive(segment: string): boolean;
    readonly isAbsolute: boolean;
    readonly isRoot: boolean;
    readonly root: Path | undefined;
    readonly base: string;
    readonly name: string;
    readonly ext: string;
    private _dir;
    /**
     * The raw should be normalized, meaning that only '/' is allowed as a path separator.
     */
    constructor(raw: string);
    protected computeRoot(): Path | undefined;
    readonly dir: Path;
    protected computeDir(): Path;
    join(...paths: string[]): Path;
    toString(): string;
}
