/// <reference types="node" />
import * as http from 'http';
import { ILogger } from "@theia/core/lib/common";
import { ProcessManager } from "@theia/process/lib/node";
import { BackendApplicationContribution } from '@theia/core/lib/node';
export declare class TerminalBackendContribution implements BackendApplicationContribution {
    protected readonly processManager: ProcessManager;
    protected readonly logger: ILogger;
    constructor(processManager: ProcessManager, logger: ILogger);
    onStart(server: http.Server): void;
}
