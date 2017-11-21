/// <reference types="node" />
import { ProcessManager } from './process-manager';
import { ILogger, Emitter, Event } from '@theia/core/lib/common';
import * as child from 'child_process';
import * as stream from 'stream';
export interface IProcessExitEvent {
    code: number;
    signal?: string;
}
export declare abstract class Process {
    protected readonly processManager: ProcessManager;
    protected readonly logger: ILogger;
    readonly id: number;
    readonly abstract type: 'Raw' | 'Terminal';
    abstract pid: number;
    abstract output: stream.Readable;
    protected abstract process: child.ChildProcess | undefined;
    protected abstract terminal: any;
    protected readonly exitEmitter: Emitter<IProcessExitEvent>;
    protected readonly errorEmitter: Emitter<Error>;
    protected _killed: boolean;
    constructor(processManager: ProcessManager, logger: ILogger);
    abstract kill(signal?: string): void;
    killed: boolean;
    readonly onExit: Event<IProcessExitEvent>;
    readonly onError: Event<Error>;
    protected emitOnExit(code: number, signal?: string): void;
    protected handleOnExit(event: IProcessExitEvent): void;
    protected emitOnError(err: Error): void;
    protected handleOnError(error: Error): void;
}
