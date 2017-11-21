/// <reference types="node" />
import { EventEmitter } from 'events';
import { ServerWorker } from './server-worker';
export declare type MasterProcessEvent = 'started' | 'restarted' | 'restarting';
export declare class MasterProcess extends EventEmitter {
    protected serverWorker: ServerWorker | undefined;
    protected fork(): ServerWorker;
    start(): ServerWorker;
    readonly started: Promise<ServerWorker>;
    restart(): Promise<void>;
    readonly restarting: Promise<ServerWorker>;
    readonly restarted: Promise<ServerWorker>;
    protected timeout(delay: number): Promise<void>;
    on(event: MasterProcessEvent, listener: (worker: ServerWorker) => void): this;
    emit(event: MasterProcessEvent, worker: ServerWorker): boolean;
}
