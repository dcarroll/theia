export declare type Accelerator = string[];
export declare const AcceleratorProvider: symbol;
export interface AcceleratorProvider {
    getAccelerator(keyCode: KeyCode): Accelerator;
}
/**
 * The key sequence for this binding. This key sequence should consist of one or more key strokes. Key strokes
 * consist of one or more keys held down at the same time. This should be zero or more modifier keys, and one other key.
 * Since `M2+M3+<Key>` (Alt+Shift+<Key>) is reserved on MacOS X for writing special characters, such bindings are commonly
 * undefined for platform MacOS X and redefined as `M1+M3+<Key>`. The rule applies on the `M3+M2+<Key>` sequence.
 */
export declare type Keystroke = {
    first: Key;
    modifiers?: Modifier[];
};
/**
 * Representation of a platform independent key code.
 */
export declare class KeyCode {
    readonly keystroke: string;
    readonly key: Key;
    readonly ctrl: boolean;
    readonly shift: boolean;
    readonly alt: boolean;
    readonly meta: boolean;
    private constructor();
    static createKeyCode(event: KeyboardEvent | Keystroke): KeyCode;
    static toCode(event: KeyboardEvent): string;
    equals(event: KeyboardEvent | KeyCode): boolean;
}
export declare enum Modifier {
    /**
     * M1 is the COMMAND key on MacOS X, and the CTRL key on most other platforms.
     */
    M1 = "M1",
    /**
     * M2 is the SHIFT key.
     */
    M2 = "M2",
    /**
     * M3 is the Option key on MacOS X, and the ALT key on most other platforms.
     */
    M3 = "M3",
    /**
     * M4 is the CTRL key on MacOS X, and is undefined on other platforms.
     */
    M4 = "M4",
}
export declare type Key = {
    readonly code: string;
    readonly keyCode: number;
};
export declare namespace Key {
    function isKey(arg: any): arg is Key;
    function getKey(arg: string | number): Key;
    function isModifier(arg: string | number): boolean;
    const ENTER: Key;
    const SPACE: Key;
    const TAB: Key;
    const BACKSPACE: Key;
    const DELETE: Key;
    const END: Key;
    const HOME: Key;
    const INSERT: Key;
    const PAGE_DOWN: Key;
    const PAGE_UP: Key;
    const ARROW_DOWN: Key;
    const ARROW_LEFT: Key;
    const ARROW_RIGHT: Key;
    const ARROW_UP: Key;
    const ESCAPE: Key;
    const ALT_LEFT: Key;
    const ALT_RIGHT: Key;
    const CAPS_LOCK: Key;
    const CONTROL_LEFT: Key;
    const CONTROL_RIGHT: Key;
    const O_S_LEFT: Key;
    const O_S_RIGHT: Key;
    const SHIFT_LEFT: Key;
    const SHIFT_RIGHT: Key;
    const DIGIT1: Key;
    const DIGIT2: Key;
    const DIGIT3: Key;
    const DIGIT4: Key;
    const DIGIT5: Key;
    const DIGIT6: Key;
    const DIGIT7: Key;
    const DIGIT8: Key;
    const DIGIT9: Key;
    const DIGIT0: Key;
    const KEY_A: Key;
    const KEY_B: Key;
    const KEY_C: Key;
    const KEY_D: Key;
    const KEY_E: Key;
    const KEY_F: Key;
    const KEY_G: Key;
    const KEY_H: Key;
    const KEY_I: Key;
    const KEY_J: Key;
    const KEY_K: Key;
    const KEY_L: Key;
    const KEY_M: Key;
    const KEY_N: Key;
    const KEY_O: Key;
    const KEY_P: Key;
    const KEY_Q: Key;
    const KEY_R: Key;
    const KEY_S: Key;
    const KEY_T: Key;
    const KEY_U: Key;
    const KEY_V: Key;
    const KEY_W: Key;
    const KEY_X: Key;
    const KEY_Y: Key;
    const KEY_Z: Key;
    const F1: Key;
    const F2: Key;
    const F3: Key;
    const F4: Key;
    const F5: Key;
    const F6: Key;
    const F7: Key;
    const F8: Key;
    const F9: Key;
    const F10: Key;
    const F11: Key;
    const F12: Key;
    const F13: Key;
    const F14: Key;
    const F15: Key;
    const F16: Key;
    const F17: Key;
    const F18: Key;
    const F19: Key;
    const F20: Key;
    const F21: Key;
    const F22: Key;
    const F23: Key;
    const F24: Key;
    const COMMA: Key;
    const PERIOD: Key;
    const SLASH: Key;
    const SEMICOLON: Key;
    const QUOTE: Key;
    const BRACKET_LEFT: Key;
    const BRACKET_RIGHT: Key;
    const BACKQUOTE: Key;
    const BACKSLASH: Key;
    const MINUS: Key;
    const EQUAL: Key;
    const INTL_RO: Key;
    const INTL_YEN: Key;
}
