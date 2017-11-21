import { ContextMenuRenderer, TreeProps } from "@theia/core/lib/browser";
import { FileTreeWidget } from "../file-tree";
import { FileDialogModel } from "./file-dialog-model";
import { FileIconProvider } from '../icons/file-icons';
export declare const FILE_DIALOG_CLASS = "theia-FileDialog";
export declare class FileDialogWidget extends FileTreeWidget {
    readonly props: TreeProps;
    readonly model: FileDialogModel;
    readonly iconProvider: FileIconProvider;
    constructor(props: TreeProps, model: FileDialogModel, contextMenuRenderer: ContextMenuRenderer, iconProvider: FileIconProvider);
}
