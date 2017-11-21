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
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var filesystem_watcher_protocol_1 = require("./filesystem-watcher-protocol");
exports.FileChangeType = filesystem_watcher_protocol_1.FileChangeType;
var filesystem_preferences_1 = require("./filesystem-preferences");
var FileSystemWatcher = /** @class */ (function () {
    function FileSystemWatcher(server, preferences) {
        var _this = this;
        this.server = server;
        this.preferences = preferences;
        this.toDispose = new common_1.DisposableCollection();
        this.toRestartAll = new common_1.DisposableCollection();
        this.onFileChangedEmitter = new common_1.Emitter();
        this.toDispose.push(this.onFileChangedEmitter);
        this.toDispose.push(server);
        server.setClient({
            onDidFilesChanged: function (e) { return _this.onDidFilesChanged(e); }
        });
        this.toDispose.push(preferences);
        this.toDispose.push(preferences.onPreferenceChanged(function (e) {
            if (e.preferenceName === 'files.watcherExclude') {
                _this.toRestartAll.dispose();
            }
        }));
    }
    /**
     * Stop watching.
     */
    FileSystemWatcher.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    FileSystemWatcher.prototype.onDidFilesChanged = function (event) {
        var changes = event.changes.map(function (change) { return ({
            uri: new uri_1.default(change.uri),
            type: change.type
        }); });
        this.onFileChangedEmitter.fire(changes);
    };
    /**
     * Start file watching under the given uri.
     *
     * Resolve when watching is started.
     * Return a disposable to stop file watching under the given uri.
     */
    FileSystemWatcher.prototype.watchFileChanges = function (uri) {
        var _this = this;
        return this.createWatchOptions()
            .then(function (options) {
            return _this.server.watchFileChanges(uri.toString(), options);
        })
            .then(function (watcher) {
            var toDispose = new common_1.DisposableCollection();
            var toStop = common_1.Disposable.create(function () {
                return _this.server.unwatchFileChanges(watcher);
            });
            var toRestart = toDispose.push(toStop);
            _this.toRestartAll.push(common_1.Disposable.create(function () {
                toRestart.dispose();
                toStop.dispose();
                _this.watchFileChanges(uri).then(function (disposable) {
                    return toDispose.push(disposable);
                });
            }));
            return toDispose;
        });
    };
    Object.defineProperty(FileSystemWatcher.prototype, "onFilesChanged", {
        /**
          * Emit when files under watched uris are changed.
          */
        get: function () {
            return this.onFileChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    FileSystemWatcher.prototype.createWatchOptions = function () {
        return this.getIgnored().then(function (ignored) {
            return {
                ignored: ignored
            };
        });
    };
    FileSystemWatcher.prototype.getIgnored = function () {
        var patterns = this.preferences['files.watcherExclude'];
        return Promise.resolve(Object.keys(patterns).filter(function (pattern) { return patterns[pattern]; }));
    };
    FileSystemWatcher = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(filesystem_watcher_protocol_1.FileSystemWatcherServer)),
        __param(1, inversify_1.inject(filesystem_preferences_1.FileSystemPreferences)),
        __metadata("design:paramtypes", [Object, Object])
    ], FileSystemWatcher);
    return FileSystemWatcher;
}());
exports.FileSystemWatcher = FileSystemWatcher;
//# sourceMappingURL=filesystem-watcher.js.map