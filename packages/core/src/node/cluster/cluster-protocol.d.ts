/// <reference types="node" />
import cluster = require('cluster');
import { JsonRpcProxy } from '../../common/messaging';
/**
 * The cluster master process.
 */
export interface IMasterProcess {
    /**
     * Notify when the current server process is ready.
     */
    onDidInitialize(): void;
    /**
     * Restart the current server process.
     */
    restart(): Promise<void>;
}
/**
 * The express server process.
 */
export interface IServerProcess {
}
export declare function createWorkerProxy<T extends object>(worker: cluster.Worker, target: any): JsonRpcProxy<T>;
export declare type RemoteServer = JsonRpcProxy<IServerProcess>;
export declare function createRemoteServer(worker: cluster.Worker, target: IMasterProcess): RemoteServer;
export declare type RemoteMaster = JsonRpcProxy<IMasterProcess>;
export declare function createRemoteMaster(worker: cluster.Worker, target: IServerProcess): RemoteMaster;
