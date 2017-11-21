/// <reference types="node" />
import { ProcessManager } from './process-manager';
import { ILogger } from '@theia/core/lib/common';
import { Process } from './process';
import * as child from 'child_process';
import * as stream from 'stream';
export declare const RawProcessOptions: symbol;
export interface RawProcessOptions {
    command: string;
    args?: string[];
    options?: object;
}
export declare const RawProcessFactory: symbol;
export declare type RawProcessFactory = (options: RawProcessOptions) => RawProcess;
export declare class RawProcess extends Process {
    readonly type: 'Raw' | 'Terminal';
    output: stream.Readable;
    errorOutput: stream.Readable;
    protected process: child.ChildProcess;
    protected terminal: undefined;
    constructor(options: RawProcessOptions, processManager: ProcessManager, logger: ILogger);
    readonly pid: number;
    kill(signal?: string): void;
}
