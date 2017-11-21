import { Git } from '../common/git';
import { GitFileChange, GitFileStatus, Repository, WorkingDirectoryStatus } from '../common/model';
import { GitWatcher } from '../common/git-watcher';
import { GitRepositoryProvider } from './git-repository-provider';
import { MessageService, ResourceProvider, CommandService, DisposableCollection } from '@theia/core';
import { VirtualWidget, ContextMenuRenderer, OpenerService } from '@theia/core/lib/browser';
import { h } from '@phosphor/virtualdom/lib';
import { Message } from '@phosphor/messaging';
import { FileIconProvider } from '@theia/filesystem/lib/browser/icons/file-icons';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
export declare class GitWidget extends VirtualWidget {
    protected readonly git: Git;
    protected readonly repositoryProvider: GitRepositoryProvider;
    protected readonly gitWatcher: GitWatcher;
    protected readonly openerService: OpenerService;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly resourceProvider: ResourceProvider;
    protected readonly messageService: MessageService;
    protected readonly iconProvider: FileIconProvider;
    protected readonly commandService: CommandService;
    protected readonly workspaceService: WorkspaceService;
    protected stagedChanges: GitFileChange[];
    protected unstagedChanges: GitFileChange[];
    protected mergeChanges: GitFileChange[];
    protected message: string;
    protected messageInputHighlighted: boolean;
    protected additionalMessage: string;
    protected status: WorkingDirectoryStatus;
    protected toDispose: DisposableCollection;
    constructor(git: Git, repositoryProvider: GitRepositoryProvider, gitWatcher: GitWatcher, openerService: OpenerService, contextMenuRenderer: ContextMenuRenderer, resourceProvider: ResourceProvider, messageService: MessageService, iconProvider: FileIconProvider, commandService: CommandService, workspaceService: WorkspaceService);
    initialize(repository: Repository | undefined): Promise<void>;
    protected updateView(status: WorkingDirectoryStatus | undefined): void;
    protected render(): h.Child;
    /**
     * After rendering the DOM elements, it makes sure that the selection (`selectionIndex`) is correct in the repositories
     * drop-down even if one adds/removes local Git clones to/from the workspace.
     *
     * By default the `selectionIndex` is `0`, so we need to set it based on the user's repository selection.
     */
    protected onUpdateRequest(message: Message): void;
    protected renderRepositoryList(): h.Child;
    protected renderCommandBar(repository: Repository | undefined): h.Child;
    protected renderMessageInput(): h.Child;
    protected renderMessageTextarea(): h.Child;
    protected renderGitItemButtons(repository: Repository, change: GitFileChange): h.Child;
    protected getStatusChar(status: GitFileStatus, staged: boolean): string;
    protected getRepositoryRelativePath(repository: Repository, absPath: string): string;
    protected renderGitItem(repository: Repository | undefined, change: GitFileChange): h.Child;
    protected renderChangesHeader(title: string): h.Child;
    protected renderMergeChanges(repository: Repository | undefined): h.Child | undefined;
    protected renderStagedChanges(repository: Repository | undefined): h.Child | undefined;
    protected renderUnstagedChanges(repository: Repository | undefined): h.Child | undefined;
}
