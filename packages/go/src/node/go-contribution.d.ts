import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
/**
 * IF you have go on your machine, `go-langserver` can be installed with the following command:
 * `go get github.com/sourcegraph/go-langserver`
 */
export declare class GoContribution extends BaseLanguageServerContribution {
    readonly id: string;
    readonly name: string;
    start(clientConnection: IConnection): void;
    protected onDidFailSpawnProcess(error: Error): void;
}
