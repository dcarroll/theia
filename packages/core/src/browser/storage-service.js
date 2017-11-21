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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var logger_1 = require("../common/logger");
exports.StorageService = Symbol('IStorageService');
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(logger) {
        this.logger = logger;
        if (typeof window !== 'undefined' && window.localStorage) {
            this.storage = window.localStorage;
        }
        else {
            logger.warn(function (log) { return log("The browser doesn't support localStorage. state will not be persisted across sessions."); });
            this.storage = {};
        }
    }
    LocalStorageService.prototype.setData = function (key, data) {
        if (data !== undefined) {
            this.storage[this.prefix(key)] = JSON.stringify(data);
        }
        else {
            delete this.storage[this.prefix(key)];
        }
        return Promise.resolve();
    };
    LocalStorageService.prototype.getData = function (key, defaultValue) {
        var result = this.storage[this.prefix(key)];
        if (result === undefined) {
            return Promise.resolve(defaultValue);
        }
        return Promise.resolve(JSON.parse(result));
    };
    LocalStorageService.prototype.prefix = function (key) {
        return 'theia:' + key;
    };
    LocalStorageService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(logger_1.ILogger)),
        __metadata("design:paramtypes", [Object])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=storage-service.js.map