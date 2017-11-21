import { BaseLanguageClientContribution } from '@theia/languages/lib/browser';
export declare class CppClientContribution extends BaseLanguageClientContribution {
    readonly id: string;
    readonly name: string;
    protected readonly documentSelector: string[];
    protected readonly globPatterns: string[];
}
