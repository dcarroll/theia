import { ILogger } from '@theia/core/lib/common/logger';
import { TerminalProcess, ProcessManager } from '@theia/process/lib/node';
export declare const ShellProcessFactory: symbol;
export declare type ShellProcessFactory = (options: ShellProcessOptions) => ShellProcess;
export declare const ShellProcessOptions: symbol;
export interface ShellProcessOptions {
    shell?: string;
    rootURI?: string;
    cols?: number;
    rows?: number;
}
export declare class ShellProcess extends TerminalProcess {
    protected static defaultCols: number;
    protected static defaultRows: number;
    constructor(options: ShellProcessOptions, processManager: ProcessManager, logger: ILogger);
    protected static getShellExecutablePath(): string;
}
