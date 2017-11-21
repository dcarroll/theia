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
var common_1 = require("../common");
var java_protocol_1 = require("./java-protocol");
var java_client_contribution_1 = require("./java-client-contribution");
var JavaResource = /** @class */ (function () {
    function JavaResource(uri, clientContribution) {
        this.uri = uri;
        this.clientContribution = clientContribution;
    }
    JavaResource.prototype.dispose = function () {
    };
    JavaResource.prototype.readContents = function (options) {
        var uri = this.uri.toString();
        return this.clientContribution.languageClient.then(function (languageClient) {
            return languageClient.sendRequest(java_protocol_1.ClassFileContentsRequest.type, { uri: uri }).then(function (content) {
                return content || '';
            });
        });
    };
    return JavaResource;
}());
exports.JavaResource = JavaResource;
var JavaResourceResolver = /** @class */ (function () {
    function JavaResourceResolver(clientContribution) {
        this.clientContribution = clientContribution;
    }
    JavaResourceResolver.prototype.resolve = function (uri) {
        if (uri.scheme !== common_1.JAVA_SCHEME) {
            throw new Error("The given uri is not a java uri: " + uri);
        }
        return new JavaResource(uri, this.clientContribution);
    };
    JavaResourceResolver = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(java_client_contribution_1.JavaClientContribution)),
        __metadata("design:paramtypes", [java_client_contribution_1.JavaClientContribution])
    ], JavaResourceResolver);
    return JavaResourceResolver;
}());
exports.JavaResourceResolver = JavaResourceResolver;
//# sourceMappingURL=java-resource.js.map