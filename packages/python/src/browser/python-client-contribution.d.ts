import { BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory } from '@theia/languages/lib/browser';
export declare class PythonClientContribution extends BaseLanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    readonly id: string;
    readonly name: string;
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory);
    protected readonly globPatterns: string[];
}
