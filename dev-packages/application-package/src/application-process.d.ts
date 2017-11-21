/// <reference types="node" />
import * as cp from 'child_process';
import { ApplicationPackage } from './application-package';
export declare class ApplicationProcess {
    protected readonly pck: ApplicationPackage;
    protected readonly binProjectPath: string;
    protected readonly defaultOptions: {
        cwd: string;
        env: NodeJS.ProcessEnv;
    };
    constructor(pck: ApplicationPackage, binProjectPath: string);
    spawn(command: string, args?: string[], options?: cp.SpawnOptions): cp.ChildProcess;
    fork(modulePath: string, args?: string[], options?: cp.ForkOptions): cp.ChildProcess;
    canRun(command: string): boolean;
    run(command: string, args: string[], options?: cp.SpawnOptions): Promise<void>;
    spawnBin(command: string, args: string[], options?: cp.SpawnOptions): cp.ChildProcess;
    protected resolveBin(command: string): string;
    bunyan(childProcess: cp.ChildProcess): Promise<void>;
    protected promisify(command: string, p: cp.ChildProcess): Promise<void>;
}
