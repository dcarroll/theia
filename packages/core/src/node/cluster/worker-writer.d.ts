/// <reference types="node" />
import { Worker } from 'cluster';
import { AbstractStreamMessageWriter } from 'vscode-ws-jsonrpc/lib';
export declare class WorkerMessageWriter extends AbstractStreamMessageWriter {
    protected readonly worker: Worker;
    constructor(worker: Worker);
    protected send(content: string): void;
}
