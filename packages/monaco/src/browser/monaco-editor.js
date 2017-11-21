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
Object.defineProperty(exports, "__esModule", { value: true });
var domutils_1 = require("@phosphor/domutils");
var common_1 = require("@theia/core/lib/common");
function getAll(manager) {
    return manager.editors.map(function (e) { return get(e); }).filter(function (e) { return !!e; });
}
exports.getAll = getAll;
function getCurrent(manager) {
    return get(manager.currentEditor);
}
exports.getCurrent = getCurrent;
function getActive(manager) {
    return get(manager.activeEditor);
}
exports.getActive = getActive;
function get(editorWidget) {
    if (editorWidget && editorWidget.editor instanceof MonacoEditor) {
        return editorWidget.editor;
    }
    return undefined;
}
exports.get = get;
var MonacoEditor = /** @class */ (function () {
    function MonacoEditor(uri, document, node, m2p, p2m, options, override) {
        this.uri = uri;
        this.document = document;
        this.node = node;
        this.m2p = m2p;
        this.p2m = p2m;
        this.toDispose = new common_1.DisposableCollection();
        this.onCursorPositionChangedEmitter = new common_1.Emitter();
        this.onSelectionChangedEmitter = new common_1.Emitter();
        this.onFocusChangedEmitter = new common_1.Emitter();
        this.onDocumentContentChangedEmitter = new common_1.Emitter();
        this.autoSizing = options && options.autoSizing !== undefined ? options.autoSizing : false;
        this.minHeight = options && options.minHeight !== undefined ? options.minHeight : -1;
        this.toDispose.push(this.create(options, override));
        this.addHandlers(this.editor);
    }
    MonacoEditor.prototype.create = function (options, override) {
        return this.editor = monaco.editor.create(this.node, __assign({}, options, { fixedOverflowWidgets: true }), override);
    };
    MonacoEditor.prototype.addHandlers = function (codeEditor) {
        var _this = this;
        this.toDispose.push(codeEditor.onDidChangeConfiguration(function (e) { return _this.refresh(); }));
        this.toDispose.push(codeEditor.onDidChangeModel(function (e) { return _this.refresh(); }));
        this.toDispose.push(codeEditor.onDidChangeModelContent(function () {
            _this.refresh();
            _this.onDocumentContentChangedEmitter.fire(_this.document);
        }));
        this.toDispose.push(codeEditor.onDidChangeCursorPosition(function () {
            return _this.onCursorPositionChangedEmitter.fire(_this.cursor);
        }));
        this.toDispose.push(codeEditor.onDidChangeCursorSelection(function (e) {
            _this.onSelectionChangedEmitter.fire(_this.selection);
        }));
        this.toDispose.push(codeEditor.onDidFocusEditor(function () {
            _this.onFocusChangedEmitter.fire(_this.isFocused());
        }));
        this.toDispose.push(codeEditor.onDidBlurEditor(function () {
            return _this.onFocusChangedEmitter.fire(_this.isFocused());
        }));
        this.addOnDidFocusHandler(codeEditor);
    };
    MonacoEditor.prototype.addOnDidFocusHandler = function (codeEditor) {
        var _this = this;
        // increase the z-index for the focussed element hierarchy within the dockpanel
        this.toDispose.push(this.editor.onDidFocusEditor(function () {
            var z = '1';
            // already increased? -> do nothing
            if (_this.editor.getDomNode().style.zIndex === z) {
                return;
            }
            var toDisposeOnBlur = new common_1.DisposableCollection();
            _this.increaseZIndex(_this.editor.getDomNode(), z, toDisposeOnBlur);
            toDisposeOnBlur.push(_this.editor.onDidBlurEditor(function () {
                return toDisposeOnBlur.dispose();
            }));
        }));
    };
    Object.defineProperty(MonacoEditor.prototype, "onDispose", {
        get: function () {
            return this.toDispose.onDispose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onDocumentContentChanged", {
        get: function () {
            return this.onDocumentContentChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "cursor", {
        get: function () {
            var _a = this.editor.getPosition(), lineNumber = _a.lineNumber, column = _a.column;
            return this.m2p.asPosition(lineNumber, column);
        },
        set: function (cursor) {
            var position = this.p2m.asPosition(cursor);
            this.editor.setPosition(position);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onCursorPositionChanged", {
        get: function () {
            return this.onCursorPositionChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "selection", {
        get: function () {
            return this.m2p.asRange(this.editor.getSelection());
        },
        set: function (selection) {
            var range = this.p2m.asRange(selection);
            this.editor.setSelection(range);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onSelectionChanged", {
        get: function () {
            return this.onSelectionChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MonacoEditor.prototype.revealPosition = function (raw) {
        var position = this.p2m.asPosition(raw);
        this.editor.revealPositionInCenter(position);
    };
    MonacoEditor.prototype.revealRange = function (raw) {
        var range = this.p2m.asRange(raw);
        this.editor.revealRangeInCenter(range);
    };
    MonacoEditor.prototype.focus = function () {
        this.editor.focus();
    };
    MonacoEditor.prototype.blur = function () {
        var node = this.editor.getDomNode();
        var textarea = node.querySelector('textarea');
        textarea.blur();
    };
    MonacoEditor.prototype.isFocused = function () {
        return this.editor.isFocused();
    };
    Object.defineProperty(MonacoEditor.prototype, "onFocusChanged", {
        get: function () {
            return this.onFocusChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MonacoEditor.prototype.increaseZIndex = function (element, z, toDisposeOnBlur) {
        var parent = element.parentElement;
        if (parent && !element.classList.contains('p-DockPanel')) {
            var oldIndex_1 = element.style.zIndex;
            toDisposeOnBlur.push(common_1.Disposable.create(function () {
                return element.style.zIndex = oldIndex_1;
            }));
            element.style.zIndex = z;
            this.increaseZIndex(parent, z, toDisposeOnBlur);
        }
    };
    MonacoEditor.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    MonacoEditor.prototype.getControl = function () {
        return this.editor;
    };
    MonacoEditor.prototype.refresh = function () {
        this.autoresize();
    };
    MonacoEditor.prototype.resizeToFit = function () {
        this.autoresize();
    };
    MonacoEditor.prototype.setSize = function (dimension) {
        this.resize(dimension);
    };
    MonacoEditor.prototype.autoresize = function () {
        if (this.autoSizing) {
            this.resize(null);
        }
    };
    MonacoEditor.prototype.resize = function (dimension) {
        if (this.node) {
            var layoutSize = this.computeLayoutSize(this.node, dimension);
            this.editor.layout(layoutSize);
        }
    };
    MonacoEditor.prototype.computeLayoutSize = function (hostNode, dimension) {
        if (dimension && dimension.width >= 0 && dimension.height >= 0) {
            return dimension;
        }
        var boxSizing = domutils_1.ElementExt.boxSizing(hostNode);
        var width = (!dimension || dimension.width < 0) ?
            this.getWidth(hostNode, boxSizing) :
            dimension.width;
        var height = (!dimension || dimension.height < 0) ?
            this.getHeight(hostNode, boxSizing) :
            dimension.height;
        return { width: width, height: height };
    };
    MonacoEditor.prototype.getWidth = function (hostNode, boxSizing) {
        return hostNode.offsetWidth - boxSizing.horizontalSum;
    };
    MonacoEditor.prototype.getHeight = function (hostNode, boxSizing) {
        if (!this.autoSizing) {
            return hostNode.offsetHeight - boxSizing.verticalSum;
        }
        var configuration = this.editor.getConfiguration();
        var lineHeight = configuration.lineHeight;
        var lineCount = this.editor.getModel().getLineCount();
        var contentHeight = lineHeight * lineCount;
        var horizontalScrollbarHeight = configuration.layoutInfo.horizontalScrollbarHeight;
        var editorHeight = contentHeight + horizontalScrollbarHeight;
        if (this.minHeight < 0) {
            return editorHeight;
        }
        var defaultHeight = lineHeight * this.minHeight + horizontalScrollbarHeight;
        return Math.max(defaultHeight, editorHeight);
    };
    MonacoEditor.prototype.isActionSupported = function (id) {
        var action = this.editor.getAction(id);
        return !!action && action.isSupported();
    };
    MonacoEditor.prototype.runAction = function (id) {
        var action = this.editor.getAction(id);
        if (action && action.isSupported()) {
            return action.run();
        }
        return monaco.Promise.as(undefined);
    };
    Object.defineProperty(MonacoEditor.prototype, "commandService", {
        get: function () {
            return this.editor._commandService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "instantiationService", {
        get: function () {
            return this.editor._instantiationService;
        },
        enumerable: true,
        configurable: true
    });
    return MonacoEditor;
}());
exports.MonacoEditor = MonacoEditor;
//# sourceMappingURL=monaco-editor.js.map