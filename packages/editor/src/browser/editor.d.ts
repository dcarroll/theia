import { Position, Range } from 'vscode-languageserver-types';
import * as lsp from 'vscode-languageserver-types';
import URI from "@theia/core/lib/common/uri";
import { Event, Disposable } from '@theia/core/lib/common';
import { Saveable } from '@theia/core/lib/browser';
export { Position, Range };
export declare const TextEditorProvider: symbol;
export declare type TextEditorProvider = (uri: URI) => Promise<TextEditor>;
export interface TextEditorDocument extends lsp.TextDocument, Saveable, Disposable {
}
export interface TextEditor extends Disposable, TextEditorSelection {
    readonly node: HTMLElement;
    readonly uri: URI;
    readonly document: TextEditorDocument;
    readonly onDocumentContentChanged: Event<TextEditorDocument>;
    cursor: Position;
    readonly onCursorPositionChanged: Event<Position>;
    selection: Range;
    readonly onSelectionChanged: Event<Range>;
    focus(): void;
    blur(): void;
    isFocused(): boolean;
    readonly onFocusChanged: Event<boolean>;
    revealPosition(position: Position): void;
    revealRange(range: Range): void;
    /**
     * Rerender the editor.
     */
    refresh(): void;
    /**
     * Resize the editor to fit its node.
     */
    resizeToFit(): void;
    setSize(size: Dimension): void;
}
export interface Dimension {
    width: number;
    height: number;
}
export interface TextEditorSelection {
    uri: URI;
    cursor?: Position;
    selection?: Range;
}
export declare namespace TextEditorSelection {
    function is(e: any): e is TextEditorSelection;
}
