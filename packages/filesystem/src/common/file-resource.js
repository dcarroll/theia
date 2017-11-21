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
var core_1 = require("@theia/core");
var filesystem_1 = require("./filesystem");
var filesystem_watcher_1 = require("./filesystem-watcher");
var FileResource = /** @class */ (function () {
    function FileResource(uri, stat, fileSystem, fileSystemWatcher) {
        var _this = this;
        this.uri = uri;
        this.stat = stat;
        this.fileSystem = fileSystem;
        this.fileSystemWatcher = fileSystemWatcher;
        this.toDispose = new core_1.DisposableCollection();
        this.onDidChangeContentsEmitter = new core_1.Emitter();
        this.toDispose.push(this.onDidChangeContentsEmitter);
        this.toDispose.push(this.fileSystemWatcher.onFilesChanged(function (changes) {
            if (changes.some(function (e) { return e.uri.toString() === uri.toString(); })) {
                _this.onDidChangeContentsEmitter.fire(undefined);
            }
        }));
    }
    FileResource.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    FileResource.prototype.readContents = function (options) {
        var _this = this;
        return this.fileSystem.resolveContent(this.uri.toString(), options).then(function (result) {
            _this.stat = result.stat;
            return result.content;
        });
    };
    FileResource.prototype.saveContents = function (content, options) {
        var _this = this;
        return this.fileSystem.setContent(this.stat, content, options).then(function (newStat) {
            _this.stat = newStat;
        });
    };
    Object.defineProperty(FileResource.prototype, "onDidChangeContents", {
        get: function () {
            return this.onDidChangeContentsEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    return FileResource;
}());
exports.FileResource = FileResource;
var FileResourceResolver = /** @class */ (function () {
    function FileResourceResolver(fileSystem, fileSystemWatcher) {
        this.fileSystem = fileSystem;
        this.fileSystemWatcher = fileSystemWatcher;
    }
    FileResourceResolver.prototype.resolve = function (uri) {
        var _this = this;
        if (uri.scheme !== 'file') {
            throw new Error('The given uri is not file uri: ' + uri);
        }
        return this.fileSystem.getFileStat(uri.toString()).then(function (fileStat) {
            if (!fileStat.isDirectory) {
                return new FileResource(uri, fileStat, _this.fileSystem, _this.fileSystemWatcher);
            }
            throw new Error('The given uri is a directory: ' + uri);
        });
    };
    FileResourceResolver = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(filesystem_1.FileSystem)),
        __param(1, inversify_1.inject(filesystem_watcher_1.FileSystemWatcher)),
        __metadata("design:paramtypes", [Object, filesystem_watcher_1.FileSystemWatcher])
    ], FileResourceResolver);
    return FileResourceResolver;
}());
exports.FileResourceResolver = FileResourceResolver;
//# sourceMappingURL=file-resource.js.map