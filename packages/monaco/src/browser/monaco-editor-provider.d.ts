/// <reference types="monaco-editor-core/monaco" />
/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { DisposableCollection } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { EditorPreferenceChange, EditorPreferences } from '@theia/editor/lib/browser';
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient';
import { MonacoCommandServiceFactory } from './monaco-command-service';
import { MonacoContextMenuService } from './monaco-context-menu';
import { MonacoDiffEditor } from './monaco-diff-editor';
import { MonacoEditor } from './monaco-editor';
import { MonacoEditorModel } from './monaco-editor-model';
import { MonacoEditorService } from './monaco-editor-service';
import { MonacoQuickOpenService } from './monaco-quick-open-service';
import { MonacoTextModelService } from './monaco-text-model-service';
import { MonacoWorkspace } from './monaco-workspace';
import IEditorOverrideServices = monaco.editor.IEditorOverrideServices;
export declare class MonacoEditorProvider {
    protected readonly editorService: MonacoEditorService;
    protected readonly textModelService: MonacoTextModelService;
    protected readonly contextMenuService: MonacoContextMenuService;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected readonly workspace: MonacoWorkspace;
    protected readonly commandServiceFactory: MonacoCommandServiceFactory;
    protected readonly editorPreferences: EditorPreferences;
    protected readonly quickOpenService: MonacoQuickOpenService;
    constructor(editorService: MonacoEditorService, textModelService: MonacoTextModelService, contextMenuService: MonacoContextMenuService, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter, workspace: MonacoWorkspace, commandServiceFactory: MonacoCommandServiceFactory, editorPreferences: EditorPreferences, quickOpenService: MonacoQuickOpenService);
    protected getModel(uri: URI, toDispose: DisposableCollection): Promise<MonacoEditorModel>;
    protected createEditor(create: (n: HTMLDivElement, o: IEditorOverrideServices) => MonacoEditor, toDispose: DisposableCollection): MonacoEditor;
    get(uri: URI): Promise<MonacoEditor>;
    protected getEditorOptions(model: MonacoEditorModel): MonacoEditor.IOptions;
    protected getDiffEditorOptions(original: MonacoEditorModel, modified: MonacoEditorModel): MonacoDiffEditor.IOptions;
    protected readonly editorOptions: {
        [name: string]: (keyof monaco.editor.IEditorOptions | undefined);
    };
    protected updateOptions(change: EditorPreferenceChange, editor: MonacoEditor): void;
    protected installQuickOpenService(editor: MonacoEditor): void;
}
