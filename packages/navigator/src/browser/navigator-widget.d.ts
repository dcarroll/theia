import { Message } from "@phosphor/messaging";
import { CommandService } from '@theia/core/lib/common/command';
import { ContextMenuRenderer, TreeProps, ITreeModel, ITreeNode } from '@theia/core/lib/browser';
import { FileTreeWidget } from "@theia/filesystem/lib/browser";
import { FileNavigatorModel } from "./navigator-model";
import { FileIconProvider } from '@theia/filesystem/lib/browser/icons/file-icons';
import { h } from "@phosphor/virtualdom/lib";
export declare const FILE_STAT_NODE_CLASS = "theia-FileStatNode";
export declare const DIR_NODE_CLASS = "theia-DirNode";
export declare const FILE_STAT_ICON_CLASS = "theia-FileStatIcon";
export declare const FILE_NAVIGATOR_ID = "files";
export declare const LABEL = "Files";
export declare const CLASS = "theia-Files";
export declare class FileNavigatorWidget extends FileTreeWidget {
    readonly props: TreeProps;
    readonly model: FileNavigatorModel;
    protected readonly commandService: CommandService;
    constructor(props: TreeProps, model: FileNavigatorModel, contextMenuRenderer: ContextMenuRenderer, iconProvider: FileIconProvider, commandService: CommandService);
    protected deflateForStorage(node: ITreeNode): object;
    protected inflateFromStorage(node: any, parent?: ITreeNode): ITreeNode;
    protected renderTree(model: ITreeModel): h.Child;
    protected onAfterAttach(msg: Message): void;
    protected handleCopy(event: ClipboardEvent): void;
    protected handlePaste(event: ClipboardEvent): void;
    /**
     * Instead of rendering the file resources form the workspace, we render a placeholder
     * button when the workspace root is not yet set.
     */
    protected renderOpenWorkspaceDiv(): h.Child;
}
