import { EditorManager } from "./editor-manager";
import { KeybindingContext, Keybinding, KeybindingContribution, KeybindingRegistry } from "@theia/core/lib/common/keybinding";
export declare class EditorKeybindingContext implements KeybindingContext {
    protected readonly editorService: EditorManager;
    constructor(editorService: EditorManager);
    id: string;
    isEnabled(arg?: Keybinding): boolean;
}
export declare class EditorKeybindingContribution implements KeybindingContribution {
    protected readonly editorKeybindingContext: EditorKeybindingContext;
    constructor(editorKeybindingContext: EditorKeybindingContext);
    registerKeybindings(registry: KeybindingRegistry): void;
}
