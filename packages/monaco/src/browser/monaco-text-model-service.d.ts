/// <reference types="monaco-editor-core/monaco" />
/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient';
import URI from "@theia/core/lib/common/uri";
import { DisposableCollection, ResourceProvider } from "@theia/core/lib/common";
import { EditorPreferences, EditorPreferenceChange } from '@theia/editor/lib/browser';
import { MonacoEditorModel } from "./monaco-editor-model";
export declare class MonacoTextModelService implements monaco.editor.ITextModelService {
    protected readonly resourceProvider: ResourceProvider;
    protected readonly editorPreferences: EditorPreferences;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected readonly models: Map<string, monaco.Promise<MonacoEditorModel>>;
    protected readonly references: Map<monaco.editor.ITextEditorModel, DisposableCollection>;
    constructor(resourceProvider: ResourceProvider, editorPreferences: EditorPreferences, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter);
    createModelReference(raw: monaco.Uri | URI): monaco.Promise<monaco.editor.IReference<MonacoEditorModel>>;
    protected newReference(model: MonacoEditorModel): monaco.editor.IReference<MonacoEditorModel>;
    protected getOrCreateModel(uri: URI): monaco.Promise<MonacoEditorModel>;
    protected createModel(uri: URI): monaco.Promise<MonacoEditorModel>;
    protected loadModel(uri: URI): Promise<MonacoEditorModel>;
    protected readonly modelOptions: {
        [name: string]: (keyof monaco.editor.ITextModelUpdateOptions | undefined);
    };
    protected updateModel(model: MonacoEditorModel, change: EditorPreferenceChange): void;
    protected getModelOptions(): monaco.editor.ITextModelUpdateOptions;
    registerTextModelContentProvider(scheme: string, provider: monaco.editor.ITextModelContentProvider): monaco.IDisposable;
}
