import URI from "@theia/core/lib/common/uri";
import { Emitter, Event, RecursivePartial, SelectionService } from '@theia/core/lib/common';
import { OpenHandler, FrontendApplication } from "@theia/core/lib/browser";
import { EditorWidget } from "./editor-widget";
import { TextEditorProvider, Range, Position } from "./editor";
import { WidgetFactory, WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { Widget } from '@phosphor/widgets';
import { FileIconProvider } from '@theia/filesystem/lib/browser/icons/file-icons';
export declare const EditorManager: symbol;
export interface EditorManager extends OpenHandler {
    /**
     * All opened editors.
     */
    readonly editors: EditorWidget[];
    /**
     * Open an editor for the given uri and input.
     * Reject if the given input is not an editor input or an editor cannot be opened.
     */
    open(uri: URI, input?: EditorInput): Promise<EditorWidget>;
    /**
     * The most recently focused editor.
     */
    readonly currentEditor: EditorWidget | undefined;
    /**
     * Emit when the current editor changed.
     */
    readonly onCurrentEditorChanged: Event<EditorWidget | undefined>;
    /**
     * The currently focused editor.
     */
    readonly activeEditor: EditorWidget | undefined;
    /**
     * Emit when the active editor changed.
     */
    readonly onActiveEditorChanged: Event<EditorWidget | undefined>;
}
export interface EditorInput {
    revealIfVisible?: boolean;
    selection?: RecursivePartial<Range>;
}
export declare class EditorManagerImpl implements EditorManager, WidgetFactory {
    protected readonly editorProvider: TextEditorProvider;
    protected readonly selectionService: SelectionService;
    protected readonly app: FrontendApplication;
    protected readonly widgetManager: WidgetManager;
    protected readonly iconProvider: FileIconProvider;
    readonly id: string;
    readonly label: string;
    protected readonly currentObserver: EditorManagerImpl.Observer;
    protected readonly activeObserver: EditorManagerImpl.Observer;
    constructor(editorProvider: TextEditorProvider, selectionService: SelectionService, app: FrontendApplication, widgetManager: WidgetManager, iconProvider: FileIconProvider);
    readonly editors: EditorWidget[];
    readonly currentEditor: EditorWidget | undefined;
    readonly onCurrentEditorChanged: Event<EditorWidget | undefined>;
    readonly activeEditor: EditorWidget | undefined;
    readonly onActiveEditorChanged: Event<EditorWidget | undefined>;
    canHandle(uri: URI, input?: EditorInput): number;
    open(uri: URI, input?: EditorInput): Promise<EditorWidget>;
    createWidget(uriAsString: string): Promise<Widget>;
    protected createEditor(uri: URI): Promise<EditorWidget>;
    protected revealIfVisible(editor: EditorWidget, input?: EditorInput): void;
    protected revealSelection(widget: EditorWidget, input?: EditorInput): void;
    protected getSelection(selection: RecursivePartial<Range>): Range | Position | undefined;
}
export declare namespace EditorManagerImpl {
    class Observer {
        protected readonly kind: 'current' | 'active';
        protected readonly app: FrontendApplication;
        protected readonly onEditorChangedEmitter: Emitter<EditorWidget | undefined>;
        constructor(kind: 'current' | 'active', app: FrontendApplication);
        getEditor(): EditorWidget | undefined;
        onEditorChanged(): Event<EditorWidget | undefined>;
    }
}
