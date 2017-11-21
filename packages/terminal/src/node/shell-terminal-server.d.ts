import { ILogger } from '@theia/core/lib/common/logger';
import { IShellTerminalServerOptions } from '../common/shell-terminal-protocol';
import { BaseTerminalServer } from '../node/base-terminal-server';
import { ShellProcessFactory } from '../node/shell-process';
import { ProcessManager } from '@theia/process/lib/node';
export declare class ShellTerminalServer extends BaseTerminalServer {
    protected readonly shellFactory: ShellProcessFactory;
    constructor(shellFactory: ShellProcessFactory, processManager: ProcessManager, logger: ILogger);
    create(options: IShellTerminalServerOptions): Promise<number>;
}
