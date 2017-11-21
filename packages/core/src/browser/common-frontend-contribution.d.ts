import { MenuContribution, MenuModelRegistry } from '../common/menu';
import { KeybindingContribution, KeybindingRegistry } from '../common/keybinding';
import { CommandContribution, CommandRegistry, Command } from '../common/command';
import { MessageService } from '../common/message-service';
import { ApplicationShell } from './shell';
export declare namespace CommonMenus {
    const FILE: string[];
    const FILE_NEW: string[];
    const FILE_OPEN: string[];
    const FILE_SAVE: string[];
    const EDIT: string[];
    const EDIT_UNDO: string[];
    const EDIT_CLIPBOARD: string[];
    const EDIT_FIND: string[];
    const VIEW: string[];
    const HELP: string[];
}
export declare namespace CommonCommands {
    const CUT: Command;
    const COPY: Command;
    const PASTE: Command;
    const UNDO: Command;
    const REDO: Command;
    const FIND: Command;
    const REPLACE: Command;
    const NEXT_TAB: Command;
    const PREVIOUS_TAB: Command;
    const CLOSE_TAB: Command;
    const CLOSE_OTHER_TABS: Command;
    const CLOSE_RIGHT_TABS: Command;
    const CLOSE_ALL_TABS: Command;
    const SAVE: Command;
    const SAVE_ALL: Command;
}
export declare const supportCut: boolean;
export declare const supportCopy: boolean;
export declare const supportPaste: boolean;
export declare class CommonFrontendContribution implements MenuContribution, CommandContribution, KeybindingContribution {
    protected readonly shell: ApplicationShell;
    protected readonly messageService: MessageService;
    constructor(shell: ApplicationShell, messageService: MessageService);
    registerMenus(registry: MenuModelRegistry): void;
    registerCommands(commandRegistry: CommandRegistry): void;
    registerKeybindings(registry: KeybindingRegistry): void;
}
