import { QuickOpenService } from '@theia/core/lib/browser/quick-open/quick-open-service';
import { Git } from '../common';
import { GitRepositoryProvider } from './git-repository-provider';
/**
 * Service delegating into the `Quick Open Service`, so that the Git commands can be further refined.
 * For instance, the `remote` can be specified for `pull`, `push`, and `fetch`. And the branch can be
 * specified for `git merge`.
 */
export declare class GitQuickOpenService {
    protected readonly git: Git;
    protected readonly repositoryProvider: GitRepositoryProvider;
    protected readonly quickOpenService: QuickOpenService;
    constructor(git: Git, repositoryProvider: GitRepositoryProvider, quickOpenService: QuickOpenService);
    fetch(): Promise<void>;
    push(): Promise<void>;
    pull(): Promise<void>;
    merge(): Promise<void>;
    private getOptions(placeholder);
    private getModel(items);
    private getRepository();
    private getRemotes();
    private getBranches();
    private getCurrentBranch();
}
