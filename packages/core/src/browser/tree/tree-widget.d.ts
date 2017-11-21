import { Message } from "@phosphor/messaging";
import { h, ElementAttrs, ElementInlineStyle } from "@phosphor/virtualdom";
import { MenuPath } from "../../common";
import { ContextMenuRenderer } from "../context-menu-renderer";
import { StatefulWidget } from '../shell-layout-restorer';
import { VirtualWidget } from "../widgets";
import { ITreeNode, ICompositeTreeNode } from "./tree";
import { ITreeModel } from "./tree-model";
import { IExpandableTreeNode } from "./tree-expansion";
export declare const TREE_CLASS = "theia-Tree";
export declare const TREE_NODE_CLASS = "theia-TreeNode";
export declare const EXPANDABLE_TREE_NODE_CLASS = "theia-ExpandableTreeNode";
export declare const COMPOSITE_TREE_NODE_CLASS = "theia-CompositeTreeNode";
export declare const TREE_NODE_CAPTION_CLASS = "theia-TreeNodeCaption";
export declare const EXPANSION_TOGGLE_CLASS = "theia-ExpansionToggle";
export interface Size {
    readonly width: number;
    readonly height: number;
}
export declare const TreeProps: symbol;
export interface TreeProps {
    readonly contextMenuPath?: MenuPath;
    readonly expansionToggleSize: Size;
}
export interface NodeProps {
    /**
     * An indentation size relatively to the root node.
     */
    readonly indentSize: number;
    /**
     * Test whether the node should be rendered as hidden.
     *
     * It is different from visibility of a node: an invisible node is not rendered at all.
     */
    readonly visible: boolean;
}
export declare const defaultTreeProps: TreeProps;
export declare class TreeWidget extends VirtualWidget implements StatefulWidget {
    readonly props: TreeProps;
    readonly model: ITreeModel;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    constructor(props: TreeProps, model: ITreeModel, contextMenuRenderer: ContextMenuRenderer);
    onActivateRequest(msg: Message): void;
    protected onUpdateRequest(msg: Message): void;
    protected render(): h.Child;
    protected renderTree(model: ITreeModel): h.Child;
    protected createRootProps(node: ITreeNode): NodeProps;
    protected renderNodes(node: ITreeNode, props: NodeProps): h.Child;
    protected renderNode(node: ITreeNode, props: NodeProps): h.Child;
    protected createNodeAttributes(node: ITreeNode, props: NodeProps): ElementAttrs;
    protected createNodeClassNames(node: ITreeNode, props: NodeProps): string[];
    protected createNodeStyle(node: ITreeNode, props: NodeProps): ElementInlineStyle | undefined;
    protected renderNodeCaption(node: ITreeNode, props: NodeProps): h.Child;
    protected decorateCaption(node: ITreeNode, caption: h.Child, props: NodeProps): h.Child;
    protected isExandable(node: ITreeNode): node is IExpandableTreeNode;
    protected decorateExpandableCaption(node: IExpandableTreeNode, caption: h.Child, props: NodeProps): h.Child;
    protected renderNodeChildren(node: ITreeNode, props: NodeProps): h.Child;
    protected renderCompositeChildren(parent: ICompositeTreeNode, props: NodeProps): h.Child;
    protected renderChild(child: ITreeNode, parent: ICompositeTreeNode, props: NodeProps): h.Child;
    protected createChildProps(child: ITreeNode, parent: ICompositeTreeNode, props: NodeProps): NodeProps;
    protected createExpandableChildProps(child: ITreeNode, parent: IExpandableTreeNode, props: NodeProps): NodeProps;
    protected onAfterAttach(msg: Message): void;
    protected handleLeft(): void;
    protected handleRight(): void;
    protected handleUp(): void;
    protected handleDown(): void;
    protected handleEnter(): void;
    protected handleClickEvent(node: ITreeNode | undefined, event: MouseEvent): void;
    protected handleDblClickEvent(node: ITreeNode | undefined, event: MouseEvent): void;
    protected handleContextMenuEvent(node: ITreeNode | undefined, event: MouseEvent): void;
    protected deflateForStorage(node: ITreeNode): object;
    protected inflateFromStorage(node: any, parent?: ITreeNode): ITreeNode;
    storeState(): object;
    restoreState(oldState: object): void;
}
