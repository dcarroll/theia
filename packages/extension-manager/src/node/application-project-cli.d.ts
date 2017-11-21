/// <reference types="yargs" />
import * as yargs from 'yargs';
import { CliContribution } from "@theia/core/lib/node";
import { ApplicationProjectOptions } from './application-project';
import { NpmClientOptions } from './npm-client';
export declare type ApplicationProjectArgs = ApplicationProjectOptions & NpmClientOptions;
export declare class ApplicationProjectCliContribution implements CliContribution {
    protected _args: ApplicationProjectArgs;
    readonly args: ApplicationProjectArgs;
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): void;
}
