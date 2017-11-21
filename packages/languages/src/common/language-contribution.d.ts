export interface LanguageContribution {
    readonly id: string;
    readonly name: string;
}
export declare namespace LanguageContribution {
    function getPath(contribution: LanguageContribution): string;
}
