"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
exports.TextDocumentSaveReason = vscode_languageserver_types_1.TextDocumentSaveReason;
var common_1 = require("@theia/core/lib/common");
var MonacoEditorModel = /** @class */ (function () {
    function MonacoEditorModel(resource, m2p, p2m) {
        var _this = this;
        this.resource = resource;
        this.m2p = m2p;
        this.p2m = p2m;
        this.autoSave = 'on';
        this.autoSaveDelay = 500;
        this.toDispose = new common_1.DisposableCollection();
        this.toDisposeOnAutoSave = new common_1.DisposableCollection();
        this.onDidSaveModelEmitter = new common_1.Emitter();
        this.onWillSaveModelEmitter = new common_1.Emitter();
        this._dirty = false;
        this.onDirtyChangedEmitter = new common_1.Emitter();
        this.synchronizing = false;
        this.toDispose.push(resource);
        this.toDispose.push(this.toDisposeOnAutoSave);
        this.toDispose.push(this.onDidSaveModelEmitter);
        this.toDispose.push(this.onWillSaveModelEmitter);
        this.toDispose.push(this.onDirtyChangedEmitter);
        this.resolveModel = resource.readContents().then(function (content) { return _this.initialize(content); });
    }
    MonacoEditorModel.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    /**
     * #### Important
     * Only this method can create an instance of `monaco.editor.IModel`,
     * there should not be other calls to `monaco.editor.createModel`.
     */
    MonacoEditorModel.prototype.initialize = function (content) {
        var _this = this;
        if (!this.toDispose.disposed) {
            this.model = monaco.editor.createModel(content, undefined, monaco.Uri.parse(this.resource.uri.toString()));
            this.toDispose.push(this.model);
            this.toDispose.push(this.model.onDidChangeContent(function (event) { return _this.markAsDirty(); }));
            if (this.resource.onDidChangeContents) {
                this.toDispose.push(this.resource.onDidChangeContents(function () { return _this.sync(); }));
            }
        }
    };
    Object.defineProperty(MonacoEditorModel.prototype, "dirty", {
        get: function () {
            return this._dirty;
        },
        enumerable: true,
        configurable: true
    });
    MonacoEditorModel.prototype.setDirty = function (dirty) {
        this._dirty = dirty;
        this.onDirtyChangedEmitter.fire(undefined);
    };
    Object.defineProperty(MonacoEditorModel.prototype, "onDirtyChanged", {
        get: function () {
            return this.onDirtyChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "uri", {
        get: function () {
            return this.model.uri.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "languageId", {
        get: function () {
            return this.model.getModeId();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "version", {
        get: function () {
            return this.model.getVersionId();
        },
        enumerable: true,
        configurable: true
    });
    MonacoEditorModel.prototype.getText = function () {
        return this.model.getValue();
    };
    MonacoEditorModel.prototype.positionAt = function (offset) {
        var _a = this.model.getPositionAt(offset), lineNumber = _a.lineNumber, column = _a.column;
        return this.m2p.asPosition(lineNumber, column);
    };
    MonacoEditorModel.prototype.offsetAt = function (position) {
        return this.model.getOffsetAt(this.p2m.asPosition(position));
    };
    Object.defineProperty(MonacoEditorModel.prototype, "lineCount", {
        get: function () {
            return this.model.getLineCount();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "readOnly", {
        get: function () {
            return this.resource.saveContents === undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "onDispose", {
        get: function () {
            return this.toDispose.onDispose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "textEditorModel", {
        get: function () {
            return this.model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "onWillSaveModel", {
        get: function () {
            return this.onWillSaveModelEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditorModel.prototype, "onDidSaveModel", {
        get: function () {
            return this.onDidSaveModelEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MonacoEditorModel.prototype.load = function () {
        var _this = this;
        return monaco.Promise.wrap(this.resolveModel).then(function () { return _this; });
    };
    MonacoEditorModel.prototype.save = function () {
        return this.doSave(vscode_languageserver_types_1.TextDocumentSaveReason.Manual);
    };
    MonacoEditorModel.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newText, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._dirty) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resource.readContents()];
                    case 1:
                        newText = _a.sent();
                        if (!this._dirty) {
                            value = this.model.getValue();
                            if (value !== newText) {
                                this.synchronizing = true;
                                try {
                                    this.model.applyEdits([this.p2m.asTextEdit({
                                            range: this.m2p.asRange(this.model.getFullModelRange()),
                                            newText: newText
                                        })]);
                                }
                                finally {
                                    this.synchronizing = false;
                                }
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.markAsDirty = function () {
        if (!this.synchronizing) {
            this.setDirty(true);
            this.doAutoSave();
        }
    };
    MonacoEditorModel.prototype.doAutoSave = function () {
        var _this = this;
        if (this.autoSave === 'on') {
            this.toDisposeOnAutoSave.dispose();
            var handle_1 = window.setTimeout(function () {
                _this.doSave(vscode_languageserver_types_1.TextDocumentSaveReason.AfterDelay);
            }, this.autoSaveDelay);
            this.toDisposeOnAutoSave.push(common_1.Disposable.create(function () {
                return window.clearTimeout(handle_1);
            }));
        }
    };
    MonacoEditorModel.prototype.doSave = function (reason) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.resource.saveContents) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fireWillSaveModel(reason)];
                    case 1:
                        _a.sent();
                        if (!this.dirty) return [3 /*break*/, 3];
                        content = this.model.getValue();
                        return [4 /*yield*/, this.resource.saveContents(content)];
                    case 2:
                        _a.sent();
                        this.setDirty(false);
                        _a.label = 3;
                    case 3:
                        this.onDidSaveModelEmitter.fire(this.model);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MonacoEditorModel.prototype.fireWillSaveModel = function (reason) {
        var _this = this;
        var model = this.model;
        return new Promise(function (resolve) {
            _this.onWillSaveModelEmitter.fire({
                model: model, reason: reason,
                waitUntil: function (thenable) {
                    return thenable.then(function (operations) {
                        model.applyEdits(operations);
                        resolve();
                    });
                }
            });
        });
    };
    MonacoEditorModel.prototype.fireDidSaveModel = function () {
        this.onDidSaveModelEmitter.fire(this.model);
    };
    return MonacoEditorModel;
}());
exports.MonacoEditorModel = MonacoEditorModel;
//# sourceMappingURL=monaco-editor-model.js.map