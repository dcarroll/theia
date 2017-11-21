"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("./os");
exports.AcceleratorProvider = Symbol("AcceleratorProvider");
/**
 * Representation of a platform independent key code.
 */
var KeyCode = /** @class */ (function () {
    // TODO: support chrods properly. Currently, second sequence is ignored.
    function KeyCode(keystroke) {
        this.keystroke = keystroke;
        // const chord = ((secondSequence & 0x0000ffff) << 16) >>> 0;
        // (firstSequence | chord) >>> 0;
        var parts = keystroke.split('+');
        this.key = Key.getKey(parts[0]);
        if (os_1.isOSX) {
            this.meta = parts.some(function (part) { return part === Modifier.M1; });
            this.shift = parts.some(function (part) { return part === Modifier.M2; });
            this.alt = parts.some(function (part) { return part === Modifier.M3; });
            this.ctrl = parts.some(function (part) { return part === Modifier.M4; });
        }
        else {
            this.meta = false;
            this.ctrl = parts.some(function (part) { return part === Modifier.M1; });
            this.shift = parts.some(function (part) { return part === Modifier.M2; });
            this.alt = parts.some(function (part) { return part === Modifier.M3; });
        }
    }
    KeyCode.createKeyCode = function (event) {
        if (event instanceof KeyboardEvent) {
            var code = KeyCode.toCode(event);
            var sequence = [];
            if (!Key.isModifier(code)) {
                sequence.push(code);
            }
            // CTRL + COMMAND (M1)
            if ((os_1.isOSX && event.metaKey) || event.ctrlKey) {
                sequence.push("" + Modifier.M1);
            }
            // SHIFT (M2)
            if (event.shiftKey) {
                sequence.push("" + Modifier.M2);
            }
            // ALT (M3)
            if (event.altKey) {
                sequence.push("" + Modifier.M3);
            }
            // CTRL on MacOS X (M4)
            if (os_1.isOSX && !event.metaKey && event.ctrlKey) {
                sequence.push("" + Modifier.M4);
            }
            return new KeyCode(sequence.join('+'));
        }
        else {
            return new KeyCode([event.first.code]
                .concat((event.modifiers || []).sort().map(function (modifier) { return "" + modifier; }))
                .join('+'));
        }
    };
    KeyCode.toCode = function (event) {
        if (event.keyCode) {
            var key = Key.getKey(event.keyCode);
            if (key) {
                return key.code;
            }
        }
        if (event.code) {
            return event.code;
        }
        // tslint:disable-next-line:no-any
        var e = event;
        if (e.keyIdentifier) {
            return e.keyIdentifier;
        }
        if (event.which) {
            var key = Key.getKey(event.which);
            if (key) {
                return key.code;
            }
        }
        throw new Error("Cannot get key code from the keyboard event: " + event + ".");
    };
    KeyCode.prototype.equals = function (event) {
        return (event instanceof KeyCode ? event : KeyCode.createKeyCode(event)).keystroke === this.keystroke;
    };
    return KeyCode;
}());
exports.KeyCode = KeyCode;
var Modifier;
(function (Modifier) {
    /**
     * M1 is the COMMAND key on MacOS X, and the CTRL key on most other platforms.
     */
    Modifier["M1"] = "M1";
    /**
     * M2 is the SHIFT key.
     */
    Modifier["M2"] = "M2";
    /**
     * M3 is the Option key on MacOS X, and the ALT key on most other platforms.
     */
    Modifier["M3"] = "M3";
    /**
     * M4 is the CTRL key on MacOS X, and is undefined on other platforms.
     */
    Modifier["M4"] = "M4";
})(Modifier = exports.Modifier || (exports.Modifier = {}));
var CODE_TO_KEY = {};
var KEY_CODE_TO_KEY = {};
var MODIFIERS = [];
var Key;
(function (Key) {
    function isKey(arg) {
        return arg.code !== undefined && arg.keyCode !== undefined;
    }
    Key.isKey = isKey;
    function getKey(arg) {
        if (typeof arg === "number") {
            return KEY_CODE_TO_KEY[arg] || {
                code: 'unknown',
                keyCode: arg
            };
        }
        else {
            return CODE_TO_KEY[arg];
        }
    }
    Key.getKey = getKey;
    function isModifier(arg) {
        if (typeof arg === "number") {
            return MODIFIERS.map(function (key) { return key.keyCode; }).indexOf(arg) > 0;
        }
        return MODIFIERS.map(function (key) { return key.code; }).indexOf(arg) > 0;
    }
    Key.isModifier = isModifier;
    Key.ENTER = { code: "Enter", keyCode: 13 };
    Key.SPACE = { code: "Space", keyCode: 32 };
    Key.TAB = { code: "Tab", keyCode: 9 };
    Key.BACKSPACE = { code: "Backspace", keyCode: 8 };
    Key.DELETE = { code: "Delete", keyCode: 46 };
    Key.END = { code: "End", keyCode: 35 };
    Key.HOME = { code: "Home", keyCode: 36 };
    Key.INSERT = { code: "Insert", keyCode: 45 };
    Key.PAGE_DOWN = { code: "PageDown", keyCode: 34 };
    Key.PAGE_UP = { code: "PageUp", keyCode: 33 };
    Key.ARROW_DOWN = { code: "ArrowDown", keyCode: 40 };
    Key.ARROW_LEFT = { code: "ArrowLeft", keyCode: 37 };
    Key.ARROW_RIGHT = { code: "ArrowRight", keyCode: 39 };
    Key.ARROW_UP = { code: "ArrowUp", keyCode: 38 };
    Key.ESCAPE = { code: "Escape", keyCode: 27 };
    Key.ALT_LEFT = { code: "AltLeft", keyCode: 18 };
    Key.ALT_RIGHT = { code: "AltRight", keyCode: 18 };
    Key.CAPS_LOCK = { code: "CapsLock", keyCode: 20 };
    Key.CONTROL_LEFT = { code: "ControlLeft", keyCode: 17 };
    Key.CONTROL_RIGHT = { code: "ControlRight", keyCode: 17 };
    Key.O_S_LEFT = { code: "OSLeft", keyCode: 91 };
    Key.O_S_RIGHT = { code: "OSRight", keyCode: 92 };
    Key.SHIFT_LEFT = { code: "ShiftLeft", keyCode: 16 };
    Key.SHIFT_RIGHT = { code: "ShiftRight", keyCode: 16 };
    Key.DIGIT1 = { code: "Digit1", keyCode: 49 };
    Key.DIGIT2 = { code: "Digit2", keyCode: 50 };
    Key.DIGIT3 = { code: "Digit3", keyCode: 51 };
    Key.DIGIT4 = { code: "Digit4", keyCode: 52 };
    Key.DIGIT5 = { code: "Digit5", keyCode: 53 };
    Key.DIGIT6 = { code: "Digit6", keyCode: 54 };
    Key.DIGIT7 = { code: "Digit7", keyCode: 55 };
    Key.DIGIT8 = { code: "Digit8", keyCode: 56 };
    Key.DIGIT9 = { code: "Digit9", keyCode: 57 };
    Key.DIGIT0 = { code: "Digit0", keyCode: 48 };
    Key.KEY_A = { code: "KeyA", keyCode: 65 };
    Key.KEY_B = { code: "KeyB", keyCode: 66 };
    Key.KEY_C = { code: "KeyC", keyCode: 67 };
    Key.KEY_D = { code: "KeyD", keyCode: 68 };
    Key.KEY_E = { code: "KeyE", keyCode: 69 };
    Key.KEY_F = { code: "KeyF", keyCode: 70 };
    Key.KEY_G = { code: "KeyG", keyCode: 71 };
    Key.KEY_H = { code: "KeyH", keyCode: 72 };
    Key.KEY_I = { code: "KeyI", keyCode: 73 };
    Key.KEY_J = { code: "KeyJ", keyCode: 74 };
    Key.KEY_K = { code: "KeyK", keyCode: 75 };
    Key.KEY_L = { code: "KeyL", keyCode: 76 };
    Key.KEY_M = { code: "KeyM", keyCode: 77 };
    Key.KEY_N = { code: "KeyN", keyCode: 78 };
    Key.KEY_O = { code: "KeyO", keyCode: 79 };
    Key.KEY_P = { code: "KeyP", keyCode: 80 };
    Key.KEY_Q = { code: "KeyQ", keyCode: 81 };
    Key.KEY_R = { code: "KeyR", keyCode: 82 };
    Key.KEY_S = { code: "KeyS", keyCode: 83 };
    Key.KEY_T = { code: "KeyT", keyCode: 84 };
    Key.KEY_U = { code: "KeyU", keyCode: 85 };
    Key.KEY_V = { code: "KeyV", keyCode: 86 };
    Key.KEY_W = { code: "KeyW", keyCode: 87 };
    Key.KEY_X = { code: "KeyX", keyCode: 88 };
    Key.KEY_Y = { code: "KeyY", keyCode: 89 };
    Key.KEY_Z = { code: "KeyZ", keyCode: 90 };
    Key.F1 = { code: "F1", keyCode: 112 };
    Key.F2 = { code: "F2", keyCode: 113 };
    Key.F3 = { code: "F3", keyCode: 114 };
    Key.F4 = { code: "F4", keyCode: 115 };
    Key.F5 = { code: "F5", keyCode: 116 };
    Key.F6 = { code: "F6", keyCode: 117 };
    Key.F7 = { code: "F7", keyCode: 118 };
    Key.F8 = { code: "F8", keyCode: 119 };
    Key.F9 = { code: "F9", keyCode: 120 };
    Key.F10 = { code: "F10", keyCode: 121 };
    Key.F11 = { code: "F11", keyCode: 122 };
    Key.F12 = { code: "F12", keyCode: 123 };
    Key.F13 = { code: "F13", keyCode: 124 };
    Key.F14 = { code: "F14", keyCode: 125 };
    Key.F15 = { code: "F15", keyCode: 126 };
    Key.F16 = { code: "F16", keyCode: 127 };
    Key.F17 = { code: "F17", keyCode: 128 };
    Key.F18 = { code: "F18", keyCode: 129 };
    Key.F19 = { code: "F19", keyCode: 130 };
    Key.F20 = { code: "F20", keyCode: 131 };
    Key.F21 = { code: "F21", keyCode: 132 };
    Key.F22 = { code: "F22", keyCode: 133 };
    Key.F23 = { code: "F23", keyCode: 134 };
    Key.F24 = { code: "F24", keyCode: 135 };
    Key.COMMA = { code: "Comma", keyCode: 188 };
    Key.PERIOD = { code: "Period", keyCode: 190 };
    Key.SLASH = { code: "Slash", keyCode: 191 };
    Key.SEMICOLON = { code: "Semicolon", keyCode: 186 };
    Key.QUOTE = { code: "Quote", keyCode: 222 };
    Key.BRACKET_LEFT = { code: "BracketLeft", keyCode: 219 };
    Key.BRACKET_RIGHT = { code: "BracketRight", keyCode: 221 };
    Key.BACKQUOTE = { code: "Backquote", keyCode: 192 };
    Key.BACKSLASH = { code: "Backslash", keyCode: 220 };
    Key.MINUS = { code: "Minus", keyCode: 189 };
    Key.EQUAL = { code: "Equal", keyCode: 187 };
    Key.INTL_RO = { code: "IntlRo", keyCode: 193 };
    Key.INTL_YEN = { code: "IntlYen", keyCode: 255 };
})(Key = exports.Key || (exports.Key = {}));
(function () {
    Object.keys(Key).map(function (prop) { return Reflect.get(Key, prop); }).filter(function (key) { return Key.isKey(key); }).forEach(function (key) {
        CODE_TO_KEY[key.code] = key;
        KEY_CODE_TO_KEY[key.keyCode] = key;
    });
    MODIFIERS.push.apply(MODIFIERS, __spread([Key.ALT_LEFT, Key.ALT_RIGHT, Key.CONTROL_LEFT, Key.CONTROL_RIGHT, Key.O_S_LEFT, Key.O_S_RIGHT, Key.SHIFT_LEFT, Key.SHIFT_RIGHT]));
})();
//# sourceMappingURL=keys.js.map