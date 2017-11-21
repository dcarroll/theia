import { BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory } from '@theia/languages/lib/browser';
export declare class TypeScriptClientContribution extends BaseLanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    readonly id: string;
    readonly name: string;
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory);
    protected readonly globPatterns: string[];
}
export declare class JavaScriptClientContribution extends BaseLanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    readonly id: string;
    readonly name: string;
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory);
    protected readonly globPatterns: string[];
}
