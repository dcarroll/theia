/// <reference types="node" />
import { Worker } from 'cluster';
import { AbstractStreamMessageReader, DataCallback } from 'vscode-ws-jsonrpc/lib';
export declare class WorkerMessageReader extends AbstractStreamMessageReader {
    protected readonly worker: Worker;
    constructor(worker: Worker);
    listen(callback: DataCallback): void;
}
