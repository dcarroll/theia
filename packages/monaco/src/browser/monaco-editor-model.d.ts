/// <reference types="monaco-editor-core/monaco" />
/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { TextDocumentSaveReason, Position } from "vscode-languageserver-types";
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from "monaco-languageclient";
import { TextEditorDocument } from "@theia/editor/lib/browser";
import { DisposableCollection, Emitter, Event, Resource } from '@theia/core/lib/common';
import ITextEditorModel = monaco.editor.ITextEditorModel;
export { TextDocumentSaveReason };
export interface WillSaveModelEvent {
    readonly model: monaco.editor.IModel;
    readonly reason: TextDocumentSaveReason;
    waitUntil(thenable: Thenable<monaco.editor.IIdentifiedSingleEditOperation[]>): void;
}
export declare class MonacoEditorModel implements ITextEditorModel, TextEditorDocument {
    protected readonly resource: Resource;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    autoSave: 'on' | 'off';
    autoSaveDelay: number;
    protected model: monaco.editor.IModel;
    protected readonly resolveModel: Promise<void>;
    protected readonly toDispose: DisposableCollection;
    protected readonly toDisposeOnAutoSave: DisposableCollection;
    protected readonly onDidSaveModelEmitter: Emitter<monaco.editor.IModel>;
    protected readonly onWillSaveModelEmitter: Emitter<WillSaveModelEvent>;
    constructor(resource: Resource, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter);
    dispose(): void;
    /**
     * #### Important
     * Only this method can create an instance of `monaco.editor.IModel`,
     * there should not be other calls to `monaco.editor.createModel`.
     */
    protected initialize(content: string): void;
    protected _dirty: boolean;
    readonly dirty: boolean;
    protected setDirty(dirty: boolean): void;
    protected readonly onDirtyChangedEmitter: Emitter<void>;
    readonly onDirtyChanged: Event<void>;
    readonly uri: string;
    readonly languageId: string;
    readonly version: number;
    getText(): string;
    positionAt(offset: number): Position;
    offsetAt(position: Position): number;
    readonly lineCount: number;
    readonly readOnly: boolean;
    readonly onDispose: monaco.IEvent<void>;
    readonly textEditorModel: monaco.editor.IModel;
    readonly onWillSaveModel: Event<WillSaveModelEvent>;
    readonly onDidSaveModel: Event<monaco.editor.IModel>;
    load(): monaco.Promise<MonacoEditorModel>;
    save(): Promise<void>;
    protected synchronizing: boolean;
    sync(): Promise<void>;
    protected markAsDirty(): void;
    protected doAutoSave(): void;
    protected doSave(reason: TextDocumentSaveReason): Promise<void>;
    protected fireWillSaveModel(reason: TextDocumentSaveReason): Promise<void>;
    protected fireDidSaveModel(): void;
}
