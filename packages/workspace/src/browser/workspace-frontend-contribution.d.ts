import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { OpenerService, StorageService } from '@theia/core/lib/browser';
import { FileDialogFactory, FileStatNode } from '@theia/filesystem/lib/browser';
import { FileSystem } from '@theia/filesystem/lib/common';
import { WorkspaceService } from './workspace-service';
export declare namespace WorkspaceCommands {
    const OPEN: Command;
}
export declare class WorkspaceFrontendContribution implements CommandContribution, MenuContribution {
    protected readonly fileSystem: FileSystem;
    protected readonly fileDialogFactory: FileDialogFactory;
    protected readonly openerService: OpenerService;
    protected readonly workspaceService: WorkspaceService;
    protected readonly workspaceStorage: StorageService;
    constructor(fileSystem: FileSystem, fileDialogFactory: FileDialogFactory, openerService: OpenerService, workspaceService: WorkspaceService, workspaceStorage: StorageService);
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    protected showFileDialog(): void;
    protected openFile(node: Readonly<FileStatNode> | undefined): void;
}
