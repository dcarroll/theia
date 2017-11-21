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
var inversify_1 = require("inversify");
var QuickOpenOptions;
(function (QuickOpenOptions) {
    QuickOpenOptions.defaultOptions = Object.freeze({
        prefix: '',
        placeholder: '',
        fuzzyMatchLabel: false,
        fuzzyMatchDetail: false,
        fuzzyMatchDescription: false,
        fuzzySort: false,
        onClose: function () { }
    });
    function resolve(options, source) {
        if (options === void 0) { options = {}; }
        if (source === void 0) { source = QuickOpenOptions.defaultOptions; }
        return Object.assign({}, source, options);
    }
    QuickOpenOptions.resolve = resolve;
})(QuickOpenOptions = exports.QuickOpenOptions || (exports.QuickOpenOptions = {}));
var QuickOpenService = /** @class */ (function () {
    function QuickOpenService() {
    }
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    QuickOpenService.prototype.open = function (model, options) {
        // no-op
    };
    QuickOpenService = __decorate([
        inversify_1.injectable()
    ], QuickOpenService);
    return QuickOpenService;
}());
exports.QuickOpenService = QuickOpenService;
//# sourceMappingURL=quick-open-service.js.map