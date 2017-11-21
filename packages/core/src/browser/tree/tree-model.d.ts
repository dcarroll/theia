import { DisposableCollection, Event, Emitter, SelectionProvider } from "../../common";
import { ITree, ITreeNode, ICompositeTreeNode } from "./tree";
import { ITreeSelectionService, ISelectableTreeNode } from "./tree-selection";
import { ITreeExpansionService, IExpandableTreeNode } from "./tree-expansion";
import { TreeNavigationService } from "./tree-navigation";
import { ITreeNodeIterator } from "./tree-iterator";
export declare const ITreeModel: symbol;
/**
 * The tree model.
 */
export interface ITreeModel extends ITree, ITreeSelectionService, ITreeExpansionService {
    /**
     * Expand a node taking into the account node selection if a given node is undefined.
     */
    expandNode(node?: Readonly<IExpandableTreeNode>): boolean;
    /**
     * Collapse a node taking into the account node selection if a given node is undefined.
     */
    collapseNode(node?: Readonly<IExpandableTreeNode>): boolean;
    /**
     * Toggle node expansion taking into the account node selection if a given node is undefined.
     */
    toggleNodeExpansion(node?: Readonly<IExpandableTreeNode>): void;
    /**
     * Select prev node relatively to the selected taking into account node expansion.
     */
    selectPrevNode(): void;
    /**
     * Select next node relatively to the selected taking into account node expansion.
     */
    selectNextNode(): void;
    /**
     * Open a given node or a selected if the given is undefined.
     */
    openNode(node?: ITreeNode | undefined): void;
    /**
     * Event for when a node should be opened.
     */
    readonly onOpenNode: Event<ITreeNode>;
    /**
     * Select a parent node relatively to the selected taking into account node expansion.
     */
    selectParent(): void;
    /**
     * Navigate to the given node if it is defined.
     * Navigation sets a node as a root node and expand it.
     */
    navigateTo(node: ITreeNode | undefined): void;
    /**
     * Test whether it is possible to navigate forward.
     */
    canNavigateForward(): boolean;
    /**
     * Test whether it is possible to navigate backward.
     */
    canNavigateBackward(): boolean;
    /**
     * Navigate forward.
     */
    navigateForward(): void;
    /**
     * Navigate backward.
     */
    navigateBackward(): void;
}
export declare class TreeServices {
    readonly selection: ITreeSelectionService;
    readonly expansion: ITreeExpansionService;
    readonly navigation: TreeNavigationService;
}
export declare class TreeModel implements ITreeModel, SelectionProvider<Readonly<ISelectableTreeNode>> {
    protected readonly tree: ITree;
    protected readonly onChangedEmitter: Emitter<void>;
    protected readonly onOpenNodeEmitter: Emitter<ITreeNode>;
    protected readonly toDispose: DisposableCollection;
    protected readonly selection: ITreeSelectionService;
    protected readonly expansion: ITreeExpansionService;
    protected readonly navigation: TreeNavigationService;
    constructor(tree: ITree, services: TreeServices);
    dispose(): void;
    root: ITreeNode | undefined;
    readonly onChanged: Event<void>;
    readonly onOpenNode: Event<ITreeNode>;
    protected fireChanged(): void;
    readonly onNodeRefreshed: Event<Readonly<ICompositeTreeNode>>;
    getNode(id: string | undefined): ITreeNode | undefined;
    validateNode(node: ITreeNode | undefined): ITreeNode | undefined;
    refresh(parent?: Readonly<ICompositeTreeNode>): void;
    readonly selectedNode: Readonly<ISelectableTreeNode> | undefined;
    readonly onSelectionChanged: Event<Readonly<ISelectableTreeNode> | undefined>;
    selectNode(node: ISelectableTreeNode | undefined): void;
    readonly onExpansionChanged: Event<Readonly<IExpandableTreeNode>>;
    expandNode(raw?: Readonly<IExpandableTreeNode>): boolean;
    collapseNode(raw?: Readonly<IExpandableTreeNode>): boolean;
    toggleNodeExpansion(raw?: Readonly<IExpandableTreeNode>): void;
    selectPrevNode(): void;
    selectNextNode(): void;
    protected selectNextVisibleNode(iterator: ITreeNodeIterator): void;
    protected createBackwardIterator(node: ITreeNode | undefined): ITreeNodeIterator;
    protected createIterator(node: ITreeNode | undefined): ITreeNodeIterator;
    openNode(raw?: ITreeNode | undefined): void;
    protected doOpenNode(node: ITreeNode): void;
    selectParent(): void;
    navigateTo(node: ITreeNode | undefined): void;
    canNavigateForward(): boolean;
    canNavigateBackward(): boolean;
    navigateForward(): void;
    navigateBackward(): void;
    protected doNavigate(node: ITreeNode): void;
}
