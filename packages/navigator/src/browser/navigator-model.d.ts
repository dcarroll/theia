import { OpenerService, ITreeNode } from "@theia/core/lib/browser";
import { FileTreeModel, FileTreeServices } from "@theia/filesystem/lib/browser";
import { FileNavigatorTree } from "./navigator-tree";
export declare class FileNavigatorServices extends FileTreeServices {
    readonly openerService: OpenerService;
}
export declare class FileNavigatorModel extends FileTreeModel {
    protected readonly tree: FileNavigatorTree;
    protected readonly openerService: OpenerService;
    constructor(tree: FileNavigatorTree, services: FileNavigatorServices);
    protected doOpenNode(node: ITreeNode): void;
}
