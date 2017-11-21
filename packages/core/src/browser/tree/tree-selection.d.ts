import { Event, Emitter, Disposable, SelectionProvider } from "../../common";
import { ITree, ITreeNode } from "./tree";
export declare const ITreeSelectionService: symbol;
/**
 * The tree selection service.
 */
export interface ITreeSelectionService extends Disposable, SelectionProvider<Readonly<ISelectableTreeNode> | undefined> {
    /**
     * The node selected in the tree. If defined then valid.
     * Undefined if there is no node selection.
     */
    readonly selectedNode: Readonly<ISelectableTreeNode> | undefined;
    /**
     * Emit when the node selection is changed.
     */
    readonly onSelectionChanged: Event<Readonly<ISelectableTreeNode> | undefined>;
    /**
     * Select a given node.
     * If a given node is undefined or invalid then remove the node selection.
     */
    selectNode(node: Readonly<ISelectableTreeNode> | undefined): void;
}
/**
 * The selectable tree node.
 */
export interface ISelectableTreeNode extends ITreeNode {
    /**
     * Test whether this node is selected.
     */
    selected: boolean;
}
export declare namespace ISelectableTreeNode {
    function is(node: ITreeNode | undefined): node is ISelectableTreeNode;
    function isSelected(node: ITreeNode | undefined): node is ISelectableTreeNode;
    function isVisible(node: ITreeNode | undefined): node is ISelectableTreeNode;
    function getVisibleParent(node: ITreeNode | undefined): ISelectableTreeNode | undefined;
}
export declare class TreeSelectionService implements ITreeSelectionService {
    protected readonly tree: ITree;
    protected _selectedNode: ISelectableTreeNode | undefined;
    protected readonly onSelectionChangedEmitter: Emitter<ISelectableTreeNode | undefined>;
    constructor(tree: ITree);
    dispose(): void;
    readonly selectedNode: ISelectableTreeNode | undefined;
    readonly onSelectionChanged: Event<ISelectableTreeNode | undefined>;
    protected fireSelectionChanged(): void;
    selectNode(raw: ISelectableTreeNode | undefined): void;
    protected doSelectNode(node: ISelectableTreeNode | undefined): void;
}
