/// <reference types="node" />
import * as stream from 'stream';
import { ILogger } from '@theia/core/lib/common';
import { Process } from './process';
import { ProcessManager } from './process-manager';
export declare const TerminalProcessOptions: symbol;
export interface TerminalProcessOptions {
    command: string;
    args?: string[];
    options?: object;
}
export declare const TerminalProcessFactory: symbol;
export declare type TerminalProcessFactory = (options: TerminalProcessOptions) => TerminalProcess;
export declare class TerminalReadableStream extends stream.Readable {
    protected readonly terminal: any;
    constructor(terminal: any, opts?: any);
    _read(size: number): void;
}
export declare class TerminalProcess extends Process {
    readonly type: 'Raw' | 'Terminal';
    output: TerminalReadableStream;
    protected process: undefined;
    protected terminal: any;
    protected terminalReadStream: TerminalReadableStream;
    constructor(options: TerminalProcessOptions, processManager: ProcessManager, logger: ILogger);
    readonly pid: any;
    kill(signal?: string): void;
    resize(cols: number, rows: number): void;
    write(data: string): void;
}
