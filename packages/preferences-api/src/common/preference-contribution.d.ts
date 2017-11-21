import { ContributionProvider, ILogger } from '@theia/core/lib/common';
export declare const PreferenceContribution: symbol;
export interface PreferenceContribution {
    readonly schema: PreferenceSchema;
}
export declare const PreferenceSchema: symbol;
export interface PreferenceSchema {
    [name: string]: Object;
    properties: {
        [name: string]: object;
    };
}
export declare class PreferenceSchemaProvider {
    protected readonly logger: ILogger;
    protected readonly preferenceContributions: ContributionProvider<PreferenceContribution>;
    protected readonly combinedSchema: PreferenceSchema;
    constructor(logger: ILogger, preferenceContributions: ContributionProvider<PreferenceContribution>);
    getSchema(): PreferenceSchema;
}
