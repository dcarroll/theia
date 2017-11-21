/// <reference types="node" />
import { Worker } from 'cluster';
import { MessageConnection, Logger } from "vscode-jsonrpc";
export declare function createWorkerConnection(worker: Worker, logger: Logger): MessageConnection;
