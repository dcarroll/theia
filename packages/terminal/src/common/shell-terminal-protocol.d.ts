import { IBaseTerminalServer, IBaseTerminalServerOptions } from './base-terminal-protocol';
export declare const IShellTerminalServer: symbol;
export interface IShellTerminalServer extends IBaseTerminalServer {
}
export declare const shellTerminalPath = "/services/shell-terminal";
export interface IShellTerminalServerOptions extends IBaseTerminalServerOptions {
    shell?: string;
    rootURI?: string;
    cols?: number;
    rows?: number;
}
