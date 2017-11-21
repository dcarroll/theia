"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var uri_1 = require("@theia/core/lib/common/uri");
var UriSelection;
(function (UriSelection) {
    function is(e) {
        return e && e["uri"] instanceof uri_1.default;
    }
    UriSelection.is = is;
    function getUri(selection) {
        if (UriSelection.is(selection)) {
            return selection.uri;
        }
        return undefined;
    }
    UriSelection.getUri = getUri;
})(UriSelection = exports.UriSelection || (exports.UriSelection = {}));
//# sourceMappingURL=filesystem-selection.js.map