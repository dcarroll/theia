/// <reference types="express" />
/// <reference types="node" />
/// <reference types="yargs" />
import * as http from "http";
import * as express from "express";
import * as yargs from "yargs";
import { ILogger, ContributionProvider } from "../common";
import { CliContribution } from "./cli";
export declare const BackendApplicationContribution: symbol;
export interface BackendApplicationContribution {
    initialize?(): void;
    configure?(app: express.Application): void;
    onStart?(server: http.Server): void;
}
export declare class BackendApplicationCliContribution implements CliContribution {
    port: number;
    hostname: string | undefined;
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): void;
}
/**
 * The main entry point for Theia applications.
 */
export declare class BackendApplication {
    protected readonly contributionsProvider: ContributionProvider<BackendApplicationContribution>;
    protected readonly cliParams: BackendApplicationCliContribution;
    protected readonly logger: ILogger;
    protected readonly app: express.Application;
    constructor(contributionsProvider: ContributionProvider<BackendApplicationContribution>, cliParams: BackendApplicationCliContribution, logger: ILogger);
    use(...handlers: express.Handler[]): void;
    start(aPort?: number, aHostname?: string): Promise<http.Server>;
}
