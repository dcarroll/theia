"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileIcons = require("file-icons-js");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
require("file-icons-js/css/style.css");
var FileIconProvider = /** @class */ (function () {
    function FileIconProvider() {
    }
    FileIconProvider.prototype.getFileIconForURI = function (uri) {
        var iconClass = fileIcons.getClass(uri.path.toString()) || 'fa fa-file';
        return iconClass + " file-icon";
    };
    FileIconProvider.prototype.getFileIconForStat = function (stat) {
        if (stat.isDirectory) {
            return "fa fa-folder file-icon";
        }
        var uri = new uri_1.default(stat.uri);
        return this.getFileIconForURI(uri);
    };
    FileIconProvider = __decorate([
        inversify_1.injectable()
    ], FileIconProvider);
    return FileIconProvider;
}());
exports.FileIconProvider = FileIconProvider;
//# sourceMappingURL=file-icons.js.map