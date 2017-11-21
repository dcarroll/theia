import { Tree, ICompositeTreeNode, ITreeNode, ISelectableTreeNode, IExpandableTreeNode } from "@theia/core/lib/browser";
import { MarkerManager } from './marker-manager';
import { Marker } from '../common/marker';
import { UriSelection } from "@theia/filesystem/lib/common";
export declare const MarkerOptions: symbol;
export interface MarkerOptions {
    readonly kind: string;
}
export declare abstract class MarkerTree<T extends object> extends Tree {
    protected readonly markerManager: MarkerManager<T>;
    protected readonly markerOptions: MarkerOptions;
    constructor(markerManager: MarkerManager<T>, markerOptions: MarkerOptions);
    resolveChildren(parent: ICompositeTreeNode): Promise<ITreeNode[]>;
    getMarkerInfoNodes(parent: MarkerRootNode): Promise<MarkerInfoNode[]>;
    getMarkerNodes(parent: MarkerInfoNode): Promise<MarkerNode[]>;
}
export interface MarkerNode extends UriSelection, ISelectableTreeNode {
    marker: Marker<object>;
}
export declare namespace MarkerNode {
    function is(node: ITreeNode | undefined): node is MarkerNode;
}
export interface MarkerInfoNode extends UriSelection, ISelectableTreeNode, IExpandableTreeNode {
    parent: MarkerRootNode;
    numberOfMarkers: number;
}
export declare namespace MarkerInfoNode {
    function is(node: ITreeNode | undefined): node is MarkerInfoNode;
}
export interface MarkerRootNode extends ICompositeTreeNode {
    kind: string;
}
export declare namespace MarkerRootNode {
    function is(node: ITreeNode | undefined): node is MarkerRootNode;
}
