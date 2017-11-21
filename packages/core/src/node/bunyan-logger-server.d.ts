/// <reference types="yargs" />
import * as yargs from 'yargs';
import { ILoggerServer, ILoggerClient } from '../common/logger-protocol';
import { CliContribution } from './cli';
export declare class LogLevelCliContribution implements CliContribution {
    logLevel: string;
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): void;
}
export declare class BunyanLoggerServer implements ILoggerServer {
    private loggers;
    private currentId;
    private client;
    private logLevel;
    private readonly rootLoggerId;
    constructor(options: object);
    dispose(): void;
    child(obj: Object): Promise<number>;
    setClient(client: ILoggerClient | undefined): void;
    setLogLevel(id: number, logLevel: number): Promise<void>;
    getLogLevel(id: number): Promise<number>;
    log(id: number, logLevel: number, message: string, params: any[]): Promise<void>;
    protected toBunyanLevel(logLevel: number): number;
    protected toLogLevel(bunyanLogLevel: number | string): number;
}
