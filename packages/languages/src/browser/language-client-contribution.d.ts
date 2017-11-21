import { Disposable } from "@theia/core/lib/common";
import { FrontendApplication } from '@theia/core/lib/browser';
import { LanguageContribution, ILanguageClient, LanguageClientOptions, DocumentSelector, TextDocument, FileSystemWatcher, Workspace, Languages } from '../common';
import { LanguageClientFactory } from "./language-client-factory";
export declare const LanguageClientContribution: symbol;
export interface LanguageClientContribution extends LanguageContribution {
    readonly languageClient: Promise<ILanguageClient>;
    waitForActivation(app: FrontendApplication): Promise<void>;
    activate(app: FrontendApplication): Disposable;
}
export declare abstract class BaseLanguageClientContribution implements LanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    readonly abstract id: string;
    readonly abstract name: string;
    protected _languageClient: ILanguageClient | undefined;
    protected resolveReady: (languageClient: ILanguageClient) => void;
    protected ready: Promise<ILanguageClient>;
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory);
    readonly languageClient: Promise<ILanguageClient>;
    waitForActivation(app: FrontendApplication): Promise<any>;
    activate(): Disposable;
    protected onWillStart(languageClient: ILanguageClient): void;
    protected onReady(languageClient: ILanguageClient): void;
    protected waitForReady(): void;
    protected createLanguageClient(): ILanguageClient;
    protected createOptions(): LanguageClientOptions;
    protected readonly documentSelector: DocumentSelector | undefined;
    protected createFileEvents(): FileSystemWatcher[];
    protected readonly globPatterns: string[];
    protected waitForOpenTextDocument(selector: DocumentSelector): Promise<TextDocument>;
}
