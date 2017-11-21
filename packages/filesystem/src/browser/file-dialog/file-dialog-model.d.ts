import { Emitter, Event } from "@theia/core/lib/common";
import { ITreeNode } from "@theia/core/lib/browser";
import { FileTreeModel, FileTree, FileTreeServices } from '../file-tree';
export declare class FileDialogModel extends FileTreeModel {
    protected readonly tree: FileTree;
    protected readonly onDidOpenFileEmitter: Emitter<void>;
    constructor(tree: FileTree, services: FileTreeServices);
    readonly onDidOpenFile: Event<void>;
    protected doOpenNode(node: ITreeNode): void;
}
