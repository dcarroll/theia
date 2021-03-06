"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var connection_1 = require("./connection");
exports.messagingFrontendModule = new inversify_1.ContainerModule(function (bind) {
    bind(connection_1.WebSocketConnectionProvider).toSelf().inSingletonScope();
});
//# sourceMappingURL=messaging-frontend-module.js.map