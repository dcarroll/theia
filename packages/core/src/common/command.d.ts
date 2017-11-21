import { Disposable } from "./disposable";
import { ContributionProvider } from './contribution-provider';
/**
 * A command is a unique identifier of a function
 * which can be executed by a user via a keyboard shortcut,
 * a menu action or directly.
 */
export interface Command {
    /**
     * A unique identifier of this command.
     */
    id: string;
    /**
     * A label of this command.
     */
    label?: string;
    /**
     * An icon class of this command.
     */
    iconClass?: string;
}
/**
 * A command handler is an implementation of a command.
 *
 * A command can have multiple handlers
 * but they should be active in different contexts,
 * otherwise first active will be executed.
 */
export interface CommandHandler {
    /**
     * Execute this handler.
     */
    execute(...args: any[]): any;
    /**
     * Test whether this handler is enabled (active).
     */
    isEnabled?(...args: any[]): boolean;
    /**
     * Test whether menu items for this handler should be visible.
     */
    isVisible?(...args: any[]): boolean;
}
export declare const CommandContribution: symbol;
/**
 * The command contribution should be implemented to register custom commands and handler.
 */
export interface CommandContribution {
    /**
     * Register commands and handlers.
     */
    registerCommands(commands: CommandRegistry): void;
}
export declare const CommandService: symbol;
/**
 * The command service should be used to execute commands.
 */
export interface CommandService {
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    executeCommand<T>(command: string, ...args: any[]): Promise<T | undefined>;
}
/**
 * The command registry manages commands and handlers.
 */
export declare class CommandRegistry implements CommandService {
    protected readonly contributionProvider: ContributionProvider<CommandContribution>;
    protected readonly _commands: {
        [id: string]: Command;
    };
    protected readonly _handlers: {
        [id: string]: CommandHandler[];
    };
    constructor(contributionProvider: ContributionProvider<CommandContribution>);
    onStart(): void;
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    registerCommand(command: Command, handler?: CommandHandler): Disposable;
    protected doRegisterCommand(command: Command): Disposable;
    /**
     * Register the given handler for the given command identifier.
     */
    registerHandler(commandId: string, handler: CommandHandler): Disposable;
    /**
     * Test whether there is an active handler for the given command.
     */
    isEnabled(command: string, ...args: any[]): boolean;
    /**
     * Test whether there is a visible handler for the given command.
     */
    isVisible(command: string, ...args: any[]): boolean;
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    executeCommand<T>(command: string, ...args: any[]): Promise<T | undefined>;
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    getVisibleHandler(commandId: string, ...args: any[]): CommandHandler | undefined;
    /**
     * Get an active handler for the given command or `undefined`.
     */
    getActiveHandler(commandId: string, ...args: any[]): CommandHandler | undefined;
    /**
     * Get all registered commands.
     */
    readonly commands: Command[];
    /**
     * Get a command for the given command identifier.
     */
    getCommand(id: string): Command | undefined;
    /**
     * Get all registered commands identifiers.
     */
    readonly commandIds: string[];
}
