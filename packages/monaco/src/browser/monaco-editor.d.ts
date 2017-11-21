/// <reference types="monaco-editor-core/monaco" />
/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from "monaco-languageclient";
import { ElementExt } from "@phosphor/domutils";
import URI from "@theia/core/lib/common/uri";
import { DisposableCollection, Disposable, Emitter, Event } from "@theia/core/lib/common";
import { Dimension, EditorManager, EditorWidget, Position, Range, TextEditorDocument, TextEditor } from '@theia/editor/lib/browser';
import { MonacoEditorModel } from "./monaco-editor-model";
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;
import IEditorOverrideServices = monaco.editor.IEditorOverrideServices;
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import IBoxSizing = ElementExt.IBoxSizing;
import IEditorReference = monaco.editor.IEditorReference;
export declare namespace MonacoEditor {
    interface ICommonOptions {
        /**
         * Whether an editor should be auto resized on a content change.
         *
         * #### Fixme
         * remove when https://github.com/Microsoft/monaco-editor/issues/103 is resolved
         */
        autoSizing?: boolean;
        /**
         * A minimal height of an editor.
         *
         * #### Fixme
         * remove when https://github.com/Microsoft/monaco-editor/issues/103 is resolved
         */
        minHeight?: number;
    }
    interface IOptions extends ICommonOptions, IEditorConstructionOptions {
    }
}
export declare function getAll(manager: EditorManager): MonacoEditor[];
export declare function getCurrent(manager: EditorManager): MonacoEditor | undefined;
export declare function getActive(manager: EditorManager): MonacoEditor | undefined;
export declare function get(editorWidget: EditorWidget | undefined): MonacoEditor | undefined;
export declare class MonacoEditor implements TextEditor, IEditorReference {
    readonly uri: URI;
    readonly document: MonacoEditorModel;
    readonly node: HTMLElement;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected readonly toDispose: DisposableCollection;
    protected readonly autoSizing: boolean;
    protected readonly minHeight: number;
    protected editor: IStandaloneCodeEditor;
    protected readonly onCursorPositionChangedEmitter: Emitter<Position>;
    protected readonly onSelectionChangedEmitter: Emitter<Range>;
    protected readonly onFocusChangedEmitter: Emitter<boolean>;
    protected readonly onDocumentContentChangedEmitter: Emitter<TextEditorDocument>;
    constructor(uri: URI, document: MonacoEditorModel, node: HTMLElement, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter, options?: MonacoEditor.IOptions, override?: IEditorOverrideServices);
    protected create(options?: IEditorConstructionOptions, override?: monaco.editor.IEditorOverrideServices): Disposable;
    protected addHandlers(codeEditor: IStandaloneCodeEditor): void;
    protected addOnDidFocusHandler(codeEditor: IStandaloneCodeEditor): void;
    readonly onDispose: Event<void>;
    readonly onDocumentContentChanged: Event<TextEditorDocument>;
    cursor: Position;
    readonly onCursorPositionChanged: Event<Position>;
    selection: Range;
    readonly onSelectionChanged: Event<Range>;
    revealPosition(raw: Position): void;
    revealRange(raw: Range): void;
    focus(): void;
    blur(): void;
    isFocused(): boolean;
    readonly onFocusChanged: Event<boolean>;
    protected increaseZIndex(element: HTMLElement, z: string, toDisposeOnBlur: DisposableCollection): void;
    dispose(): void;
    getControl(): IStandaloneCodeEditor;
    refresh(): void;
    resizeToFit(): void;
    setSize(dimension: Dimension): void;
    protected autoresize(): void;
    protected resize(dimension: Dimension | null): void;
    protected computeLayoutSize(hostNode: HTMLElement, dimension: monaco.editor.IDimension | null): monaco.editor.IDimension;
    protected getWidth(hostNode: HTMLElement, boxSizing: IBoxSizing): number;
    protected getHeight(hostNode: HTMLElement, boxSizing: IBoxSizing): number;
    isActionSupported(id: string): boolean;
    runAction(id: string): monaco.Promise<void>;
    readonly commandService: monaco.commands.ICommandService;
    readonly instantiationService: monaco.instantiation.IInstantiationService;
}
