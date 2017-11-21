import { Command, CommandHandler, CommandRegistry, SelectionService } from '@theia/core';
import { EditorManager } from '@theia/editor/lib/browser';
import { MonacoEditor } from './monaco-editor';
export interface MonacoEditorCommandHandler {
    execute(editor: MonacoEditor, ...args: any[]): any;
    isEnabled?(editor: MonacoEditor, ...args: any[]): boolean;
}
export declare class MonacoCommandRegistry {
    protected readonly commands: CommandRegistry;
    protected readonly editorManager: EditorManager;
    protected readonly selectionService: SelectionService;
    static MONACO_COMMAND_PREFIX: string;
    constructor(commands: CommandRegistry, editorManager: EditorManager, selectionService: SelectionService);
    protected prefix(command: string): string;
    validate(command: string): string | undefined;
    registerCommand(command: Command, handler: MonacoEditorCommandHandler): void;
    registerHandler(command: string, handler: MonacoEditorCommandHandler): void;
    protected newHandler(monacoHandler: MonacoEditorCommandHandler): CommandHandler;
    protected execute(monacoHandler: MonacoEditorCommandHandler, ...args: any[]): any;
    protected isEnabled(monacoHandler: MonacoEditorCommandHandler, ...args: any[]): boolean;
    protected isVisble(monacoHandler: MonacoEditorCommandHandler, ...args: any[]): boolean;
}
