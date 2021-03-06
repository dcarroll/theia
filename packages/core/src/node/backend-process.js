"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BackendProcess;
(function (BackendProcess) {
    /* Running in electron or a childProcess.fork of electron */
    BackendProcess.electron = !!process.versions.electron || process.env.ELECTRON_RUN_AS_NODE;
})(BackendProcess = exports.BackendProcess || (exports.BackendProcess = {}));
//# sourceMappingURL=backend-process.js.map