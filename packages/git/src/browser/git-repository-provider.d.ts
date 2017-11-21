import { Git, Repository } from '../common';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { Event, Emitter } from '@theia/core';
export declare class GitRepositoryProvider {
    protected readonly git: Git;
    protected readonly workspaceService: WorkspaceService;
    protected _selectedRepository: Repository | undefined;
    protected _allRepositories: Repository[];
    protected readonly onDidChangeRepositoryEmitter: Emitter<Repository | undefined>;
    constructor(git: Git, workspaceService: WorkspaceService);
    /**
     * Returns with the previously selected repository, or if no repository has been selected yet,
     * it picks the first available repository from the backend and sets it as the selected one and returns with that.
     * If no repositories are available, returns `undefined`.
     */
    /**
     * Sets or un-sets the repository.
     */
    selectedRepository: Repository | undefined;
    readonly onDidChangeRepository: Event<Repository | undefined>;
    protected fireOnDidChangeRepository(repository: Repository | undefined): void;
    /**
     * Returns with all know repositories.
     */
    readonly allRepositories: Repository[];
    /**
     * Refreshes the state of this Git repository provider.
     *  - Retrieves all known repositories from the backend, discards the current state of [all known repositories](GitRepositoryProvider.allRepositories).
     *  - If no repository was [selected](GitRepositoryProvider.selectedRepository), then selects the first items from all known ones.
     *  - If no repositories are available, leaves the selected one as `undefined`.
     *  - If the previously selected one, does not exist among the most recently discovered one, selects the first one.
     *  - This method blocks, if the workspace root is not yet set.
     */
    refresh(): Promise<void>;
}
