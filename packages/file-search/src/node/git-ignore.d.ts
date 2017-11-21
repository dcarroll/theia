export interface GitIgnore {
    isFiltered(fileName: string): boolean;
}
export declare class GitIgnoreImpl implements GitIgnore {
    private parent;
    private positives;
    private negatives;
    constructor(gitIgnoreContent: string, parent?: GitIgnore | undefined);
    isFiltered(fileName: string): boolean;
}
export declare const NO_IGNORE: GitIgnore;
export declare function findContainingGitIgnore(basePath: string): Promise<GitIgnore>;
export declare function findGitIgnore(dir: string, parent: GitIgnore): Promise<GitIgnore>;
