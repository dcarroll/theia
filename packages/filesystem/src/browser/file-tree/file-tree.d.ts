import { ITreeNode, ICompositeTreeNode, ISelectableTreeNode, IExpandableTreeNode, Tree } from "@theia/core/lib/browser";
import { FileSystem, FileStat, UriSelection } from "../../common";
export declare class FileTree extends Tree {
    protected readonly fileSystem: FileSystem;
    constructor(fileSystem: FileSystem);
    resolveChildren(parent: ICompositeTreeNode): Promise<ITreeNode[]>;
    protected resolveFileStat(node: FileStatNode): Promise<FileStat>;
    protected toNodes(fileStat: FileStat, parent: ICompositeTreeNode): ITreeNode[];
    protected toNode(fileStat: FileStat, parent: ICompositeTreeNode): FileNode | DirNode;
}
export interface FileStatNode extends ISelectableTreeNode, UriSelection {
    fileStat: FileStat;
}
export declare namespace FileStatNode {
    function is(node: ITreeNode | undefined): node is FileStatNode;
}
export declare type FileNode = FileStatNode;
export declare namespace FileNode {
    function is(node: ITreeNode | undefined): node is FileNode;
}
export declare type DirNode = FileStatNode & IExpandableTreeNode;
export declare namespace DirNode {
    function is(node: ITreeNode | undefined): node is DirNode;
    function compare(node: ITreeNode, node2: ITreeNode): number;
    function dirCompare(node: ITreeNode, node2: ITreeNode): number;
    function createRoot(fileStat: FileStat): DirNode;
}
