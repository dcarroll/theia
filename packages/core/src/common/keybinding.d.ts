import { CommandRegistry } from './command';
import { KeyCode, Accelerator } from './keys';
import { ContributionProvider } from './contribution-provider';
import { ILogger } from "./logger";
export interface Keybinding {
    readonly commandId: string;
    readonly keyCode: KeyCode;
    /**
     * The optional keybinding context where this binding belongs to.
     * If not specified, then this keybinding context belongs to the NOOP
     * keybinding context.
     */
    readonly context?: KeybindingContext;
    /**
     * Sugar for showing the keybindings in the menus.
     */
    readonly accelerator?: Accelerator;
}
export declare const KeybindingContribution: symbol;
export interface KeybindingContribution {
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
export declare const KeybindingContext: symbol;
export interface KeybindingContext {
    /**
     * The unique ID of the current context.
     */
    readonly id: string;
    isEnabled(arg?: Keybinding): boolean;
}
export declare namespace KeybindingContexts {
    const NOOP_CONTEXT: KeybindingContext;
    const DEFAULT_CONTEXT: KeybindingContext;
}
export declare class KeybindingContextRegistry {
    protected readonly contextProvider: ContributionProvider<KeybindingContext>;
    protected readonly contexts: {
        [id: string]: KeybindingContext;
    };
    constructor(contextProvider: ContributionProvider<KeybindingContext>);
    initialize(): void;
    /**
     * Registers the keybinding context arguments into the application. Fails when an already registered
     * context is being registered.
     *
     * @param contexts the keybinding contexts to register into the application.
     */
    registerContext(...contexts: KeybindingContext[]): void;
    getContext(contextId: string): KeybindingContext | undefined;
}
export declare class KeybindingRegistry {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly contextRegistry: KeybindingContextRegistry;
    protected readonly contributions: ContributionProvider<KeybindingContribution>;
    protected readonly logger: ILogger;
    protected readonly keybindings: {
        [index: string]: Keybinding[];
    };
    protected readonly commands: {
        [commandId: string]: Keybinding[];
    };
    constructor(commandRegistry: CommandRegistry, contextRegistry: KeybindingContextRegistry, contributions: ContributionProvider<KeybindingContribution>, logger: ILogger);
    onStart(): void;
    registerKeybindings(...bindings: Keybinding[]): void;
    /**
     * Adds a keybinding to the registry.
     *
     * @param binding
     */
    registerKeybinding(binding: Keybinding): void;
    /**
     * The `active` flag with `false` could come handy when we do not want to check whether the command is currently active or not.
     * For instance, when building the main menu, it could easily happen that the command is not yet active (no active editors and so on)
     * but still, we have to build the key accelerator.
     *
     * @param commandId the unique ID of the command for we the associated ke binding are looking for.
     * @param options if `active` is false` then the availability of the command will not be checked. Default is `true`
     */
    getKeybindingForCommand(commandId: string, options?: {
        active: boolean;
    }): Keybinding | undefined;
    /**
     * @param keyCode the key code of the binding we are searching.
     */
    getKeybindingForKeyCode(keyCode: KeyCode, options?: {
        active: boolean;
    }): Keybinding | undefined;
    protected isActive(binding: Keybinding): boolean;
    /**
     * Run the command matching to the given keyboard event.
     */
    run(event: KeyboardEvent): void;
}
