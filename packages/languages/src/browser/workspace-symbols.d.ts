import { Languages } from '../common';
import { QuickOpenService, QuickOpenModel, QuickOpenItem, OpenerService } from '@theia/core/lib/browser';
import { SymbolInformation } from 'vscode-base-languageclient/lib/base';
import { CommandRegistry, CommandHandler, SelectionService } from '@theia/core';
import { CommandContribution, KeybindingContribution, KeybindingRegistry } from '@theia/core/lib/common';
export declare class WorkspaceSymbolCommand implements QuickOpenModel, CommandContribution, KeybindingContribution, CommandHandler {
    protected languages: Languages;
    protected readonly openerService: OpenerService;
    protected quickOpenService: QuickOpenService;
    protected selectionService: SelectionService;
    private command;
    constructor(languages: Languages, openerService: OpenerService, quickOpenService: QuickOpenService, selectionService: SelectionService);
    isEnabled(): boolean;
    execute(): void;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    private cancellationSource;
    onType(lookFor: string, acceptor: (items: QuickOpenItem[]) => void): Promise<void>;
    protected createItem(sym: SymbolInformation): QuickOpenItem;
}
