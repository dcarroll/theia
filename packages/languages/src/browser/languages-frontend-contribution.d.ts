import { ContributionProvider } from '@theia/core/lib/common';
import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { LanguageClientContribution } from './language-client-contribution';
export declare class LanguagesFrontendContribution implements FrontendApplicationContribution {
    protected readonly contributions: ContributionProvider<LanguageClientContribution>;
    constructor(contributions: ContributionProvider<LanguageClientContribution>);
    onStart(app: FrontendApplication): void;
}
