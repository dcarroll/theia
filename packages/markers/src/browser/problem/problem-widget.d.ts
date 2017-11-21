import { ProblemManager } from './problem-manager';
import { ProblemTreeModel } from './problem-tree-model';
import { MarkerInfoNode, MarkerNode } from '../marker-tree';
import { TreeWidget, TreeProps, ContextMenuRenderer, ITreeNode, NodeProps, ITreeModel } from "@theia/core/lib/browser";
import { h } from "@phosphor/virtualdom/lib";
import { DiagnosticSeverity } from 'vscode-languageserver-types';
import { Message } from '@phosphor/messaging';
import { FileIconProvider } from '@theia/filesystem/lib/browser/icons/file-icons';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class ProblemWidget extends TreeWidget {
    protected readonly problemManager: ProblemManager;
    readonly treeProps: TreeProps;
    readonly model: ProblemTreeModel;
    readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly iconProvider: FileIconProvider;
    protected readonly workspaceService: WorkspaceService;
    protected workspacePath: string | undefined;
    constructor(problemManager: ProblemManager, treeProps: TreeProps, model: ProblemTreeModel, contextMenuRenderer: ContextMenuRenderer, iconProvider: FileIconProvider, workspaceService: WorkspaceService);
    protected deflateForStorage(node: ITreeNode): object;
    protected inflateFromStorage(node: any, parent?: ITreeNode): ITreeNode;
    protected handleCopy(event: ClipboardEvent): void;
    protected onUpdateRequest(msg: Message): void;
    protected renderTree(model: ITreeModel): h.Child;
    protected decorateCaption(node: ITreeNode, caption: h.Child, props: NodeProps): h.Child;
    protected decorateMarkerNode(node: MarkerNode, caption: h.Child): h.Child;
    protected getSeverityClass(severity: DiagnosticSeverity): string;
    protected decorateMarkerFileNode(node: MarkerInfoNode, caption: h.Child): h.Child;
    protected getRelativePath(node: MarkerInfoNode): string;
}
