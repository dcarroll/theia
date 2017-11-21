import { CommandService } from "@theia/core/lib/common";
import { Window, ILanguageClient, BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory } from '@theia/languages/lib/browser';
import { ActionableMessage } from "./java-protocol";
export declare class JavaClientContribution extends BaseLanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    protected readonly window: Window;
    protected readonly commandService: CommandService;
    readonly id: string;
    readonly name: string;
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory, window: Window, commandService: CommandService);
    protected readonly globPatterns: string[];
    protected onReady(languageClient: ILanguageClient): void;
    protected showActionableMessage(message: ActionableMessage): void;
}
