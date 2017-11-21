import { MarkerTree, MarkerNode } from './marker-tree';
import { TreeModel, TreeServices, OpenerService, ITreeNode, OpenerOptions } from "@theia/core/lib/browser";
export declare class MarkerTreeServices extends TreeServices {
    readonly openerService: OpenerService;
}
export declare class MarkerTreeModel<T extends object> extends TreeModel {
    protected readonly tree: MarkerTree<T>;
    readonly services: MarkerTreeServices;
    protected readonly openerService: OpenerService;
    constructor(tree: MarkerTree<T>, services: MarkerTreeServices);
    protected doOpenNode(node: ITreeNode): void;
    protected getOpenerOptionsByMarker(node: MarkerNode): OpenerOptions | undefined;
}
