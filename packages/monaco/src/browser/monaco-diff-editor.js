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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var monaco_editor_1 = require("./monaco-editor");
var MonacoDiffEditor = /** @class */ (function (_super) {
    __extends(MonacoDiffEditor, _super);
    function MonacoDiffEditor(node, originalModel, modifiedModel, m2p, p2m, options, override) {
        var _this = _super.call(this, new uri_1.default(''), modifiedModel, node, m2p, p2m, options, override) || this;
        _this.node = node;
        _this.originalModel = originalModel;
        _this.modifiedModel = modifiedModel;
        _this.m2p = m2p;
        _this.p2m = p2m;
        var original = originalModel.textEditorModel;
        var modified = modifiedModel.textEditorModel;
        _this.diffEditor.setModel({ original: original, modified: modified });
        return _this;
    }
    MonacoDiffEditor.prototype.create = function (options, override) {
        this.diffEditor = monaco.editor.createDiffEditor(this.node, __assign({}, options, { fixedOverflowWidgets: true }));
        this.editor = this.diffEditor.getModifiedEditor();
        return this.diffEditor;
    };
    MonacoDiffEditor.prototype.addOnDidFocusHandler = function (codeEditor) {
        var _this = this;
        // increase the z-index for the focussed element hierarchy within the dockpanel
        this.toDispose.push(codeEditor.onDidFocusEditor(function () {
            var z = '1';
            // already increased? -> do nothing
            if (_this.diffEditor.getDomNode().style.zIndex === z) {
                return;
            }
            var toDisposeOnBlur = new common_1.DisposableCollection();
            _this.editor = codeEditor;
            _this.increaseZIndex(_this.diffEditor.getDomNode(), z, toDisposeOnBlur);
            toDisposeOnBlur.push(codeEditor.onDidBlurEditor(function () {
                return toDisposeOnBlur.dispose();
            }));
        }));
    };
    MonacoDiffEditor.prototype.resize = function (dimension) {
        if (this.node) {
            var layoutSize = this.computeLayoutSize(this.node, dimension);
            this.diffEditor.layout(layoutSize);
        }
    };
    MonacoDiffEditor.prototype.isActionSupported = function (id) {
        var action = this.diffEditor.getActions().find(function (a) { return a.id === id; });
        return !!action && action.isSupported() && _super.prototype.isActionSupported.call(this, id);
    };
    return MonacoDiffEditor;
}(monaco_editor_1.MonacoEditor));
exports.MonacoDiffEditor = MonacoDiffEditor;
//# sourceMappingURL=monaco-diff-editor.js.map