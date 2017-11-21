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
var chokidar_1 = require("chokidar");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/core/lib/node");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
var ChokidarFileSystemWatcherServer = /** @class */ (function () {
    function ChokidarFileSystemWatcherServer(logger) {
        this.logger = logger;
        this.watcherSequence = 1;
        this.watchers = new Map();
        this.toDispose = new common_1.DisposableCollection();
        this.changes = [];
        this.fireDidFilesChangedTimeout = 50;
        this.toDisposeOnFileChange = new common_1.DisposableCollection();
        /* Did we print the message about exhausted inotify watches yet?  */
        this.printedENOSPCError = false;
    }
    ChokidarFileSystemWatcherServer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    ChokidarFileSystemWatcherServer.prototype.watchFileChanges = function (uri, options) {
        var _this = this;
        if (options === void 0) { options = { ignored: [] }; }
        var watcherId = this.watcherSequence++;
        var paths = this.toPaths(uri);
        this.logger.info("Starting watching:", paths);
        return new Promise(function (resolve) {
            if (options.ignored.length > 0) {
                _this.logger.debug(function (log) {
                    return log('Files ignored for watching', options.ignored);
                });
            }
            var watcher = chokidar_1.watch(paths, {
                ignoreInitial: true,
                ignored: options.ignored
            });
            watcher.once('ready', function () {
                _this.logger.info("Started watching:", paths);
                resolve(watcherId);
            });
            watcher.on('error', function (error) {
                if (_this.isWatchError(error)) {
                    _this.handleWatchError(error);
                }
                else {
                    _this.logger.error('Unknown file watch error:', error);
                }
            });
            watcher.on('add', function (path) { return _this.pushAdded(watcherId, path); });
            watcher.on('addDir', function (path) { return _this.pushAdded(watcherId, path); });
            watcher.on('change', function (path) { return _this.pushUpdated(watcherId, path); });
            watcher.on('unlink', function (path) { return _this.pushDeleted(watcherId, path); });
            watcher.on('unlinkDir', function (path) { return _this.pushDeleted(watcherId, path); });
            var disposable = common_1.Disposable.create(function () {
                _this.watchers.delete(watcherId);
                _this.logger.info("Stopping watching:", paths);
                watcher.close();
                _this.logger.info("Stopped watching.");
            });
            _this.watchers.set(watcherId, disposable);
            _this.toDispose.push(disposable);
        });
    };
    ChokidarFileSystemWatcherServer.prototype.unwatchFileChanges = function (watcherId) {
        var disposable = this.watchers.get(watcherId);
        if (disposable) {
            this.watchers.delete(watcherId);
            disposable.dispose();
        }
        return Promise.resolve();
    };
    ChokidarFileSystemWatcherServer.prototype.setClient = function (client) {
        this.client = client;
    };
    ChokidarFileSystemWatcherServer.prototype.toPaths = function (raw) {
        return node_1.FileUri.fsPath(new uri_1.default(raw));
    };
    ChokidarFileSystemWatcherServer.prototype.pushAdded = function (watcherId, path) {
        this.logger.debug(function (log) {
            return log("Added:", path);
        });
        this.pushFileChange(watcherId, path, filesystem_watcher_protocol_1.FileChangeType.ADDED);
    };
    ChokidarFileSystemWatcherServer.prototype.pushUpdated = function (watcherId, path) {
        this.logger.debug(function (log) {
            return log("Updated:", path);
        });
        this.pushFileChange(watcherId, path, filesystem_watcher_protocol_1.FileChangeType.UPDATED);
    };
    ChokidarFileSystemWatcherServer.prototype.pushDeleted = function (watcherId, path) {
        this.logger.debug(function (log) {
            return log("Deleted:", path);
        });
        this.pushFileChange(watcherId, path, filesystem_watcher_protocol_1.FileChangeType.DELETED);
    };
    ChokidarFileSystemWatcherServer.prototype.pushFileChange = function (watcherId, path, type) {
        var _this = this;
        var uri = node_1.FileUri.create(path).toString();
        this.changes.push({ uri: uri, type: type });
        this.toDisposeOnFileChange.dispose();
        var timer = setTimeout(function () { return _this.fireDidFilesChanged(); }, this.fireDidFilesChangedTimeout);
        this.toDisposeOnFileChange.push(common_1.Disposable.create(function () { return clearTimeout(timer); }));
    };
    ChokidarFileSystemWatcherServer.prototype.fireDidFilesChanged = function () {
        var changes = this.changes;
        this.changes = [];
        var event = { changes: changes };
        if (this.client) {
            this.client.onDidFilesChanged(event);
        }
    };
    ChokidarFileSystemWatcherServer.prototype.isWatchError = function (error) {
        return ('code' in error) && ('filename' in error) && error.code !== undefined && error.filename !== undefined;
    };
    /**
     * Given a watch error object, print a user-friendly error message that
     * explains what failed, and what can be done about it.
     *
     * @param error The error thrown by chokidar.
     */
    ChokidarFileSystemWatcherServer.prototype.handleWatchError = function (error) {
        var msg;
        switch (error.code) {
            case 'ENOSPC':
                /* On Linux, exhausted inotify watch limit.  */
                if (this.printedENOSPCError) {
                    return;
                }
                this.printedENOSPCError = true;
                msg = "Theia has reached the inotify file limit.  See: \
https://github.com/theia-ide/theia/blob/master/doc/Developing.md#linux.  This \
message will appear only once.";
                break;
            case 'EPERM':
            case 'EACCES':
                msg = 'Insufficient permissions.';
                break;
            default:
                /* We don't specifically know about this error, just return the
                   code.  */
                msg = error.code;
                break;
        }
        this.logger.error("Error watching " + error.filename + ": " + msg);
    };
    ChokidarFileSystemWatcherServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [Object])
    ], ChokidarFileSystemWatcherServer);
    return ChokidarFileSystemWatcherServer;
}());
exports.ChokidarFileSystemWatcherServer = ChokidarFileSystemWatcherServer;
//# sourceMappingURL=chokidar-filesystem-watcher.js.map