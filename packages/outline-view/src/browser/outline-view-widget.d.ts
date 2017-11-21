import { TreeWidget, ITreeNode, NodeProps, ISelectableTreeNode, TreeProps, ContextMenuRenderer, TreeModel, IExpandableTreeNode } from "@theia/core/lib/browser";
import { h } from "@phosphor/virtualdom/lib";
import { Message } from '@phosphor/messaging';
import { Emitter } from '@theia/core';
import { ICompositeTreeNode } from '@theia/core/lib/browser';
export interface OutlineSymbolInformationNode extends ICompositeTreeNode, ISelectableTreeNode, IExpandableTreeNode {
    iconClass: string;
}
export declare namespace OutlineSymbolInformationNode {
    function is(node: ITreeNode): node is OutlineSymbolInformationNode;
}
export declare type OutlineViewWidgetFactory = () => OutlineViewWidget;
export declare const OutlineViewWidgetFactory: symbol;
export declare class OutlineViewWidget extends TreeWidget {
    protected readonly treeProps: TreeProps;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    readonly onDidChangeOpenStateEmitter: Emitter<boolean>;
    constructor(treeProps: TreeProps, model: TreeModel, contextMenuRenderer: ContextMenuRenderer);
    setOutlineTree(roots: OutlineSymbolInformationNode[]): void;
    protected reconcileTreeState(nodes: ITreeNode[]): ITreeNode[];
    protected onAfterHide(msg: Message): void;
    protected onAfterShow(msg: Message): void;
    protected onUpdateRequest(msg: Message): void;
    protected decorateCaption(node: ITreeNode, caption: h.Child, props: NodeProps): h.Child;
    protected isExandable(node: ITreeNode): node is IExpandableTreeNode;
}
