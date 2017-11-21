import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
import { CppPreferences } from "../common";
import { Message } from 'vscode-ws-jsonrpc';
export declare class CppContribution extends BaseLanguageServerContribution {
    protected readonly cppPreferences: CppPreferences;
    readonly id: string;
    readonly name: string;
    constructor(cppPreferences: CppPreferences);
    protected map(message: Message): Message;
    protected forward(clientConnection: IConnection, serverConnection: IConnection): void;
    start(clientConnection: IConnection): void;
}
