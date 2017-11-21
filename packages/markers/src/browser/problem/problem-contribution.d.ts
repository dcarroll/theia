import { MenuModelRegistry, Command, CommandContribution, MenuContribution, KeybindingContribution, KeybindingRegistry, CommandRegistry } from '@theia/core/lib/common';
import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { ProblemManager, ProblemStat } from './problem-manager';
import { StatusBar } from '@theia/core/lib/browser/status-bar/status-bar';
export declare namespace ProblemCommands {
    const OPEN: Command;
}
export declare class ProblemContribution implements CommandContribution, MenuContribution, KeybindingContribution, FrontendApplicationContribution {
    protected readonly widgetFactory: WidgetManager;
    protected readonly app: FrontendApplication;
    protected readonly problemManager: ProblemManager;
    protected readonly statusBar: StatusBar;
    constructor(widgetFactory: WidgetManager, app: FrontendApplication, problemManager: ProblemManager, statusBar: StatusBar);
    onStart(app: FrontendApplication): void;
    initializeLayout(app: FrontendApplication): void;
    setStatusBarElement(problemStat: ProblemStat): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerCommands(commands: CommandRegistry): void;
    protected openProblemsView(): Promise<void>;
    registerMenus(menus: MenuModelRegistry): void;
}
