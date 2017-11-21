import { Disposable, CommandRegistry } from '@theia/core/lib/common';
import * as base from 'vscode-base-languageclient/lib/base';
import * as services from 'vscode-base-languageclient/lib/services';
import * as connection from 'vscode-base-languageclient/lib/connection';
import { WorkspaceSymbolProvider } from 'vscode-base-languageclient/lib/services';
export * from 'vscode-base-languageclient/lib/services';
export * from 'vscode-base-languageclient/lib/connection';
export { BaseLanguageClient } from 'vscode-base-languageclient/lib/base';
export interface Language {
    readonly id: string;
    readonly name: string;
}
export declare const Languages: symbol;
export interface Languages extends services.Languages {
    readonly workspaceSymbolProviders?: WorkspaceSymbolProvider[];
    readonly languages?: Language[];
}
export declare const Workspace: symbol;
export interface Workspace extends services.Workspace {
    readonly ready: Promise<void>;
}
export declare const Commands: symbol;
export interface Commands extends services.Commands {
}
export declare class DefaultCommands implements Commands {
    protected readonly registry: CommandRegistry;
    constructor(registry: CommandRegistry);
    registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable;
}
export declare const Window: symbol;
export interface Window extends services.Window {
}
export declare const IConnectionProvider: symbol;
export interface IConnectionProvider extends connection.IConnectionProvider {
}
export declare const ILanguageClient: symbol;
export interface ILanguageClient extends base.BaseLanguageClient {
}
import LanguageClientOptions = base.BaseLanguageClientOptions;
export { LanguageClientOptions };
