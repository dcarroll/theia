import { ITreeNode, ICompositeTreeNode } from "./tree";
export interface ITreeNodeIterator extends Iterator<ITreeNode | undefined> {
}
export declare namespace ITreeNodeIterator {
    interface IOptions {
        readonly pruneCollapsed: boolean;
    }
    const DEFAULT_OPTIONS: IOptions;
}
export declare abstract class AbstractTreeNodeIterator implements ITreeNodeIterator {
    protected node: ITreeNode | undefined;
    protected readonly options: ITreeNodeIterator.IOptions;
    constructor(node: ITreeNode | undefined, options?: ITreeNodeIterator.IOptions);
    next(): IteratorResult<ITreeNode | undefined>;
    protected abstract doNext(node: ITreeNode): ITreeNode | undefined;
    protected hasChildren(node: ITreeNode | undefined): node is ICompositeTreeNode;
}
export declare class TreeNodeIterator extends AbstractTreeNodeIterator {
    protected doNext(node: ITreeNode): ITreeNode | undefined;
    protected findFirstChild(node: ITreeNode | undefined): ITreeNode | undefined;
    protected findNextSibling(node: ITreeNode | undefined): ITreeNode | undefined;
}
export declare class BackwardTreeNodeIterator extends AbstractTreeNodeIterator {
    protected doNext(node: ITreeNode): ITreeNode | undefined;
    protected findLastChild(node: ITreeNode | undefined): ITreeNode | undefined;
}
