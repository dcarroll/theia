/// <reference types="monaco-editor-core/monaco" />
/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient';
import { Disposable } from '@theia/core/lib/common';
import { Dimension } from '@theia/editor/lib/browser';
import { MonacoEditorModel } from './monaco-editor-model';
import { MonacoEditor } from './monaco-editor';
import IStandaloneDiffEditor = monaco.editor.IStandaloneDiffEditor;
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import IDiffEditorConstructionOptions = monaco.editor.IDiffEditorConstructionOptions;
import IEditorOverrideServices = monaco.editor.IEditorOverrideServices;
export declare namespace MonacoDiffEditor {
    interface IOptions extends MonacoEditor.ICommonOptions, IDiffEditorConstructionOptions {
    }
}
export declare class MonacoDiffEditor extends MonacoEditor {
    readonly node: HTMLElement;
    readonly originalModel: MonacoEditorModel;
    readonly modifiedModel: MonacoEditorModel;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected diffEditor: IStandaloneDiffEditor;
    constructor(node: HTMLElement, originalModel: MonacoEditorModel, modifiedModel: MonacoEditorModel, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter, options?: MonacoDiffEditor.IOptions, override?: IEditorOverrideServices);
    protected create(options?: IDiffEditorConstructionOptions, override?: monaco.editor.IEditorOverrideServices): Disposable;
    protected addOnDidFocusHandler(codeEditor: IStandaloneCodeEditor): void;
    protected resize(dimension: Dimension | null): void;
    isActionSupported(id: string): boolean;
}
