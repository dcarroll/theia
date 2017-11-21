export interface WorkingDirectoryStatus {
    /**
     * `true` if the repository exists, otherwise `false`.
     */
    readonly exists: boolean;
    /**
     * An array of changed files.
     */
    readonly changes: GitFileChange[];
    /**
     * The optional name of the branch. Can be absent.
     */
    readonly branch?: string;
    /**
     * The name of the upstream branch. Optional.
     */
    readonly upstreamBranch?: string;
    /**
     * Wraps the `ahead` and `behind` numbers.
     */
    readonly aheadBehind?: {
        ahead: number;
        behind: number;
    };
    /**
     * The hash string of the current HEAD.
     */
    readonly currentHead?: string;
}
export declare namespace WorkingDirectoryStatus {
    /**
     * `true` if the directory statuses are deep equal, otherwise `false`.
     */
    function equals(left: WorkingDirectoryStatus | undefined, right: WorkingDirectoryStatus | undefined): boolean;
}
/**
 * Enumeration of states that a file resource can have in the working directory.
 */
export declare enum GitFileStatus {
    'New' = 0,
    'Modified' = 1,
    'Deleted' = 2,
    'Renamed' = 3,
    'Conflicted' = 4,
    'Copied' = 5,
}
/**
 * Representation of an individual file change in the working directory.
 */
export interface GitFileChange {
    /**
     * The current URI of the changed file resource.
     */
    readonly uri: string;
    /**
     * The previous URI of the changed URI. Can be absent if the file is new, or just changed and so on.
     */
    readonly oldUri?: string;
    /**
     * The file status.
     */
    readonly status: GitFileStatus;
    /**
     * `true` if the file is staged, otherwise `false`.
     */
    readonly staged: boolean;
}
/**
 * Bare minimum representation of a local Git clone.
 */
export interface Repository {
    /**
     * The FS URI of the local clone.
     */
    readonly localUri: string;
}
/**
 * The branch type. Either local or remote.
 * The order matters.
 */
export declare enum BranchType {
    /**
     * The local branch type.
     */
    Local = 0,
    /**
     * The remote branch type.
     */
    Remote = 1,
}
/**
 * Representation of a Git branch.
 */
export interface Branch {
    /**
     * The short name of the branch. For instance; `master`.
     */
    readonly name: string;
    /**
     * The remote-prefixed upstream name. For instance; `origin/master`.
     */
    readonly upstream?: string;
    /**
     * The type of branch. Could be either [local](BranchType.Local) or [remote](BranchType.Remote).
     */
    readonly type: BranchType;
    /**
     * The commit associated with this branch.
     */
    readonly tip: Commit;
    /**
     * The name of the remote of the upstream.
     */
    readonly remote?: string;
    /**
     * The name of the branch's upstream without the remote prefix.
     */
    readonly upstreamWithoutRemote?: string;
    /**
     * The name of the branch without the remote prefix. If the branch is a local
     * branch, this is the same as its `name`.
     */
    readonly nameWithoutRemote: string;
}
/**
 * A git commit.
 */
export interface Commit {
    /**
     * The commit SHA.
     */
    readonly sha: string;
    /**
     * The first line of the commit message.
     */
    readonly summary: string;
    /**
     * The commit message without the first line and CR.
     */
    readonly body: string;
    /**
     * Information about the author of this commit. It includes name, email and date.
     */
    readonly author: CommitIdentity;
    /**
     * The SHAs for the parents of the commit.
     */
    readonly parentSHAs: string[];
}
/**
 * A tuple of name, email, and a date for the author or commit info in a commit.
 */
export interface CommitIdentity {
    /**
     * The name for the commit.
     */
    readonly name: string;
    /**
     * The email address for the user who did the commit.
     */
    readonly email: string;
    /**
     * The date of the commit.
     */
    readonly date: Date;
    /**
     * The time-zone offset.
     */
    readonly tzOffset: number;
}
