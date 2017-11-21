import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
export declare abstract class AbstractTypeScriptContribution extends BaseLanguageServerContribution {
    start(clientConnection: IConnection): void;
}
export declare class TypeScriptContribution extends AbstractTypeScriptContribution {
    readonly id: string;
    readonly name: string;
}
export declare class JavaScriptContribution extends AbstractTypeScriptContribution {
    readonly id: string;
    readonly name: string;
}
