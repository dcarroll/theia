"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
exports.Position = vscode_languageserver_types_1.Position;
exports.Range = vscode_languageserver_types_1.Range;
var uri_1 = require("@theia/core/lib/common/uri");
exports.TextEditorProvider = Symbol('TextEditorProvider');
var TextEditorSelection;
(function (TextEditorSelection) {
    function is(e) {
        return e && e["uri"] instanceof uri_1.default;
    }
    TextEditorSelection.is = is;
})(TextEditorSelection = exports.TextEditorSelection || (exports.TextEditorSelection = {}));
//# sourceMappingURL=editor.js.map