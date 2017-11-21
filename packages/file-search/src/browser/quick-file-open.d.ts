import { QuickOpenModel, QuickOpenItem, QuickOpenMode, QuickOpenService, OpenerService } from '@theia/core/lib/browser';
import { FileSystem } from '@theia/filesystem/lib/common/filesystem';
import { FileIconProvider } from '@theia/filesystem/lib/browser/icons/file-icons';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import URI from '@theia/core/lib/common/uri';
import { FileSearchService } from '../common/file-search-service';
export declare class QuickFileOpenService implements QuickOpenModel {
    protected readonly fileSystem: FileSystem;
    protected readonly workspaceService: WorkspaceService;
    protected readonly fileIconProvider: FileIconProvider;
    protected readonly openerService: OpenerService;
    protected readonly quickOpenService: QuickOpenService;
    protected readonly fileSearchService: FileSearchService;
    constructor(fileSystem: FileSystem, workspaceService: WorkspaceService, fileIconProvider: FileIconProvider, openerService: OpenerService, quickOpenService: QuickOpenService, fileSearchService: FileSearchService);
    private wsRoot;
    isEnabled(): boolean;
    open(): void;
    private cancelIndicator;
    onType(lookFor: string, acceptor: (items: QuickOpenItem[]) => void): Promise<void>;
    private toItem(uriString);
}
export declare class FileQuickOpenItem extends QuickOpenItem {
    protected readonly uri: URI;
    protected readonly icon: string;
    protected readonly parent: string;
    protected readonly openerService: OpenerService;
    constructor(uri: URI, icon: string, parent: string, openerService: OpenerService);
    getLabel(): string;
    isHidden(): boolean;
    getTooltip(): string;
    getDescription(): string;
    getUri(): URI;
    getIconClass(): string;
    run(mode: QuickOpenMode): boolean;
}
