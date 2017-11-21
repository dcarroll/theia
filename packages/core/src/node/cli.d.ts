/// <reference types="yargs" />
import * as yargs from 'yargs';
import { ContributionProvider } from '../common/contribution-provider';
export declare const CliContribution: symbol;
/**
 * Call back for extension to contribute options to the cli.
 */
export interface CliContribution {
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): void;
}
export declare class CliManager {
    protected readonly contributionsProvider: ContributionProvider<CliContribution>;
    constructor(contributionsProvider: ContributionProvider<CliContribution>);
    initializeCli(): void;
    protected getArgs(): string[];
    protected isExit(): boolean;
}
