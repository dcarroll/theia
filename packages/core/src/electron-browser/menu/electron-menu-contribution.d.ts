import { Command, CommandContribution, CommandRegistry, KeybindingContribution, KeybindingRegistry, MenuModelRegistry, MenuContribution } from '../../common';
import { FrontendApplication, FrontendApplicationContribution } from '../../browser';
import { ElectronMainMenuFactory } from './electron-main-menu-factory';
export declare namespace ElectronCommands {
    const TOGGLE_DEVELOPER_TOOLS: Command;
    const RELOAD: Command;
    const ZOOM_IN: Command;
    const ZOOM_OUT: Command;
    const RESET_ZOOM: Command;
}
export declare namespace ElectronMenus {
    const VIEW_WINDOW: string[];
    const VIEW_ZOOM: string[];
}
export declare namespace ElectronMenus {
    const HELP_TOGGLE: string[];
}
export declare class ElectronMenuContribution implements FrontendApplicationContribution, CommandContribution, MenuContribution, KeybindingContribution {
    protected readonly factory: ElectronMainMenuFactory;
    constructor(factory: ElectronMainMenuFactory);
    onStart(app: FrontendApplication): void;
    registerCommands(registry: CommandRegistry): void;
    registerKeybindings(registry: KeybindingRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
}
