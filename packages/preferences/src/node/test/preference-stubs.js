"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var json_preference_server_1 = require("../json-preference-server");
var node_filesystem_1 = require("@theia/filesystem/lib/node/node-filesystem");
var JsonPrefHelper = /** @class */ (function () {
    function JsonPrefHelper() {
        this.logger = new Proxy({}, {
            get: function (target, name) { return function () {
                if (name.toString().startsWith('is')) {
                    return Promise.resolve(false);
                }
                if (name.toString().startsWith('if')) {
                    return new Promise(function (resolve) { });
                }
            }; }
        });
        this.fileSystem = new node_filesystem_1.FileSystemNode();
        this.fileWatcher = this.createFileSystemWatcher();
    }
    JsonPrefHelper.prototype.getFS = function () {
        return this.fileSystem;
    };
    JsonPrefHelper.prototype.getWatcher = function () {
        return this.fileWatcher;
    };
    JsonPrefHelper.prototype.createJsonPrefServer = function (preferenceFileUri) {
        return new json_preference_server_1.JsonPreferenceServer(this.fileSystem, this.fileWatcher, this.logger, Promise.resolve(preferenceFileUri));
    };
    JsonPrefHelper.prototype.createFileSystemWatcher = function () {
        return new FileSystemWatcherServerstub();
    };
    return JsonPrefHelper;
}());
exports.JsonPrefHelper = JsonPrefHelper;
var FileSystemWatcherServerstub = /** @class */ (function () {
    function FileSystemWatcherServerstub() {
    }
    FileSystemWatcherServerstub.prototype.watchFileChanges = function (uri, options) {
        return Promise.resolve(2);
    };
    FileSystemWatcherServerstub.prototype.unwatchFileChanges = function (watcher) {
        return Promise.resolve();
    };
    FileSystemWatcherServerstub.prototype.setClient = function (client) {
        this.client = client;
    };
    FileSystemWatcherServerstub.prototype.dispose = function () { };
    FileSystemWatcherServerstub.prototype.fireEvents = function (event) {
        if (this.client) {
            this.client.onDidFilesChanged(event);
        }
    };
    return FileSystemWatcherServerstub;
}());
exports.FileSystemWatcherServerstub = FileSystemWatcherServerstub;
//# sourceMappingURL=preference-stubs.js.map