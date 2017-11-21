"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var inversify_1 = require("inversify");
exports.ContainerModule = inversify_1.ContainerModule;
var monaco_loader_1 = require("../browser/monaco-loader");
var s = self;
/**
 * We cannot use `FileUri#create` because URIs with file scheme cannot be properly decoded via the AMD loader.
 * So if you have a FS path on Windows: `C:\Users\foo`, then you will get a URI `file:///c%3A/Users/foo` which
 * will be converted into the `c%3A/Users/foo` FS path on Windows by the AMD loader.
 */
var uriFromPath = function (filePath) {
    var pathName = path.resolve(filePath).replace(/\\/g, '/');
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
};
exports.default = monaco_loader_1.loadVsRequire(global)
    .then(function (vsRequire) {
    var baseUrl = uriFromPath(__dirname);
    vsRequire.config({ baseUrl: baseUrl });
    // workaround monaco-css not understanding the environment
    s.module = undefined;
    // workaround monaco-typescript not understanding the environment
    s.process.browser = true;
    return monaco_loader_1.loadMonaco(vsRequire);
})
    .then(function () { return Promise.resolve().then(function () { return require('../browser/monaco-frontend-module'); }); })
    .then(function (module) { return module.default; });
//# sourceMappingURL=monaco-electron-module.js.map