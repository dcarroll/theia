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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var monaco_languageclient_1 = require("monaco-languageclient");
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/editor/lib/browser");
var monaco_editor_model_1 = require("./monaco-editor-model");
var MonacoTextModelService = /** @class */ (function () {
    function MonacoTextModelService(resourceProvider, editorPreferences, m2p, p2m) {
        this.resourceProvider = resourceProvider;
        this.editorPreferences = editorPreferences;
        this.m2p = m2p;
        this.p2m = p2m;
        this.models = new Map();
        this.references = new Map();
        this.modelOptions = {
            'editor.tabSize': 'tabSize'
        };
    }
    MonacoTextModelService.prototype.createModelReference = function (raw) {
        var _this = this;
        var uri = raw instanceof uri_1.default ? raw : new uri_1.default(raw.toString());
        return this.getOrCreateModel(uri).then(function (model) {
            return _this.newReference(model);
        });
    };
    MonacoTextModelService.prototype.newReference = function (model) {
        var _this = this;
        var references = this.references.get(model);
        if (references === undefined) {
            references = new common_1.DisposableCollection();
            references.onDispose(function () { return model.dispose(); });
            model.onDispose(function () {
                _this.references.delete(model);
                references.dispose();
            });
            this.references.set(model, references);
        }
        var removeReference;
        var reference = {
            object: model,
            dispose: function () {
                return removeReference.dispose();
            }
        };
        removeReference = references.push(reference);
        return reference;
    };
    MonacoTextModelService.prototype.getOrCreateModel = function (uri) {
        var _this = this;
        var key = uri.toString();
        var model = this.models.get(key);
        if (model) {
            return model;
        }
        var newModel = this.createModel(uri);
        this.models.set(key, newModel);
        newModel.then(function (m) { return m.onDispose(function () { return _this.models.delete(key); }); });
        return newModel;
    };
    MonacoTextModelService.prototype.createModel = function (uri) {
        return monaco.Promise.wrap(this.loadModel(uri));
    };
    MonacoTextModelService.prototype.loadModel = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var resource, model, disposable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editorPreferences.ready];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resourceProvider(uri)];
                    case 2:
                        resource = _a.sent();
                        return [4 /*yield*/, (new monaco_editor_model_1.MonacoEditorModel(resource, this.m2p, this.p2m).load())];
                    case 3:
                        model = _a.sent();
                        model.autoSave = this.editorPreferences["editor.autoSave"];
                        model.autoSaveDelay = this.editorPreferences["editor.autoSaveDelay"];
                        model.textEditorModel.updateOptions(this.getModelOptions());
                        disposable = this.editorPreferences.onPreferenceChanged(function (change) { return _this.updateModel(model, change); });
                        model.onDispose(function () { return disposable.dispose(); });
                        return [2 /*return*/, model];
                }
            });
        });
    };
    MonacoTextModelService.prototype.updateModel = function (model, change) {
        if (change.preferenceName === "editor.autoSave") {
            model.autoSave = this.editorPreferences["editor.autoSave"];
        }
        if (change.preferenceName === "editor.autoSaveDelay") {
            model.autoSaveDelay = this.editorPreferences["editor.autoSaveDelay"];
        }
        var modelOption = this.modelOptions[change.preferenceName];
        if (modelOption) {
            var options = {};
            // tslint:disable-next-line:no-any
            options[modelOption] = change.newValue;
            model.textEditorModel.updateOptions(options);
        }
    };
    MonacoTextModelService.prototype.getModelOptions = function () {
        return {
            tabSize: this.editorPreferences["editor.tabSize"]
        };
    };
    MonacoTextModelService.prototype.registerTextModelContentProvider = function (scheme, provider) {
        return {
            dispose: function () {
                // no-op
            }
        };
    };
    MonacoTextModelService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ResourceProvider)),
        __param(1, inversify_1.inject(browser_1.EditorPreferences)),
        __param(2, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __param(3, inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter)),
        __metadata("design:paramtypes", [Function, Object, monaco_languageclient_1.MonacoToProtocolConverter,
            monaco_languageclient_1.ProtocolToMonacoConverter])
    ], MonacoTextModelService);
    return MonacoTextModelService;
}());
exports.MonacoTextModelService = MonacoTextModelService;
//# sourceMappingURL=monaco-text-model-service.js.map