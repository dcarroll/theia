import { ProtocolToMonacoConverter } from "monaco-languageclient/lib";
import { Command, CommandContribution } from '@theia/core';
import { MonacoCommandRegistry, MonacoEditorCommandHandler } from './monaco-command-registry';
export declare type MonacoCommand = Command & {
    delegate?: string;
};
export declare namespace MonacoCommands {
    const UNDO = "undo";
    const REDO = "redo";
    const COMMON_KEYBOARD_ACTIONS: Set<string>;
    const COMMON_ACTIONS: {
        [action: string]: string;
    };
    const SELECTION_SELECT_ALL = "editor.action.select.all";
    const SELECTION_EXPAND_SELECTION = "editor.action.smartSelect.grow";
    const SELECTION_SHRINK_SELECTION = "editor.action.smartSelect.shrink";
    const SELECTION_COPY_LINE_UP = "editor.action.copyLinesUpAction";
    const SELECTION_COPY_LINE_DOWN = "editor.action.copyLinesDownAction";
    const SELECTION_MOVE_LINE_UP = "editor.action.moveLinesUpAction";
    const SELECTION_MOVE_LINE_DOWN = "editor.action.moveLinesDownAction";
    const SELECTION_ADD_CURSOR_ABOVE = "editor.action.insertCursorAbove";
    const SELECTION_ADD_CURSOR_BELOW = "editor.action.insertCursorBelow";
    const SELECTION_ADD_CURSOR_TO_LINE_END = "editor.action.insertCursorAtEndOfEachLineSelected";
    const SELECTION_ADD_NEXT_OCCURRENCE = "editor.action.addSelectionToNextFindMatch";
    const SELECTION_ADD_PREVIOUS_OCCURRENCE = "editor.action.addSelectionToPreviousFindMatch";
    const SELECTION_SELECT_ALL_OCCURRENCES = "editor.action.selectHighlights";
    const ACTIONS: MonacoCommand[];
    const EXCLUDE_ACTIONS: Set<string>;
}
export declare class MonacoEditorCommandHandlers implements CommandContribution {
    protected readonly registry: MonacoCommandRegistry;
    protected readonly p2m: ProtocolToMonacoConverter;
    constructor(registry: MonacoCommandRegistry, p2m: ProtocolToMonacoConverter);
    registerCommands(): void;
    protected registerCommonCommandHandlers(): void;
    protected newCommonActionHandler(action: string): MonacoEditorCommandHandler;
    protected isCommonKeyboardAction(action: string): boolean;
    protected registerEditorCommandHandlers(): void;
    protected newShowReferenceHandler(): MonacoEditorCommandHandler;
    protected registerMonacoActionCommands(): void;
    protected newMonacoActionHandler(action: MonacoCommand): MonacoEditorCommandHandler;
    protected newKeyboardHandler(action: string): MonacoEditorCommandHandler;
    protected newCommandHandler(action: string): MonacoEditorCommandHandler;
    protected newActionHandler(action: string): MonacoEditorCommandHandler;
}
