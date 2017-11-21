/// <reference types="node" />
import * as net from 'net';
import * as http from 'http';
import { IMasterProcess, IServerProcess } from './cluster-protocol';
import { BackendApplicationContribution } from '../backend-application';
export declare const RemoteMasterProcessFactory: symbol;
export declare type RemoteMasterProcessFactory = (serverProcess: IServerProcess) => IMasterProcess;
export declare const stubRemoteMasterProcessFactory: RemoteMasterProcessFactory;
export declare const clusterRemoteMasterProcessFactory: RemoteMasterProcessFactory;
export declare class ServerProcess implements BackendApplicationContribution {
    protected readonly masterFactory: RemoteMasterProcessFactory;
    protected readonly master: IMasterProcess;
    protected server: http.Server | undefined;
    protected readonly sockets: Set<net.Socket>;
    constructor(masterFactory: RemoteMasterProcessFactory);
    onStart(server: http.Server): void;
    restart(): Promise<void>;
    kill(): Promise<void>;
    protected close(): Promise<void>;
    protected disconnect(): Promise<void>;
}
