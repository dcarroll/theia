import { Git } from '../common/git';
import { Repository, WorkingDirectoryStatus, Branch } from '../common/model';
/**
 * `dugite-extra` based Git implementation.
 */
export declare class DugiteGit implements Git {
    clone(remoteUrl: string, options: Git.Options.Clone): Promise<Repository>;
    repositories(workspaceRootUri: string): Promise<Repository[]>;
    status(repository: Repository): Promise<WorkingDirectoryStatus>;
    add(repository: Repository, uri: string | string[]): Promise<void>;
    unstage(repository: Repository, uri: string | string[]): Promise<void>;
    branch(repository: Repository, options: {
        type: 'current';
    }): Promise<Branch | undefined>;
    branch(repository: Repository, options: {
        type: 'local' | 'remote' | 'all';
    }): Promise<Branch[]>;
    branch(repository: Repository, options: Git.Options.Branch.Create | Git.Options.Branch.Rename | Git.Options.Branch.Delete): Promise<void>;
    checkout(repository: Repository, options: Git.Options.Checkout.Branch | Git.Options.Checkout.WorkingTreeFile): Promise<void>;
    commit(repository: Repository, message?: string): Promise<void>;
    fetch(repository: Repository, options?: Git.Options.Fetch): Promise<void>;
    push(repository: Repository, options?: Git.Options.Push): Promise<void>;
    pull(repository: Repository, options?: Git.Options.Pull): Promise<void>;
    reset(repository: Repository, options: Git.Options.Reset): Promise<void>;
    merge(repository: Repository, options: Git.Options.Merge): Promise<void>;
    show(repository: Repository, uri: string, options?: Git.Options.Show): Promise<string>;
    remote(repository: Repository): Promise<string[]>;
    private getCommitish(options?);
    private getContainerRepository(repositoryPath);
    private getRemotes(repositoryPath);
    private getDefaultRemote(repositoryPath, remote?);
    private getCurrentBranch(repositoryPath, localBranch?);
    private getResetMode(mode);
    private mapBranch(toMap);
    private mapTip(toMap);
    private mapCommitIdentity(toMap);
    private mapStatus(toMap, repository);
    private mapAheadBehind(toMap);
    private mapFileChanges(toMap, repositoryPath);
    private mapFileChange(toMap, repositoryPath);
    private mapFileStatus(toMap);
    private getFsPath(repository);
    private getUri(path);
    private fail<T>(repository, message?);
}
