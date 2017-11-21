import { QuickCommandService } from './quick-command-service';
import { Command, CommandRegistry, CommandContribution, KeybindingRegistry, KeybindingContribution } from '../../common';
export declare const quickCommand: Command;
export declare class QuickCommandFrontendContribution implements CommandContribution, KeybindingContribution {
    protected readonly quickCommandService: QuickCommandService;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
