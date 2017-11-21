import { EditorManager } from "@theia/editor/lib/browser";
import { KeybindingContext, Keybinding, KeybindingContribution, KeybindingRegistry } from "@theia/core/lib/common";
export declare class CppKeybindingContext implements KeybindingContext {
    protected readonly editorService: EditorManager;
    constructor(editorService: EditorManager);
    id: string;
    isEnabled(arg?: Keybinding): boolean;
}
export declare class CppKeybindingContribution implements KeybindingContribution {
    protected readonly cppKeybindingContext: CppKeybindingContext;
    constructor(cppKeybindingContext: CppKeybindingContext);
    registerKeybindings(registry: KeybindingRegistry): void;
}
