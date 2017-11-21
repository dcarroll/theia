"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/editor/lib/browser");
var diff_uris_1 = require("@theia/editor/lib/browser/diff-uris");
var inversify_1 = require("inversify");
var monaco_languageclient_1 = require("monaco-languageclient");
var monaco_command_service_1 = require("./monaco-command-service");
var monaco_context_menu_1 = require("./monaco-context-menu");
var monaco_diff_editor_1 = require("./monaco-diff-editor");
var monaco_editor_1 = require("./monaco-editor");
var monaco_editor_service_1 = require("./monaco-editor-service");
var monaco_quick_open_service_1 = require("./monaco-quick-open-service");
var monaco_text_model_service_1 = require("./monaco-text-model-service");
var monaco_workspace_1 = require("./monaco-workspace");
var monacoTheme = 'vs-dark';
monaco.editor.setTheme(monacoTheme);
document.body.classList.add(monacoTheme);
var MonacoEditorProvider = /** @class */ (function () {
    function MonacoEditorProvider(editorService, textModelService, contextMenuService, m2p, p2m, workspace, commandServiceFactory, editorPreferences, quickOpenService) {
        this.editorService = editorService;
        this.textModelService = textModelService;
        this.contextMenuService = contextMenuService;
        this.m2p = m2p;
        this.p2m = p2m;
        this.workspace = workspace;
        this.commandServiceFactory = commandServiceFactory;
        this.editorPreferences = editorPreferences;
        this.quickOpenService = quickOpenService;
        this.editorOptions = {
            'editor.lineNumbers': 'lineNumbers',
            'editor.renderWhitespace': 'renderWhitespace'
        };
    }
    MonacoEditorProvider.prototype.getModel = function (uri, toDispose) {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.textModelService.createModelReference(uri)];
                    case 1:
                        reference = _a.sent();
                        toDispose.push(reference);
                        return [2 /*return*/, reference.object];
                }
            });
        });
    };
    MonacoEditorProvider.prototype.createEditor = function (create, toDispose) {
        var _this = this;
        var node = document.createElement('div');
        var commandService = this.commandServiceFactory();
        var _a = this, editorService = _a.editorService, textModelService = _a.textModelService, contextMenuService = _a.contextMenuService;
        var override = {
            editorService: editorService,
            textModelService: textModelService,
            contextMenuService: contextMenuService,
            commandService: commandService
        };
        var editor = create(node, override);
        toDispose.push(this.editorPreferences.onPreferenceChanged(function (e) { return _this.updateOptions(e, editor); }));
        editor.onDispose(function () { return toDispose.dispose(); });
        var standaloneCommandService = new monaco.services.StandaloneCommandService(editor.instantiationService);
        commandService.setDelegate(standaloneCommandService);
        this.installQuickOpenService(editor);
        return editor;
    };
    MonacoEditorProvider.prototype.get = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var editor, toDispose, model_1, _a, original, modified, originalModel_1, modifiedModel_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.editorPreferences.ready];
                    case 1:
                        _b.sent();
                        toDispose = new common_1.DisposableCollection();
                        if (!!diff_uris_1.DiffUris.isDiffUri(uri)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getModel(uri, toDispose)];
                    case 2:
                        model_1 = _b.sent();
                        editor = this.createEditor(function (node, override) { return new monaco_editor_1.MonacoEditor(uri, model_1, node, _this.m2p, _this.p2m, _this.getEditorOptions(model_1), override); }, toDispose);
                        return [3 /*break*/, 6];
                    case 3:
                        _a = __read(diff_uris_1.DiffUris.decode(uri), 2), original = _a[0], modified = _a[1];
                        return [4 /*yield*/, this.getModel(original, toDispose)];
                    case 4:
                        originalModel_1 = _b.sent();
                        return [4 /*yield*/, this.getModel(modified, toDispose)];
                    case 5:
                        modifiedModel_1 = _b.sent();
                        editor = this.createEditor(function (node, override) { return new monaco_diff_editor_1.MonacoDiffEditor(node, originalModel_1, modifiedModel_1, _this.m2p, _this.p2m, _this.getDiffEditorOptions(originalModel_1, modifiedModel_1), override); }, toDispose);
                        _b.label = 6;
                    case 6: return [2 /*return*/, Promise.resolve(editor)];
                }
            });
        });
    };
    MonacoEditorProvider.prototype.getEditorOptions = function (model) {
        return {
            model: model.textEditorModel,
            wordWrap: 'off',
            folding: true,
            lineNumbers: this.editorPreferences["editor.lineNumbers"],
            renderWhitespace: this.editorPreferences["editor.renderWhitespace"],
            glyphMargin: true,
            readOnly: model.readOnly
        };
    };
    MonacoEditorProvider.prototype.getDiffEditorOptions = function (original, modified) {
        return {
            originalEditable: !original.readOnly,
            readOnly: modified.readOnly
        };
    };
    MonacoEditorProvider.prototype.updateOptions = function (change, editor) {
        var editorOption = this.editorOptions[change.preferenceName];
        if (editorOption) {
            var options = {};
            options[editorOption] = change.newValue;
            editor.getControl().updateOptions(options);
        }
    };
    MonacoEditorProvider.prototype.installQuickOpenService = function (editor) {
        var _this = this;
        var control = editor.getControl();
        var quickOpenController = control._contributions['editor.controller.quickOpenController'];
        quickOpenController.run = function (options) {
            var selection = control.getSelection();
            _this.quickOpenService.internalOpen(__assign({}, options, { onClose: function (canceled) {
                    quickOpenController.clearDecorations();
                    if (canceled && selection) {
                        control.setSelection(selection);
                        control.revealRangeInCenterIfOutsideViewport(selection);
                    }
                    editor.focus();
                } }));
        };
    };
    MonacoEditorProvider = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_editor_service_1.MonacoEditorService)),
        __param(1, inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService)),
        __param(2, inversify_1.inject(monaco_context_menu_1.MonacoContextMenuService)),
        __param(3, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __param(4, inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter)),
        __param(5, inversify_1.inject(monaco_workspace_1.MonacoWorkspace)),
        __param(6, inversify_1.inject(monaco_command_service_1.MonacoCommandServiceFactory)),
        __param(7, inversify_1.inject(browser_1.EditorPreferences)),
        __param(8, inversify_1.inject(monaco_quick_open_service_1.MonacoQuickOpenService)),
        __metadata("design:paramtypes", [monaco_editor_service_1.MonacoEditorService,
            monaco_text_model_service_1.MonacoTextModelService,
            monaco_context_menu_1.MonacoContextMenuService,
            monaco_languageclient_1.MonacoToProtocolConverter,
            monaco_languageclient_1.ProtocolToMonacoConverter,
            monaco_workspace_1.MonacoWorkspace, Function, Object, monaco_quick_open_service_1.MonacoQuickOpenService])
    ], MonacoEditorProvider);
    return MonacoEditorProvider;
}());
exports.MonacoEditorProvider = MonacoEditorProvider;
//# sourceMappingURL=monaco-editor-provider.js.map