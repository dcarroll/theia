/// <reference types="@theia/monaco/src/typings/monaco/index" />
/// <reference types="monaco-editor-core/monaco" />
import SymbolInformation = monaco.modes.SymbolInformation;
import { FrontendApplicationContribution, FrontendApplication, ITreeNode } from "@theia/core/lib/browser";
import { Range, EditorManager, EditorWidget } from '@theia/editor/lib/browser';
import CancellationTokenSource = monaco.cancellation.CancellationTokenSource;
import { DisposableCollection } from "@theia/core";
import { OutlineViewService } from '@theia/outline-view/lib/browser/outline-view-service';
import { OutlineSymbolInformationNode } from '@theia/outline-view/lib/browser/outline-view-widget';
export declare class MonacoOutlineContribution implements FrontendApplicationContribution {
    protected readonly outlineViewService: OutlineViewService;
    protected readonly editorManager: EditorManager;
    protected ids: string[];
    protected symbolList: NodeAndSymbol[];
    protected readonly toDispose: DisposableCollection;
    protected readonly outlineSymbolInformations: MonacoOutlineSymbolInformationNode[];
    protected cancellationSource: CancellationTokenSource;
    constructor(outlineViewService: OutlineViewService, editorManager: EditorManager);
    onStart(app: FrontendApplication): void;
    protected updateOutline(): void;
    protected updateOutlineForEditor(editor: EditorWidget | undefined): Promise<void>;
    protected getModel(editor: EditorWidget): Promise<monaco.editor.IModel>;
    protected computeSymbolInformations(model: monaco.editor.IModel): Promise<SymbolInformation[]>;
    protected publish(entries: SymbolInformation[]): void;
    getRangeFromSymbolInformation(symbolInformation: SymbolInformation): Range;
    getId(name: string, counter: number): string;
    protected convertToNode(symbol: SymbolInformation, parent: NodeAndSymbol | undefined): NodeAndSymbol;
    protected shouldExpand(symbol: SymbolInformation): boolean;
    protected orderByPosition(symbol1: SymbolInformation, symbol2: SymbolInformation): number;
    protected createTree(parentNode: NodeAndSymbol | undefined, symbolInformationList: SymbolInformation[]): OutlineSymbolInformationNode[];
    protected getSymbolInformationByNode(node: OutlineSymbolInformationNode): SymbolInformation | undefined;
}
export interface MonacoOutlineSymbolInformationNode extends OutlineSymbolInformationNode {
    uri: string;
    range: Range;
}
export declare namespace MonacoOutlineSymbolInformationNode {
    function is(node: ITreeNode): node is MonacoOutlineSymbolInformationNode;
}
export interface NodeAndSymbol {
    node: OutlineSymbolInformationNode;
    symbol: SymbolInformation;
}
