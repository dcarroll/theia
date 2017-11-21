/// <reference types="node" />
import * as net from 'net';
import * as cp from 'child_process';
import { Message } from 'vscode-ws-jsonrpc';
import { IConnection } from 'vscode-ws-jsonrpc/lib/server';
import { MaybePromise } from "@theia/core/lib/common";
import { LanguageContribution } from "../common";
export { LanguageContribution, IConnection, Message };
export declare const LanguageServerContribution: symbol;
export interface LanguageServerContribution extends LanguageContribution {
    start(clientConnection: IConnection): void;
}
export declare abstract class BaseLanguageServerContribution implements LanguageServerContribution {
    readonly abstract id: string;
    readonly abstract name: string;
    abstract start(clientConnection: IConnection): void;
    protected forward(clientConnection: IConnection, serverConnection: IConnection): void;
    protected map(message: Message): Message;
    protected createProcessSocketConnection(outSocket: MaybePromise<net.Socket>, inSocket: MaybePromise<net.Socket>, command: string, args?: string[], options?: cp.SpawnOptions): Promise<IConnection>;
    protected createProcessStreamConnection(command: string, args?: string[], options?: cp.SpawnOptions): IConnection;
    protected spawnProcess(command: string, args?: string[], options?: cp.SpawnOptions): cp.ChildProcess;
    protected onDidFailSpawnProcess(error: Error): void;
    protected logError(data: string | Buffer): void;
    protected logInfo(data: string | Buffer): void;
    protected startSocketServer(): Promise<net.Server>;
    protected accept(server: net.Server): Promise<net.Socket>;
}
