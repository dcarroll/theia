import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
/**
 * IF you have python on your machine, `pyls` can be installed with the following command:
 * `pip install `
 */
export declare class PythonContribution extends BaseLanguageServerContribution {
    readonly id: string;
    readonly name: string;
    start(clientConnection: IConnection): void;
    protected onDidFailSpawnProcess(error: Error): void;
}
