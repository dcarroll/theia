import { SelectionService } from '@theia/core/lib/common';
import { CommandContribution, CommandRegistry, Command } from '@theia/core/lib/common';
import { OpenerService } from '@theia/core/lib/browser';
import { CppClientContribution } from "./cpp-client-contribution";
import { EditorManager } from "@theia/editor/lib/browser";
/**
 * Switch between source/header file
 */
export declare const SWITCH_SOURCE_HEADER: Command;
export declare const FILE_OPEN_PATH: (path: string) => Command;
export declare class CppCommandContribution implements CommandContribution {
    protected readonly clientContribution: CppClientContribution;
    protected readonly openerService: OpenerService;
    private editorService;
    protected readonly selectionService: SelectionService;
    constructor(clientContribution: CppClientContribution, openerService: OpenerService, editorService: EditorManager, selectionService: SelectionService);
    registerCommands(commands: CommandRegistry): void;
    protected switchSourceHeader(): void;
}
