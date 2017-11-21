import { ProblemManager } from './problem-manager';
import { MarkerNode, MarkerTree, MarkerOptions } from '../marker-tree';
import { MarkerTreeModel, MarkerTreeServices } from '../marker-tree-model';
import { OpenerService, OpenerOptions } from '@theia/core/lib/browser';
import { Diagnostic } from "vscode-languageserver-types";
export declare class ProblemTree extends MarkerTree<Diagnostic> {
    protected readonly problemManager: ProblemManager;
    protected readonly markerOptions: MarkerOptions;
    constructor(problemManager: ProblemManager, markerOptions: MarkerOptions);
}
export declare class ProblemTreeModel extends MarkerTreeModel<Diagnostic> {
    protected readonly tree: ProblemTree;
    readonly services: MarkerTreeServices;
    protected readonly openerService: OpenerService;
    constructor(tree: ProblemTree, services: MarkerTreeServices);
    protected getOpenerOptionsByMarker(node: MarkerNode): OpenerOptions | undefined;
}
