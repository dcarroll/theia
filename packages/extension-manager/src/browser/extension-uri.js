"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var uri_1 = require("@theia/core/lib/common/uri");
var ExtensionUri;
(function (ExtensionUri) {
    ExtensionUri.scheme = 'extension';
    function toUri(extensionName) {
        return new uri_1.default('').withScheme(ExtensionUri.scheme).withFragment(extensionName);
    }
    ExtensionUri.toUri = toUri;
    function toExtensionName(uri) {
        if (uri.scheme === ExtensionUri.scheme) {
            return uri.fragment;
        }
        throw new Error('The given uri is not an extension URI, uri: ' + uri);
    }
    ExtensionUri.toExtensionName = toExtensionName;
})(ExtensionUri = exports.ExtensionUri || (exports.ExtensionUri = {}));
//# sourceMappingURL=extension-uri.js.map