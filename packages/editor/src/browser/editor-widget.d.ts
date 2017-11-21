import { SelectionService } from '@theia/core/lib/common';
import { Widget, BaseWidget, Message, Saveable, SaveableSource } from '@theia/core/lib/browser';
import { TextEditor } from "./editor";
export declare class EditorWidget extends BaseWidget implements SaveableSource {
    readonly editor: TextEditor;
    protected readonly selectionService: SelectionService;
    constructor(editor: TextEditor, selectionService: SelectionService);
    readonly saveable: Saveable;
    protected onActivateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
    protected onAfterShow(msg: Message): void;
    protected onResize(msg: Widget.ResizeMessage): void;
}
