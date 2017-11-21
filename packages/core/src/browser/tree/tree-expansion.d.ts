import { Emitter, Event, Disposable } from "../../common";
import { ICompositeTreeNode, ITreeNode, ITree } from "./tree";
export declare const ITreeExpansionService: symbol;
/**
 * The tree expandable service.
 */
export interface ITreeExpansionService extends Disposable {
    /**
     * Emit when the node is expanded or collapsed.
     */
    readonly onExpansionChanged: Event<Readonly<IExpandableTreeNode>>;
    /**
     * If the given node is valid and collapsed then expand it.
     * Expanding a node refreshes all its children.
     *
     * Return true if a node has been expanded; otherwise false.
     */
    expandNode(node: Readonly<IExpandableTreeNode>): boolean;
    /**
     * If the given node is valid and expanded then collapse it.
     *
     * Return true if a node has been collapsed; otherwise false.
     */
    collapseNode(node: Readonly<IExpandableTreeNode>): boolean;
    /**
     * If the given node is invalid then does nothing.
     * If the given node is collapsed then expand it; otherwise collapse it.
     */
    toggleNodeExpansion(node: Readonly<IExpandableTreeNode>): void;
}
/**
 * The expandable tree node.
 */
export interface IExpandableTreeNode extends ICompositeTreeNode {
    /**
     * Test whether this tree node is expanded.
     */
    expanded: boolean;
}
export declare namespace IExpandableTreeNode {
    function is(node: ITreeNode | undefined): node is IExpandableTreeNode;
    function isExpanded(node: ITreeNode | undefined): node is IExpandableTreeNode;
    function isCollapsed(node: ITreeNode | undefined): node is IExpandableTreeNode;
}
export declare class TreeExpansionService implements ITreeExpansionService {
    protected readonly tree: ITree;
    protected readonly onExpansionChangedEmitter: Emitter<IExpandableTreeNode>;
    constructor(tree: ITree);
    dispose(): void;
    readonly onExpansionChanged: Event<IExpandableTreeNode>;
    protected fireExpansionChanged(node: IExpandableTreeNode): void;
    expandNode(raw: IExpandableTreeNode): boolean;
    protected doExpandNode(node: IExpandableTreeNode): boolean;
    collapseNode(raw: IExpandableTreeNode): boolean;
    protected doCollapseNode(node: IExpandableTreeNode): boolean;
    toggleNodeExpansion(node: IExpandableTreeNode): void;
}
