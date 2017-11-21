/// <reference types="@theia/monaco/src/typings/monaco/index" />
import { KeybindingContribution, KeybindingRegistry } from '@theia/core/lib/common/keybinding';
import { Accelerator, KeyCode } from '@theia/core/lib/common/keys';
import { MonacoCommandRegistry } from './monaco-command-registry';
export declare class MonacoKeybindingContribution implements KeybindingContribution {
    protected readonly commands: MonacoCommandRegistry;
    constructor(commands: MonacoCommandRegistry);
    registerKeybindings(registry: KeybindingRegistry): void;
    protected keyCode(keybinding: monaco.keybindings.SimpleKeybinding): KeyCode;
    protected accelerator(keybinding: monaco.keybindings.SimpleKeybinding): Accelerator;
}
