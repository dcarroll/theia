/// <reference types="monaco-editor-core/monaco" />
export declare enum Language {
    TypeScript = 0,
    EcmaScript5 = 1,
}
export declare function createTokenizationSupport(language: Language): monaco.languages.TokensProvider;
