"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isInDebugMode() {
    if (typeof v8debug === 'object') {
        return true;
    }
    if (process && process.execArgv) {
        return process.execArgv.some(function (arg) {
            return /^--debug=?/.test(arg) || /^--debug-brk=?/.test(arg);
        });
    }
    return false;
}
exports.DEBUG_MODE = isInDebugMode();
//# sourceMappingURL=debug.js.map