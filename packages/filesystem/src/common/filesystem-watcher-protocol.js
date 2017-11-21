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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
exports.fileSystemWatcherPath = '/services/fs-watcher';
exports.FileSystemWatcherServer = Symbol('FileSystemWatcherServer');
var FileChangeType;
(function (FileChangeType) {
    FileChangeType[FileChangeType["UPDATED"] = 0] = "UPDATED";
    FileChangeType[FileChangeType["ADDED"] = 1] = "ADDED";
    FileChangeType[FileChangeType["DELETED"] = 2] = "DELETED";
})(FileChangeType = exports.FileChangeType || (exports.FileChangeType = {}));
exports.FileSystemWatcherServerProxy = Symbol('FileSystemWatcherServerProxy');
var ReconnectingFileSystemWatcherServer = /** @class */ (function () {
    function ReconnectingFileSystemWatcherServer(proxy) {
        var _this = this;
        this.proxy = proxy;
        this.watcherSequence = 1;
        this.watchParams = new Map();
        this.localToRemoteWatcher = new Map();
        this.proxy.onDidOpenConnection(function () { return _this.reconnect(); });
    }
    ReconnectingFileSystemWatcherServer.prototype.reconnect = function () {
        try {
            for (var _a = __values(this.watchParams.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), watcher = _c[0], _d = _c[1], uri = _d.uri, options = _d.options;
                this.doWatchFileChanges(watcher, uri, options);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _e;
    };
    ReconnectingFileSystemWatcherServer.prototype.dispose = function () {
        this.proxy.dispose();
    };
    ReconnectingFileSystemWatcherServer.prototype.watchFileChanges = function (uri, options) {
        var watcher = this.watcherSequence++;
        this.watchParams.set(watcher, { uri: uri, options: options });
        return this.doWatchFileChanges(watcher, uri, options);
    };
    ReconnectingFileSystemWatcherServer.prototype.doWatchFileChanges = function (watcher, uri, options) {
        var _this = this;
        return this.proxy.watchFileChanges(uri, options).then(function (remote) {
            _this.localToRemoteWatcher.set(watcher, remote);
            return watcher;
        });
    };
    ReconnectingFileSystemWatcherServer.prototype.unwatchFileChanges = function (watcher) {
        this.watchParams.delete(watcher);
        var remote = this.localToRemoteWatcher.get(watcher);
        if (remote) {
            this.localToRemoteWatcher.delete(watcher);
            return this.proxy.unwatchFileChanges(remote);
        }
        return Promise.resolve();
    };
    ReconnectingFileSystemWatcherServer.prototype.setClient = function (client) {
        this.proxy.setClient(client);
    };
    ReconnectingFileSystemWatcherServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.FileSystemWatcherServerProxy)),
        __metadata("design:paramtypes", [Object])
    ], ReconnectingFileSystemWatcherServer);
    return ReconnectingFileSystemWatcherServer;
}());
exports.ReconnectingFileSystemWatcherServer = ReconnectingFileSystemWatcherServer;
//# sourceMappingURL=filesystem-watcher-protocol.js.map