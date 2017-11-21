import { Event, Emitter, Disposable, DisposableCollection } from "../../common";
export declare const ITree: symbol;
/**
 * The tree - an abstract data type.
 */
export interface ITree extends Disposable {
    /**
     * A root node of this tree.
     * Undefined if there is no root node.
     * Setting a root node refreshes the tree.
     */
    root: ITreeNode | undefined;
    /**
     * Emit when the tree is changed.
     */
    readonly onChanged: Event<void>;
    /**
     * Return a node for the given identifier or undefined if such does not exist.
     */
    getNode(id: string | undefined): ITreeNode | undefined;
    /**
     * Return a valid node in this tree matching to the given; otherwise undefined.
     */
    validateNode(node: ITreeNode | undefined): ITreeNode | undefined;
    /**
     * Refresh children of the root node.
     */
    refresh(): void;
    /**
     * Refresh children of the given node if it is valid.
     */
    refresh(parent: Readonly<ICompositeTreeNode>): void;
    /**
     * Emit when the children of the give node are refreshed.
     */
    readonly onNodeRefreshed: Event<Readonly<ICompositeTreeNode>>;
}
/**
 * The tree node.
 */
export interface ITreeNode {
    /**
     * An unique id of this node.
     */
    readonly id: string;
    /**
     * A human-readable name of this tree node.
     */
    readonly name: string;
    /**
     * Test whether this node is visible.
     * If undefined then visible.
     */
    readonly visible?: boolean;
    /**
     * A parent node of this tree node.
     * Undefined if this node is root.
     */
    readonly parent: Readonly<ICompositeTreeNode> | undefined;
}
export declare namespace ITreeNode {
    function equals(left: ITreeNode | undefined, right: ITreeNode | undefined): boolean;
    function isVisible(node: ITreeNode | undefined): boolean;
    function getPrevSibling(node: ITreeNode | undefined): ITreeNode | undefined;
    function getNextSibling(node: ITreeNode | undefined): ITreeNode | undefined;
}
/**
 * The composite tree node.
 */
export interface ICompositeTreeNode extends ITreeNode {
    /**
     * Child nodes of this tree node.
     */
    children: ReadonlyArray<ITreeNode>;
}
export declare namespace ICompositeTreeNode {
    function is(node: ITreeNode | undefined): node is ICompositeTreeNode;
    function getFirstChild(parent: ICompositeTreeNode): ITreeNode | undefined;
    function getLastChild(parent: ICompositeTreeNode): ITreeNode | undefined;
    function isAncestor(parent: ICompositeTreeNode, child: ITreeNode | undefined): boolean;
    function indexOf(parent: ICompositeTreeNode, node: ITreeNode | undefined): number;
}
/**
 * A default implementation of the tree.
 */
export declare class Tree implements ITree {
    protected _root: ITreeNode | undefined;
    protected readonly onChangedEmitter: Emitter<void>;
    protected readonly onNodeRefreshedEmitter: Emitter<ICompositeTreeNode>;
    protected readonly toDispose: DisposableCollection;
    protected nodes: {
        [id: string]: ITreeNode | undefined;
    };
    constructor();
    dispose(): void;
    root: ITreeNode | undefined;
    readonly onChanged: Event<void>;
    protected fireChanged(): void;
    readonly onNodeRefreshed: Event<ICompositeTreeNode>;
    protected fireNodeRefreshed(parent: ICompositeTreeNode): void;
    getNode(id: string | undefined): ITreeNode | undefined;
    validateNode(node: ITreeNode | undefined): ITreeNode | undefined;
    refresh(raw?: ICompositeTreeNode): void;
    protected resolveChildren(parent: ICompositeTreeNode): Promise<ITreeNode[]>;
    protected setChildren(parent: ICompositeTreeNode, children: ITreeNode[]): void;
    protected removeNode(node: ITreeNode | undefined): void;
    protected addNode(node: ITreeNode | undefined): void;
}
