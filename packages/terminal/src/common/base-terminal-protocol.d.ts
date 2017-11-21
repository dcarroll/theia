import { JsonRpcServer } from '@theia/core/lib/common/messaging/proxy-factory';
export interface IBaseTerminalServerOptions {
}
export interface IBaseTerminalServer extends JsonRpcServer<IBaseTerminalClient> {
    create(IBaseTerminalServerOptions: object): Promise<number>;
    resize(id: number, cols: number, rows: number): Promise<void>;
    attach(id: number): Promise<number>;
}
export interface IBaseTerminalExitEvent {
    terminalId: number;
    code: number;
    signal?: string;
}
export interface IBaseTerminalErrorEvent {
    terminalId: number;
    error: Error;
}
export interface IBaseTerminalClient {
    onTerminalExitChanged(event: IBaseTerminalExitEvent): void;
    onTerminalError(event: IBaseTerminalErrorEvent): void;
}
