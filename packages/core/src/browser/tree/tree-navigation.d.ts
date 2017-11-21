import { ITreeNode } from "./tree";
export declare class TreeNavigationService {
    protected index: number;
    protected nodes: ITreeNode[];
    readonly next: ITreeNode | undefined;
    readonly prev: ITreeNode | undefined;
    advance(): ITreeNode | undefined;
    retreat(): ITreeNode | undefined;
    push(node: ITreeNode): void;
}
