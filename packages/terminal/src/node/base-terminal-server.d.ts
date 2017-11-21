import { ILogger, DisposableCollection } from '@theia/core/lib/common';
import { IBaseTerminalServer, IBaseTerminalServerOptions, IBaseTerminalClient } from '../common/base-terminal-protocol';
import { TerminalProcess, ProcessManager } from '@theia/process/lib/node';
export declare abstract class BaseTerminalServer implements IBaseTerminalServer {
    protected readonly processManager: ProcessManager;
    protected readonly logger: ILogger;
    protected client: IBaseTerminalClient | undefined;
    protected terminalToDispose: Map<number, DisposableCollection>;
    constructor(processManager: ProcessManager, logger: ILogger);
    abstract create(options: IBaseTerminalServerOptions): Promise<number>;
    attach(id: number): Promise<number>;
    dispose(): void;
    resize(id: number, cols: number, rows: number): Promise<void>;
    setClient(client: IBaseTerminalClient | undefined): void;
    protected postCreate(term: TerminalProcess): void;
}
