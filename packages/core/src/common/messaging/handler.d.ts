import { MessageConnection } from "vscode-jsonrpc";
export declare const ConnectionHandler: symbol;
export interface ConnectionHandler {
    readonly path: string;
    onConnection(connection: MessageConnection): void;
}
