"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var node_1 = require("@theia/languages/lib/node");
var common_1 = require("../common");
/**
 * IF you have go on your machine, `go-langserver` can be installed with the following command:
 * `go get github.com/sourcegraph/go-langserver`
 */
var GoContribution = /** @class */ (function (_super) {
    __extends(GoContribution, _super);
    function GoContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = common_1.GO_LANGUAGE_ID;
        _this.name = common_1.GO_LANGUAGE_NAME;
        return _this;
    }
    GoContribution.prototype.start = function (clientConnection) {
        // TODO: go-langserver has to be on PATH, this should be a preference.
        var command = 'go-langserver';
        var args = [];
        var serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    };
    GoContribution.prototype.onDidFailSpawnProcess = function (error) {
        _super.prototype.onDidFailSpawnProcess.call(this, error);
        console.error("Error starting go language server.");
        console.error("Please make sure it is installed on your system.");
        console.error("Use the following command: 'go get github.com/sourcegraph/go-langserver'");
    };
    GoContribution = __decorate([
        inversify_1.injectable()
    ], GoContribution);
    return GoContribution;
}(node_1.BaseLanguageServerContribution));
exports.GoContribution = GoContribution;
//# sourceMappingURL=go-contribution.js.map