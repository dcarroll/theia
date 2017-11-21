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
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var editor_widget_1 = require("./editor-widget");
var editor_1 = require("./editor");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var file_icons_1 = require("@theia/filesystem/lib/browser/icons/file-icons");
exports.EditorManager = Symbol("EditorManager");
var EditorManagerImpl = /** @class */ (function () {
    function EditorManagerImpl(editorProvider, selectionService, app, widgetManager, iconProvider) {
        this.editorProvider = editorProvider;
        this.selectionService = selectionService;
        this.app = app;
        this.widgetManager = widgetManager;
        this.iconProvider = iconProvider;
        this.id = "code-editor-opener";
        this.label = "Code Editor";
        this.currentObserver = new EditorManagerImpl_1.Observer('current', app);
        this.activeObserver = new EditorManagerImpl_1.Observer('active', app);
    }
    EditorManagerImpl_1 = EditorManagerImpl;
    Object.defineProperty(EditorManagerImpl.prototype, "editors", {
        get: function () {
            return this.widgetManager.getWidgets(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorManagerImpl.prototype, "currentEditor", {
        get: function () {
            return this.currentObserver.getEditor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorManagerImpl.prototype, "onCurrentEditorChanged", {
        get: function () {
            return this.currentObserver.onEditorChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorManagerImpl.prototype, "activeEditor", {
        get: function () {
            return this.activeObserver.getEditor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorManagerImpl.prototype, "onActiveEditorChanged", {
        get: function () {
            return this.activeObserver.onEditorChanged();
        },
        enumerable: true,
        configurable: true
    });
    EditorManagerImpl.prototype.canHandle = function (uri, input) {
        return 100;
    };
    EditorManagerImpl.prototype.open = function (uri, input) {
        var _this = this;
        return this.widgetManager.getOrCreateWidget(this.id, uri.toString()).then(function (editor) {
            if (!editor.isAttached) {
                _this.app.shell.addToMainArea(editor);
            }
            _this.revealIfVisible(editor, input);
            _this.revealSelection(editor, input);
            return editor;
        });
    };
    // don't call directly, but use WidgetManager
    EditorManagerImpl.prototype.createWidget = function (uriAsString) {
        var uri = new uri_1.default(uriAsString);
        return this.createEditor(uri);
    };
    EditorManagerImpl.prototype.createEditor = function (uri) {
        var _this = this;
        return this.editorProvider(uri).then(function (textEditor) {
            var newEditor = new editor_widget_1.EditorWidget(textEditor, _this.selectionService);
            newEditor.id = _this.id + ":" + uri.toString();
            newEditor.title.closable = true;
            newEditor.title.label = uri.path.base;
            newEditor.title.iconClass = _this.iconProvider.getFileIconForURI(uri);
            return newEditor;
        });
    };
    EditorManagerImpl.prototype.revealIfVisible = function (editor, input) {
        if (input === undefined || input.revealIfVisible === undefined || input.revealIfVisible) {
            this.app.shell.activateMain(editor.id);
        }
    };
    EditorManagerImpl.prototype.revealSelection = function (widget, input) {
        if (input && input.selection) {
            var editor = widget.editor;
            var selection = this.getSelection(input.selection);
            if (editor_1.Position.is(selection)) {
                editor.cursor = selection;
                editor.revealPosition(selection);
            }
            else if (editor_1.Range.is(selection)) {
                editor.cursor = selection.end;
                editor.selection = selection;
                editor.revealRange(selection);
            }
        }
    };
    EditorManagerImpl.prototype.getSelection = function (selection) {
        var start = selection.start, end = selection.end;
        if (start && start.line !== undefined && start.line >= 0 &&
            start.character !== undefined && start.character >= 0) {
            if (end && end.line !== undefined && end.line >= 0 &&
                end.character !== undefined && end.character >= 0) {
                return selection;
            }
            return start;
        }
        return undefined;
    };
    EditorManagerImpl = EditorManagerImpl_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(editor_1.TextEditorProvider)),
        __param(1, inversify_1.inject(common_1.SelectionService)),
        __param(2, inversify_1.inject(browser_1.FrontendApplication)),
        __param(3, inversify_1.inject(widget_manager_1.WidgetManager)),
        __param(4, inversify_1.inject(file_icons_1.FileIconProvider)),
        __metadata("design:paramtypes", [Function, common_1.SelectionService,
            browser_1.FrontendApplication,
            widget_manager_1.WidgetManager,
            file_icons_1.FileIconProvider])
    ], EditorManagerImpl);
    return EditorManagerImpl;
    var EditorManagerImpl_1;
}());
exports.EditorManagerImpl = EditorManagerImpl;
(function (EditorManagerImpl) {
    var Observer = /** @class */ (function () {
        function Observer(kind, app) {
            var _this = this;
            this.kind = kind;
            this.app = app;
            this.onEditorChangedEmitter = new common_1.Emitter();
            var key = this.kind === 'current' ? 'currentChanged' : 'activeChanged';
            app.shell[key].connect(function (shell, arg) {
                if (arg.newValue instanceof editor_widget_1.EditorWidget || arg.oldValue instanceof editor_widget_1.EditorWidget) {
                    _this.onEditorChangedEmitter.fire(_this.getEditor());
                }
            });
        }
        Observer.prototype.getEditor = function () {
            if (this.app) {
                var key = this.kind === 'current' ? 'currentWidget' : 'activeWidget';
                var widget = this.app.shell[key];
                if (widget instanceof editor_widget_1.EditorWidget) {
                    return widget;
                }
            }
            return undefined;
        };
        Observer.prototype.onEditorChanged = function () {
            return this.onEditorChangedEmitter.event;
        };
        return Observer;
    }());
    EditorManagerImpl.Observer = Observer;
})(EditorManagerImpl = exports.EditorManagerImpl || (exports.EditorManagerImpl = {}));
exports.EditorManagerImpl = EditorManagerImpl;
//# sourceMappingURL=editor-manager.js.map