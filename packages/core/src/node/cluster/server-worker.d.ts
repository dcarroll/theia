/// <reference types="node" />
import * as cluster from "cluster";
import { RemoteServer } from "./cluster-protocol";
export declare class ServerWorker {
    protected readonly worker: cluster.Worker;
    readonly server: RemoteServer;
    readonly online: Promise<void>;
    readonly failed: Promise<Error>;
    readonly listening: Promise<cluster.Address>;
    readonly initialized: Promise<void>;
    readonly disconnect: Promise<void>;
    readonly exit: Promise<string>;
    constructor(restart: () => Promise<void>);
    stop(): Promise<void>;
}
