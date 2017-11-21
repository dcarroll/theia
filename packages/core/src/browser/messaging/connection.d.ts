import { interfaces } from "inversify";
import { Logger } from "vscode-ws-jsonrpc";
import { ConnectionHandler, JsonRpcProxy } from "../../common";
export interface WebSocketOptions {
    /**
     * True by default.
     */
    reconnecting?: boolean;
}
export declare class WebSocketConnectionProvider {
    static createProxy<T extends object>(container: interfaces.Container, path: string, target?: object): JsonRpcProxy<T>;
    /**
     * Create a proxy object to remote interface of T type
     * over a web socket connection for the given path.
     *
     * An optional target can be provided to handle
     * notifications and requests from a remote side.
     */
    createProxy<T extends object>(path: string, target?: object, options?: WebSocketOptions): JsonRpcProxy<T>;
    /**
     * Install a connection handler for the given path.
     */
    listen(handler: ConnectionHandler, options?: WebSocketOptions): void;
    protected createLogger(): Logger;
    /**
     * Creates a websocket URL to the current location
     */
    createWebSocketUrl(path: string): string;
    /**
     * Creates a web socket for the given url
     */
    createWebSocket(url: string, options?: WebSocketOptions): WebSocket;
}
