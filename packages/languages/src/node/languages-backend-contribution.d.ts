/// <reference types="node" />
import * as http from 'http';
import { ContributionProvider } from '@theia/core/lib/common';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { LanguageServerContribution } from "./language-server-contribution";
export declare class LanguagesBackendContribution implements BackendApplicationContribution {
    protected readonly contributors: ContributionProvider<LanguageServerContribution>;
    constructor(contributors: ContributionProvider<LanguageServerContribution>);
    onStart(server: http.Server): void;
}
