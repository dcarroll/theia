/// <reference types="yargs" />
import * as yargs from 'yargs';
import { CliContribution } from '@theia/core/lib/node/cli';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { WorkspaceServer } from "../common";
export declare class WorkspaceCliContribution implements CliContribution {
    workspaceRoot: Deferred<string | undefined>;
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): void;
}
export declare class DefaultWorkspaceServer implements WorkspaceServer {
    protected readonly cliParams: WorkspaceCliContribution;
    protected root: Promise<string | undefined>;
    constructor(cliParams: WorkspaceCliContribution);
    getRoot(): Promise<string | undefined>;
    setRoot(uri: string): Promise<void>;
    protected getRootURIFromCli(): Promise<string | undefined>;
    /**
     * Writes the given uri as the most recently used workspace root to the user's home directory.
     * @param uri most recently used uri
     */
    private writeToUserHome(data);
    /**
     * Reads the most recently used workspace root from the user's home directory.
     */
    private readFromUserHome();
    protected getUserStoragePath(): string;
}
