import { QuickFileOpenService } from './quick-file-open';
import { Command, CommandRegistry, CommandContribution, KeybindingRegistry, KeybindingContribution } from '@theia/core/lib/common';
export declare const quickFileOpen: Command;
export declare class QuickFileOpenFrontendContribution implements CommandContribution, KeybindingContribution {
    protected readonly quickFileOpenService: QuickFileOpenService;
    constructor(quickFileOpenService: QuickFileOpenService);
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
