import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { Workspace, Languages, Commands, Window, ILanguageClient, LanguageClientOptions, LanguageContribution } from '../common';
export declare class LanguageClientFactory {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly commands: Commands;
    protected readonly window: Window;
    protected readonly connectionProvider: WebSocketConnectionProvider;
    constructor(workspace: Workspace, languages: Languages, commands: Commands, window: Window, connectionProvider: WebSocketConnectionProvider);
    get(contribution: LanguageContribution, clientOptions: LanguageClientOptions): ILanguageClient;
}
