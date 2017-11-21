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
var common_1 = require("@theia/core/lib/common");
var common_2 = require("@theia/filesystem/lib/common");
var browser_1 = require("@theia/workspace/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var lang = require("@theia/languages/lib/common");
var common_3 = require("@theia/languages/lib/common");
var monaco_text_model_service_1 = require("./monaco-text-model-service");
var uri_1 = require("@theia/core/lib/common/uri");
inversify_1.decorate(inversify_1.injectable(), monaco_languageclient_1.MonacoWorkspace);
inversify_1.decorate(inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter), monaco_languageclient_1.MonacoWorkspace, 0);
var MonacoWorkspace = /** @class */ (function (_super) {
    __extends(MonacoWorkspace, _super);
    function MonacoWorkspace(fileSystem, workspaceService, fileSystemWatcher, textModelService, m2p, p2m, editorManager) {
        var _this = _super.call(this, p2m, m2p) || this;
        _this.fileSystem = fileSystem;
        _this.workspaceService = workspaceService;
        _this.fileSystemWatcher = fileSystemWatcher;
        _this.textModelService = textModelService;
        _this.m2p = m2p;
        _this.p2m = p2m;
        _this.editorManager = editorManager;
        _this.capabilities = {
            applyEdit: true,
            workspaceEdit: {
                documentChanges: true
            }
        };
        _this.synchronization = {
            didSave: true,
            willSave: true,
            willSaveWaitUntil: true
        };
        _this.ready = new Promise(function (resolve) {
            _this.resolveReady = resolve;
        });
        _this.onWillSaveTextDocumentEmitter = new common_3.Emitter();
        _this.onDidSaveTextDocumentEmitter = new common_3.Emitter();
        workspaceService.root.then(function (rootStat) {
            if (rootStat) {
                _this._rootUri = rootStat.uri;
                _this.resolveReady();
            }
        });
        monaco.editor.onDidCreateModel(function (model) {
            _this.textModelService.createModelReference(model.uri).then(function (reference) {
                reference.object.onDidSaveModel(function (model) {
                    return _this.onDidSaveModel(model);
                });
                reference.object.onWillSaveModel(function (event) {
                    return _this.onWillSaveModel(event);
                });
                reference.dispose();
            });
        });
        return _this;
    }
    Object.defineProperty(MonacoWorkspace.prototype, "rootPath", {
        get: function () {
            return this._rootUri && new uri_1.default(this._rootUri).path.toString();
        },
        enumerable: true,
        configurable: true
    });
    MonacoWorkspace.prototype.getTextDocument = function (uri) {
        return this.documents.get(uri);
    };
    Object.defineProperty(MonacoWorkspace.prototype, "onWillSaveTextDocument", {
        get: function () {
            return this.onWillSaveTextDocumentEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MonacoWorkspace.prototype.onWillSaveModel = function (event) {
        var _this = this;
        var model = event.model, reason = event.reason;
        var textDocument = this.getTextDocument(model.uri.toString());
        if (textDocument) {
            var timeout = new Promise(function (resolve) {
                return setTimeout(function () { return resolve([]); }, 1000);
            });
            var resolveEdits = new Promise(function (resolve) {
                return _this.onWillSaveTextDocumentEmitter.fire({
                    textDocument: textDocument,
                    reason: reason,
                    waitUntil: function (thenable) { return thenable.then(resolve); }
                });
            });
            event.waitUntil(Promise.race([resolveEdits, timeout]).then(function (edits) {
                return _this.p2m.asTextEdits(edits).map(function (edit) { return edit; });
            }));
        }
    };
    Object.defineProperty(MonacoWorkspace.prototype, "onDidSaveTextDocument", {
        get: function () {
            return this.onDidSaveTextDocumentEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MonacoWorkspace.prototype.onDidSaveModel = function (model) {
        var document = this.getTextDocument(model.uri.toString());
        if (document) {
            this.onDidSaveTextDocumentEmitter.fire(document);
        }
    };
    MonacoWorkspace.prototype.createFileSystemWatcher = function (globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
        var disposables = new common_1.DisposableCollection();
        var onFileEventEmitter = new lang.Emitter();
        disposables.push(onFileEventEmitter);
        disposables.push(this.fileSystemWatcher.onFilesChanged(function (changes) {
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    var result = change.type === common_2.FileChangeType.ADDED ? [lang.FileChangeType.Created, ignoreCreateEvents] :
                        change.type === common_2.FileChangeType.UPDATED ? [lang.FileChangeType.Changed, ignoreChangeEvents] :
                            [lang.FileChangeType.Deleted, ignoreDeleteEvents];
                    var type = result[0];
                    var ignoreEvents = result[1];
                    var uri = change.uri.toString();
                    if (ignoreEvents === undefined && ignoreEvents === false && monaco_languageclient_1.testGlob(globPattern, uri)) {
                        onFileEventEmitter.fire({ uri: uri, type: type });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        }));
        var onFileEvent = onFileEventEmitter.event;
        return {
            onFileEvent: onFileEvent,
            dispose: function () { return disposables.dispose(); }
        };
    };
    MonacoWorkspace.prototype.applyEdit = function (changes) {
        var _this = this;
        var workspaceEdit = this.p2m.asWorkspaceEdit(changes);
        var promises = [];
        var _loop_1 = function (edit) {
            promises.push(this_1.textModelService.createModelReference(edit.resource).then(function (reference) {
                var model = reference.object.textEditorModel;
                // start a fresh operation
                model.pushStackElement();
                var range = edit.range;
                var selections = [new monaco.Selection(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn)];
                model.pushEditOperations(selections, [{
                        identifier: undefined,
                        forceMoveMarkers: false,
                        range: new monaco.Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn),
                        text: edit.newText
                    }], function (edits) { return selections; });
                var editor = _this.editorManager.editors.find(function (editor) { return editor.editor.uri.toString() === model.uri.toString(); });
                if (editor) {
                    editor.editor.focus();
                }
                // push again to make this change an undoable operation
                model.pushStackElement();
                reference.dispose();
            }));
        };
        var this_1 = this;
        try {
            for (var _a = __values(workspaceEdit.edits), _b = _a.next(); !_b.done; _b = _a.next()) {
                var edit = _b.value;
                _loop_1(edit);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return Promise.all(promises).then(function () { return true; });
        var e_2, _c;
    };
    MonacoWorkspace = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_2.FileSystem)),
        __param(1, inversify_1.inject(browser_1.WorkspaceService)),
        __param(2, inversify_1.inject(common_2.FileSystemWatcher)),
        __param(3, inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService)),
        __param(4, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __param(5, inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter)),
        __param(6, inversify_1.inject(browser_2.EditorManager)),
        __metadata("design:paramtypes", [Object, browser_1.WorkspaceService,
            common_2.FileSystemWatcher,
            monaco_text_model_service_1.MonacoTextModelService,
            monaco_languageclient_1.MonacoToProtocolConverter,
            monaco_languageclient_1.ProtocolToMonacoConverter, Object])
    ], MonacoWorkspace);
    return MonacoWorkspace;
}(monaco_languageclient_1.MonacoWorkspace));
exports.MonacoWorkspace = MonacoWorkspace;
//# sourceMappingURL=monaco-workspace.js.map