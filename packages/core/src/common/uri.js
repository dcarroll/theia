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
var vscode_uri_1 = require("vscode-uri");
var path_1 = require("./path");
var URI = /** @class */ (function () {
    function URI(uri) {
        if (uri === undefined) {
            this.codeUri = vscode_uri_1.default.from({});
        }
        else if (uri instanceof vscode_uri_1.default) {
            this.codeUri = uri;
        }
        else {
            this.codeUri = vscode_uri_1.default.parse(uri);
        }
    }
    Object.defineProperty(URI.prototype, "displayName", {
        get: function () {
            var base = this.path.base;
            if (base) {
                return base;
            }
            if (this.path.isRoot) {
                return this.path.toString();
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "allLocations", {
        /**
         * Return all uri from the current to the top most.
         */
        get: function () {
            var locations = [];
            var location = this;
            while (!location.path.isRoot) {
                locations.push(location);
                location = location.parent;
            }
            locations.push(location);
            return locations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "parent", {
        get: function () {
            if (this.path.isRoot) {
                return this;
            }
            return this.withPath(this.path.dir);
        },
        enumerable: true,
        configurable: true
    });
    URI.prototype.resolve = function (path) {
        return this.withPath(this.path.join(path.toString()));
    };
    /**
     * return a new URI replacing the current with the given scheme
     */
    URI.prototype.withScheme = function (scheme) {
        var newCodeUri = vscode_uri_1.default.from(__assign({}, this.codeUri.toJSON(), { scheme: scheme }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a scheme
     */
    URI.prototype.withoutScheme = function () {
        return this.withScheme('');
    };
    /**
     * return a new URI replacing the current with the given authority
     */
    URI.prototype.withAuthority = function (authority) {
        var newCodeUri = vscode_uri_1.default.from(__assign({}, this.codeUri.toJSON(), { authority: authority }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a authority
     */
    URI.prototype.withoutAuthority = function () {
        return this.withAuthority('');
    };
    /**
     * return a new URI replacing the current with the given path
     */
    URI.prototype.withPath = function (path) {
        var newCodeUri = vscode_uri_1.default.from(__assign({}, this.codeUri.toJSON(), { path: path.toString() }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a path
     */
    URI.prototype.withoutPath = function () {
        return this.withPath('');
    };
    /**
     * return a new URI replacing the current with the given query
     */
    URI.prototype.withQuery = function (query) {
        var newCodeUri = vscode_uri_1.default.from(__assign({}, this.codeUri.toJSON(), { query: query }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a query
     */
    URI.prototype.withoutQuery = function () {
        return this.withQuery('');
    };
    /**
     * return a new URI replacing the current with the given fragment
     */
    URI.prototype.withFragment = function (fragment) {
        var newCodeUri = vscode_uri_1.default.from(__assign({}, this.codeUri.toJSON(), { fragment: fragment }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a fragment
     */
    URI.prototype.withoutFragment = function () {
        return this.withFragment('');
    };
    Object.defineProperty(URI.prototype, "scheme", {
        get: function () {
            return this.codeUri.scheme;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "authority", {
        get: function () {
            return this.codeUri.authority;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "path", {
        get: function () {
            if (this._path === undefined) {
                this._path = new path_1.Path(this.codeUri.path);
            }
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "query", {
        get: function () {
            return this.codeUri.query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "fragment", {
        get: function () {
            return this.codeUri.fragment;
        },
        enumerable: true,
        configurable: true
    });
    URI.prototype.toString = function (skipEncoding) {
        return this.codeUri.toString(skipEncoding);
    };
    return URI;
}());
exports.default = URI;
//# sourceMappingURL=uri.js.map