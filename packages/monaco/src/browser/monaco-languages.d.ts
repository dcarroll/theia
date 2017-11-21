import { MonacoLanguages as BaseMonacoLanguages, ProtocolToMonacoConverter, MonacoToProtocolConverter } from "monaco-languageclient";
import { Languages, DiagnosticCollection, Language } from "@theia/languages/lib/common";
import { ProblemManager } from "@theia/markers/lib/browser/problem/problem-manager";
import { WorkspaceSymbolProvider } from 'vscode-base-languageclient/lib/services';
import { Disposable } from 'vscode-jsonrpc';
export declare class MonacoLanguages extends BaseMonacoLanguages implements Languages {
    protected readonly problemManager: ProblemManager;
    workspaceSymbolProviders: WorkspaceSymbolProvider[];
    constructor(p2m: ProtocolToMonacoConverter, m2p: MonacoToProtocolConverter, problemManager: ProblemManager);
    createDiagnosticCollection(name?: string): DiagnosticCollection;
    registerWorkspaceSymbolProvider(provider: WorkspaceSymbolProvider): Disposable;
    readonly languages: Language[];
}
