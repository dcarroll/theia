/// <reference types="monaco-editor-core/monaco" />
import { MonacoWorkspace as BaseMonacoWorkspace, ProtocolToMonacoConverter, MonacoToProtocolConverter } from "monaco-languageclient";
import { FileSystem, FileSystemWatcher } from '@theia/filesystem/lib/common';
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { EditorManager } from "@theia/editor/lib/browser";
import * as lang from "@theia/languages/lib/common";
import { Emitter, Event, TextDocument, TextDocumentWillSaveEvent } from "@theia/languages/lib/common";
import { MonacoTextModelService } from "./monaco-text-model-service";
import { WillSaveModelEvent } from "./monaco-editor-model";
export declare class MonacoWorkspace extends BaseMonacoWorkspace implements lang.Workspace {
    protected readonly fileSystem: FileSystem;
    protected readonly workspaceService: WorkspaceService;
    protected readonly fileSystemWatcher: FileSystemWatcher;
    protected readonly textModelService: MonacoTextModelService;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected readonly editorManager: EditorManager;
    readonly capabilities: {
        applyEdit: boolean;
        workspaceEdit: {
            documentChanges: boolean;
        };
    };
    readonly synchronization: {
        didSave: boolean;
        willSave: boolean;
        willSaveWaitUntil: boolean;
    };
    protected resolveReady: () => void;
    readonly ready: Promise<void>;
    protected readonly onWillSaveTextDocumentEmitter: Emitter<TextDocumentWillSaveEvent>;
    protected readonly onDidSaveTextDocumentEmitter: Emitter<TextDocument>;
    constructor(fileSystem: FileSystem, workspaceService: WorkspaceService, fileSystemWatcher: FileSystemWatcher, textModelService: MonacoTextModelService, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter, editorManager: EditorManager);
    readonly rootPath: string | null;
    getTextDocument(uri: string): TextDocument | undefined;
    readonly onWillSaveTextDocument: Event<TextDocumentWillSaveEvent>;
    protected onWillSaveModel(event: WillSaveModelEvent): void;
    readonly onDidSaveTextDocument: Event<TextDocument>;
    protected onDidSaveModel(model: monaco.editor.IModel): void;
    createFileSystemWatcher(globPattern: string, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean): lang.FileSystemWatcher;
    applyEdit(changes: lang.WorkspaceEdit): Promise<boolean>;
}
