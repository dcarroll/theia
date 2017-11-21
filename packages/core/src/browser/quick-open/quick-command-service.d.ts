import { Command, CommandRegistry, Keybinding, KeybindingRegistry } from '../../common';
import { QuickOpenModel, QuickOpenItem, QuickOpenMode } from './quick-open-model';
import { QuickOpenService } from "./quick-open-service";
export declare class QuickCommandService implements QuickOpenModel {
    protected readonly commands: CommandRegistry;
    protected readonly keybindings: KeybindingRegistry;
    protected readonly quickOpenService: QuickOpenService;
    private items;
    constructor(commands: CommandRegistry, keybindings: KeybindingRegistry, quickOpenService: QuickOpenService);
    open(): void;
    onType(lookFor: string, acceptor: (items: QuickOpenItem[]) => void): void;
}
export declare class CommandQuickOpenItem extends QuickOpenItem {
    protected readonly command: Command;
    protected readonly commands: CommandRegistry;
    protected readonly keybindings: KeybindingRegistry;
    private activeElement;
    private hidden;
    constructor(command: Command, commands: CommandRegistry, keybindings: KeybindingRegistry);
    getLabel(): string;
    isHidden(): boolean;
    getKeybinding(): Keybinding | undefined;
    run(mode: QuickOpenMode): boolean;
}
