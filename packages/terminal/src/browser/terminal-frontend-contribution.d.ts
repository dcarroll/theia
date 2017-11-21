import { CommandContribution, KeybindingContribution, KeybindingRegistry, Command, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { FrontendApplication } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
export declare namespace TerminalCommands {
    const NEW: Command;
}
export declare class TerminalFrontendContribution implements CommandContribution, MenuContribution, KeybindingContribution {
    protected readonly app: FrontendApplication;
    protected readonly widgetManager: WidgetManager;
    protected readonly workspaceService: WorkspaceService;
    constructor(app: FrontendApplication, widgetManager: WidgetManager, workspaceService: WorkspaceService);
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    protected newTerminal(): Promise<void>;
}
