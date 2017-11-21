import { Git, Repository } from '../common';
import { Resource, ResourceResolver } from "@theia/core";
import URI from "@theia/core/lib/common/uri";
import { GitRepositoryProvider } from './git-repository-provider';
export declare const GIT_RESOURCE_SCHEME = "gitrev";
export declare class GitResource implements Resource {
    readonly uri: URI;
    protected readonly repository: Repository | undefined;
    protected readonly git: Git;
    constructor(uri: URI, repository: Repository | undefined, git: Git);
    readContents(options?: {
        encoding?: string | undefined;
    } | undefined): Promise<string>;
    dispose(): void;
}
export declare class GitResourceResolver implements ResourceResolver {
    protected readonly git: Git;
    protected readonly repositoryProvider: GitRepositoryProvider;
    constructor(git: Git, repositoryProvider: GitRepositoryProvider);
    resolve(uri: URI): Resource | Promise<Resource>;
    getResource(uri: URI): Promise<GitResource>;
    getRepository(uri: URI): Promise<Repository | undefined>;
}
