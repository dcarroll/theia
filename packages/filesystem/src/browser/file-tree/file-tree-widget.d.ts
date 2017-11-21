import { h } from "@phosphor/virtualdom";
import { ContextMenuRenderer, TreeWidget, NodeProps, TreeProps, ITreeNode } from "@theia/core/lib/browser";
import { FileStatNode } from "./file-tree";
import { FileTreeModel } from "./file-tree-model";
import { FileIconProvider } from '../icons/file-icons';
export declare const FILE_TREE_CLASS = "theia-FileTree";
export declare const FILE_STAT_NODE_CLASS = "theia-FileStatNode";
export declare const DIR_NODE_CLASS = "theia-DirNode";
export declare const FILE_STAT_ICON_CLASS = "theia-FileStatIcon";
export declare class FileTreeWidget extends TreeWidget {
    readonly props: TreeProps;
    readonly model: FileTreeModel;
    protected iconProvider: FileIconProvider;
    constructor(props: TreeProps, model: FileTreeModel, contextMenuRenderer: ContextMenuRenderer, iconProvider: FileIconProvider);
    protected createNodeClassNames(node: ITreeNode, props: NodeProps): string[];
    protected decorateCaption(node: ITreeNode, caption: h.Child, props: NodeProps): h.Child;
    protected decorateFileStatCaption(node: FileStatNode, caption: h.Child, props: NodeProps): h.Child;
}
