import { ILogger } from '@theia/core/lib/common/logger';
import { ITerminalServer, ITerminalServerOptions } from '../common/terminal-protocol';
import { BaseTerminalServer } from './base-terminal-server';
import { TerminalProcessFactory, ProcessManager } from '@theia/process/lib/node';
export declare class TerminalServer extends BaseTerminalServer implements ITerminalServer {
    protected readonly terminalFactory: TerminalProcessFactory;
    protected readonly processManager: ProcessManager;
    protected readonly logger: ILogger;
    constructor(terminalFactory: TerminalProcessFactory, processManager: ProcessManager, logger: ILogger);
    create(options: ITerminalServerOptions): Promise<number>;
}
