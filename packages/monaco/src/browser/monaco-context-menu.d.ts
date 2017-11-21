/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { ContextMenuRenderer } from "@theia/core/lib/browser";
import IContextMenuService = monaco.editor.IContextMenuService;
import IContextMenuDelegate = monaco.editor.IContextMenuDelegate;
export declare class MonacoContextMenuService implements IContextMenuService {
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    constructor(contextMenuRenderer: ContextMenuRenderer);
    showContextMenu(delegate: IContextMenuDelegate): void;
}
