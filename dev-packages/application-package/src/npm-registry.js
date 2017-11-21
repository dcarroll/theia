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
// tslint:disable:no-any
var request = require("request");
var ChangesStream = require('changes-stream');
var PublishedNodePackage;
(function (PublishedNodePackage) {
    function is(pck) {
        return !!pck && !!pck.name && !!pck.version;
    }
    PublishedNodePackage.is = is;
})(PublishedNodePackage = exports.PublishedNodePackage || (exports.PublishedNodePackage = {}));
function sortByKey(object) {
    return Object.keys(object).sort().reduce(function (sorted, key) {
        sorted[key] = object[key];
        return sorted;
    }, {});
}
exports.sortByKey = sortByKey;
var NpmRegistryConfig = /** @class */ (function () {
    function NpmRegistryConfig() {
    }
    return NpmRegistryConfig;
}());
exports.NpmRegistryConfig = NpmRegistryConfig;
var NpmRegistryOptions = /** @class */ (function () {
    function NpmRegistryOptions() {
    }
    return NpmRegistryOptions;
}());
exports.NpmRegistryOptions = NpmRegistryOptions;
var NpmRegistry = /** @class */ (function () {
    function NpmRegistry(options) {
        this.config = __assign({}, NpmRegistry.defaultConfig);
        this.index = new Map();
        this.options = __assign({ watchChanges: false }, options);
        this.resetIndex();
    }
    NpmRegistry.prototype.updateConfig = function (config) {
        var oldRegistry = this.config.registry;
        Object.assign(this.config, config);
        var newRegistry = this.config.registry;
        if (oldRegistry !== newRegistry) {
            this.resetIndex();
        }
    };
    NpmRegistry.prototype.resetIndex = function () {
        var _this = this;
        this.index.clear();
        if (this.options.watchChanges && this.config.registry === NpmRegistry.defaultConfig.registry) {
            if (this.changes) {
                this.changes.destroy();
            }
            // invalidate index with NPM registry web hooks
            // see: https://github.com/npm/registry-follower-tutorial
            var db = 'https://replicate.npmjs.com';
            this.changes = new ChangesStream({ db: db });
            this.changes.on('data', function (change) { return _this.invalidate(change.id); });
        }
    };
    NpmRegistry.prototype.invalidate = function (name) {
        if (this.index.delete(name)) {
            this.view(name);
        }
    };
    NpmRegistry.prototype.view = function (name) {
        var _this = this;
        var indexed = this.index.get(name);
        if (indexed) {
            return indexed;
        }
        var result = this.doView(name);
        this.index.set(name, result);
        result.catch(function () { return _this.index.delete(name); });
        return result;
    };
    NpmRegistry.prototype.doView = function (name) {
        var url = this.config.registry;
        if (name[0] === '@') {
            url += '@' + encodeURIComponent(name.substr(1));
        }
        else {
            url += encodeURIComponent(name);
        }
        var headers = {};
        return new Promise(function (resolve, reject) {
            request({
                url: url, headers: headers
            }, function (err, response, body) {
                if (err) {
                    reject(err);
                }
                else if (response.statusCode !== 200) {
                    reject(new Error(response.statusCode + ": " + response.statusMessage + " for " + url));
                }
                else {
                    var data = JSON.parse(body);
                    resolve(data);
                }
            });
        });
    };
    NpmRegistry.defaultConfig = {
        next: false,
        registry: 'https://registry.npmjs.org/'
    };
    return NpmRegistry;
}());
exports.NpmRegistry = NpmRegistry;
//# sourceMappingURL=npm-registry.js.map