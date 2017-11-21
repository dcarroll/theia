"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
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
var monaco_languageclient_1 = require("monaco-languageclient");
var problem_manager_1 = require("@theia/markers/lib/browser/problem/problem-manager");
var uri_1 = require("@theia/core/lib/common/uri");
inversify_1.decorate(inversify_1.injectable(), monaco_languageclient_1.MonacoLanguages);
inversify_1.decorate(inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter), monaco_languageclient_1.MonacoLanguages, 0);
inversify_1.decorate(inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter), monaco_languageclient_1.MonacoLanguages, 1);
var MonacoLanguages = /** @class */ (function (_super) {
    __extends(MonacoLanguages, _super);
    function MonacoLanguages(p2m, m2p, problemManager) {
        var _this = _super.call(this, p2m, m2p) || this;
        _this.problemManager = problemManager;
        _this.workspaceSymbolProviders = [];
        return _this;
    }
    MonacoLanguages.prototype.createDiagnosticCollection = function (name) {
        var _this = this;
        // FIXME: Monaco model markers should be created based on Theia problem markers
        var monacoCollection = _super.prototype.createDiagnosticCollection.call(this, name);
        var owner = name || 'default';
        var uris = [];
        return {
            set: function (uri, diagnostics) {
                monacoCollection.set(uri, diagnostics);
                _this.problemManager.setMarkers(new uri_1.default(uri), owner, diagnostics);
                uris.push(uri);
            },
            dispose: function () {
                monacoCollection.dispose();
                try {
                    for (var uris_1 = __values(uris), uris_1_1 = uris_1.next(); !uris_1_1.done; uris_1_1 = uris_1.next()) {
                        var uri = uris_1_1.value;
                        _this.problemManager.setMarkers(new uri_1.default(uri), owner, []);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (uris_1_1 && !uris_1_1.done && (_a = uris_1.return)) _a.call(uris_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var e_1, _a;
            }
        };
    };
    MonacoLanguages.prototype.registerWorkspaceSymbolProvider = function (provider) {
        var _this = this;
        this.workspaceSymbolProviders.push(provider);
        return {
            dispose: function () {
                var index = _this.workspaceSymbolProviders.indexOf(provider);
                _this.workspaceSymbolProviders = _this.workspaceSymbolProviders.splice(index, 1);
            }
        };
    };
    Object.defineProperty(MonacoLanguages.prototype, "languages", {
        get: function () {
            var monacoLanguages = monaco.languages.getLanguages();
            return monacoLanguages.map(function (monacoLang) { return ({
                id: monacoLang.id,
                name: monacoLang.aliases && monacoLang.aliases.length > 0 ? monacoLang.aliases[0] : monacoLang.id
            }); });
        },
        enumerable: true,
        configurable: true
    });
    MonacoLanguages = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter)),
        __param(1, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __param(2, inversify_1.inject(problem_manager_1.ProblemManager)),
        __metadata("design:paramtypes", [monaco_languageclient_1.ProtocolToMonacoConverter,
            monaco_languageclient_1.MonacoToProtocolConverter,
            problem_manager_1.ProblemManager])
    ], MonacoLanguages);
    return MonacoLanguages;
}(monaco_languageclient_1.MonacoLanguages));
exports.MonacoLanguages = MonacoLanguages;
//# sourceMappingURL=monaco-languages.js.map