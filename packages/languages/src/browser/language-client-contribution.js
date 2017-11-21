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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../common");
var language_client_factory_1 = require("./language-client-factory");
exports.LanguageClientContribution = Symbol('LanguageClientContribution');
var BaseLanguageClientContribution = /** @class */ (function () {
    function BaseLanguageClientContribution(workspace, languages, languageClientFactory) {
        this.workspace = workspace;
        this.languages = languages;
        this.languageClientFactory = languageClientFactory;
        this.waitForReady();
    }
    Object.defineProperty(BaseLanguageClientContribution.prototype, "languageClient", {
        get: function () {
            return this._languageClient ? Promise.resolve(this._languageClient) : this.ready;
        },
        enumerable: true,
        configurable: true
    });
    BaseLanguageClientContribution.prototype.waitForActivation = function (app) {
        var documentSelector = this.documentSelector;
        if (documentSelector) {
            return Promise.all([
                this.workspace.ready,
                this.waitForOpenTextDocument(documentSelector)
            ]);
        }
        return this.workspace.ready;
    };
    BaseLanguageClientContribution.prototype.activate = function () {
        var languageClient = this.createLanguageClient();
        this.onWillStart(languageClient);
        return languageClient.start();
    };
    BaseLanguageClientContribution.prototype.onWillStart = function (languageClient) {
        var _this = this;
        languageClient.onReady().then(function () { return _this.onReady(languageClient); });
    };
    BaseLanguageClientContribution.prototype.onReady = function (languageClient) {
        this._languageClient = languageClient;
        this.resolveReady(this._languageClient);
        this.waitForReady();
    };
    BaseLanguageClientContribution.prototype.waitForReady = function () {
        var _this = this;
        this.ready = new Promise(function (resolve) {
            return _this.resolveReady = resolve;
        });
    };
    BaseLanguageClientContribution.prototype.createLanguageClient = function () {
        var clientOptions = this.createOptions();
        return this.languageClientFactory.get(this, clientOptions);
    };
    BaseLanguageClientContribution.prototype.createOptions = function () {
        var fileEvents = this.createFileEvents();
        return {
            documentSelector: this.documentSelector,
            synchronize: { fileEvents: fileEvents }
        };
    };
    Object.defineProperty(BaseLanguageClientContribution.prototype, "documentSelector", {
        get: function () {
            return [this.id];
        },
        enumerable: true,
        configurable: true
    });
    BaseLanguageClientContribution.prototype.createFileEvents = function () {
        var watchers = [];
        if (this.workspace.createFileSystemWatcher) {
            try {
                for (var _a = __values(this.globPatterns), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var globPattern = _b.value;
                    watchers.push(this.workspace.createFileSystemWatcher(globPattern));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return watchers;
        var e_1, _c;
    };
    Object.defineProperty(BaseLanguageClientContribution.prototype, "globPatterns", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    // FIXME move it to the workspace
    BaseLanguageClientContribution.prototype.waitForOpenTextDocument = function (selector) {
        var _this = this;
        var document = this.workspace.textDocuments.filter(function (document) {
            return _this.languages.match(selector, document);
        })[0];
        if (document !== undefined) {
            return Promise.resolve(document);
        }
        return new Promise(function (resolve) {
            var disposable = _this.workspace.onDidOpenTextDocument(function (document) {
                if (_this.languages.match(selector, document)) {
                    disposable.dispose();
                    resolve(document);
                }
            });
        });
    };
    BaseLanguageClientContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.Workspace)),
        __param(1, inversify_1.inject(common_1.Languages)),
        __param(2, inversify_1.inject(language_client_factory_1.LanguageClientFactory)),
        __metadata("design:paramtypes", [Object, Object, language_client_factory_1.LanguageClientFactory])
    ], BaseLanguageClientContribution);
    return BaseLanguageClientContribution;
}());
exports.BaseLanguageClientContribution = BaseLanguageClientContribution;
//# sourceMappingURL=language-client-contribution.js.map