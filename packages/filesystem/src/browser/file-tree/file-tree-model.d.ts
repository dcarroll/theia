import URI from '@theia/core/lib/common/uri';
import { ICompositeTreeNode, TreeModel, TreeServices } from "@theia/core/lib/browser";
import { FileSystem, FileSystemWatcher, FileChange } from "../../common";
import { FileStatNode, FileTree } from "./file-tree";
import { LocationService } from '../location';
export declare class FileTreeServices extends TreeServices {
    readonly fileSystem: FileSystem;
    readonly watcher: FileSystemWatcher;
}
export declare class FileTreeModel extends TreeModel implements LocationService {
    protected readonly tree: FileTree;
    protected readonly fileSystem: FileSystem;
    protected readonly watcher: FileSystemWatcher;
    constructor(tree: FileTree, services: FileTreeServices);
    location: URI | undefined;
    readonly selectedFileStatNode: Readonly<FileStatNode> | undefined;
    protected onFilesChanged(changes: FileChange[]): void;
    protected isRootAffected(changes: FileChange[]): boolean;
    protected getAffectedNodes(changes: FileChange[]): ICompositeTreeNode[];
    copy(uri: URI): boolean;
}
