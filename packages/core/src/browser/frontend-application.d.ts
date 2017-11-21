import { ContributionProvider, CommandRegistry, KeybindingRegistry, MenuModelRegistry } from '../common';
import { ApplicationShell } from './shell';
import { ILogger } from '../common';
import { MaybePromise } from '../common/types';
import { ShellLayoutRestorer } from './shell-layout-restorer';
/**
 * Clients can implement to get a callback for contributing widgets to a shell on start.
 */
export declare const FrontendApplicationContribution: symbol;
export interface FrontendApplicationContribution {
    /**
     * Called on application startup before onStart is called.
     */
    initialize?(): void;
    /**
     * Called when the application is started.
     * Should return a promise if it runs asynchronously.
     */
    onStart?(app: FrontendApplication): MaybePromise<void>;
    /**
     * Called when an application is stopped or unloaded.
     *
     * Note that this is implemented using `window.unload` which doesn't allow any asynchronous code anymore. I.e. this is the last tick.
     */
    onStop?(app: FrontendApplication): void;
    /**
     * called after start, when there is no previous workbench layout state.
     * Should return a promise if it runs asynchronously.
     */
    initializeLayout?(app: FrontendApplication): MaybePromise<void>;
}
export declare class FrontendApplication {
    protected readonly commands: CommandRegistry;
    protected readonly menus: MenuModelRegistry;
    protected readonly keybindings: KeybindingRegistry;
    protected readonly logger: ILogger;
    protected readonly layoutRestorer: ShellLayoutRestorer;
    protected readonly contributions: ContributionProvider<FrontendApplicationContribution>;
    protected readonly _shell: ApplicationShell;
    constructor(commands: CommandRegistry, menus: MenuModelRegistry, keybindings: KeybindingRegistry, logger: ILogger, layoutRestorer: ShellLayoutRestorer, contributions: ContributionProvider<FrontendApplicationContribution>, _shell: ApplicationShell);
    readonly shell: ApplicationShell;
    /**
     * Start the frontend application.
     *
     * Start up consists of the following steps:
     * - create the application shell
     * - start frontend contributions
     * - display the application shell
     */
    start(): Promise<void>;
    protected attachShell(): void;
    protected getHost(): HTMLElement;
    protected ensureLoaded(): Promise<void>;
    protected startContributions(): Promise<void>;
}
