/// <reference types="@theia/monaco/src/typings/monaco/index" />
/// <reference types="monaco-editor-core/monaco" />
import { MonacoToProtocolConverter } from "monaco-languageclient";
import { OpenerService } from '@theia/core/lib/browser';
import { EditorInput } from '@theia/editor/lib/browser';
import IEditorService = monaco.editor.IEditorService;
import IResourceInput = monaco.editor.IResourceInput;
import IEditorReference = monaco.editor.IEditorReference;
export declare class MonacoEditorService implements IEditorService {
    protected readonly openerService: OpenerService;
    protected readonly m2p: MonacoToProtocolConverter;
    constructor(openerService: OpenerService, m2p: MonacoToProtocolConverter);
    openEditor(input: IResourceInput, sideBySide?: boolean | undefined): monaco.Promise<IEditorReference | undefined>;
    protected createEditorInput(input: IResourceInput, sideBySide?: boolean | undefined): EditorInput;
}
