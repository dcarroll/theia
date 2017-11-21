/// <reference types="node" />
import * as cp from 'child_process';
import { CMD, ILogger, CancellationToken } from "@theia/core";
export declare class NpmClientOptions {
    readonly npmClient: 'yarn' | 'npm';
}
export declare class NpmClient {
    protected readonly options: NpmClientOptions;
    protected readonly logger: ILogger;
    constructor(options: NpmClientOptions, logger: ILogger);
    execute(projectPath: string, command: string, args: string[], token?: CancellationToken): Promise<void>;
    spawn(projectPath: string, command: string, args?: string[]): cp.ChildProcess;
    protected npmCommand(command: string): string;
    protected doSpawn(projectPath: string, [command, args]: CMD): cp.ChildProcess;
}
