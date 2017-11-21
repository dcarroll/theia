"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var file_search_service_impl_1 = require("./file-search-service-impl");
var file_search_service_1 = require("../common/file-search-service");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(file_search_service_1.FileSearchService).to(file_search_service_impl_1.FileSearchServiceImpl).inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(file_search_service_1.fileSearchServicePath, function () {
            return ctx.container.get(file_search_service_1.FileSearchService);
        });
    }).inSingletonScope();
});
//# sourceMappingURL=file-search-backend-module.js.map