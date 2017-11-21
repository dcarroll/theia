"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
var ClassFileContentsRequest;
(function (ClassFileContentsRequest) {
    ClassFileContentsRequest.type = new vscode_jsonrpc_1.RequestType('java/classFileContents');
})(ClassFileContentsRequest = exports.ClassFileContentsRequest || (exports.ClassFileContentsRequest = {}));
var ActionableNotification;
(function (ActionableNotification) {
    ActionableNotification.type = new vscode_jsonrpc_1.NotificationType('language/actionableNotification');
})(ActionableNotification = exports.ActionableNotification || (exports.ActionableNotification = {}));
//# sourceMappingURL=java-protocol.js.map