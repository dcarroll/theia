"use strict";
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
Object.defineProperty(exports, "__esModule", { value: true });
var uri_1 = require("@theia/core/lib/common/uri");
var DiffUris;
(function (DiffUris) {
    function encode(left, right, name) {
        var diffUris = [
            left.toString(),
            right.toString()
        ];
        var diffUriStr = JSON.stringify(diffUris);
        return new uri_1.default(name || left.displayName).withScheme('diff').withFragment(diffUriStr);
    }
    DiffUris.encode = encode;
    function decode(uri) {
        if (uri.scheme !== 'diff') {
            throw ('URI must have scheme "diff".');
        }
        var diffUris = JSON.parse(uri.fragment);
        return diffUris.map(function (s) { return new uri_1.default(s); });
    }
    DiffUris.decode = decode;
    function isDiffUri(uri) {
        return uri.scheme === 'diff';
    }
    DiffUris.isDiffUri = isDiffUri;
})(DiffUris = exports.DiffUris || (exports.DiffUris = {}));
//# sourceMappingURL=diff-uris.js.map