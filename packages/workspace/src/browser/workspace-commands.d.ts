import URI from "@theia/core/lib/common/uri";
import { SelectionService } from '@theia/core/lib/common';
import { Command, CommandContribution, CommandHandler, CommandRegistry } from '@theia/core/lib/common/command';
import { MenuContribution, MenuModelRegistry } from '@theia/core/lib/common/menu';
import { FileSystem, FileStat } from '@theia/filesystem/lib/common/filesystem';
import { OpenerService, OpenHandler, FrontendApplication } from "@theia/core/lib/browser";
import { WorkspaceService } from './workspace-service';
export declare namespace WorkspaceCommands {
    const NEW_FILE: Command;
    const NEW_FOLDER: Command;
    const FILE_OPEN: Command;
    const FILE_OPEN_WITH: (opener: OpenHandler) => Command;
    const FILE_RENAME: Command;
    const FILE_DELETE: Command;
}
export declare class FileMenuContribution implements MenuContribution {
    registerMenus(registry: MenuModelRegistry): void;
}
export declare class WorkspaceCommandContribution implements CommandContribution {
    protected readonly fileSystem: FileSystem;
    protected readonly workspaceService: WorkspaceService;
    protected readonly selectionService: SelectionService;
    protected readonly openerService: OpenerService;
    protected readonly app: FrontendApplication;
    constructor(fileSystem: FileSystem, workspaceService: WorkspaceService, selectionService: SelectionService, openerService: OpenerService, app: FrontendApplication);
    registerCommands(registry: CommandRegistry): void;
    protected newFileHandler(handler: UriCommandHandler): FileSystemCommandHandler;
    protected newWorkspaceHandler(handler: UriCommandHandler): WorkspaceRootAwareCommandHandler;
    /**
     * returns an error message or an empty string if the file name is valid
     * @param name the simple file name to validate
     * @param parent the parent directory's file stat
     */
    protected validateFileName(name: string, parent: FileStat): string;
    protected getDirectory(candidate: URI): Promise<FileStat>;
    protected getParent(candidate: URI): Promise<FileStat>;
    protected findVacantChildUri(parentUri: URI, parent: FileStat, name: string, ext?: string): URI;
}
export interface UriCommandHandler {
    execute(uri: URI, ...args: any[]): any;
    isEnabled?(uri: URI, ...args: any[]): boolean;
    isVisible?(uri: URI, ...args: any[]): boolean;
}
export declare class FileSystemCommandHandler implements CommandHandler {
    protected readonly selectionService: SelectionService;
    protected readonly handler: UriCommandHandler;
    constructor(selectionService: SelectionService, handler: UriCommandHandler);
    protected getUri(...args: any[]): URI | undefined;
    execute(...args: any[]): object | undefined;
    isVisible(...args: any[]): boolean;
    isEnabled(...args: any[]): boolean;
}
export declare class WorkspaceRootAwareCommandHandler extends FileSystemCommandHandler {
    protected readonly workspaceService: WorkspaceService;
    protected readonly selectionService: SelectionService;
    protected readonly handler: UriCommandHandler;
    protected rootUri: URI | undefined;
    constructor(workspaceService: WorkspaceService, selectionService: SelectionService, handler: UriCommandHandler);
    protected getUri(): URI | undefined;
}
