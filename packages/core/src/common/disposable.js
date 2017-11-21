"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var event_1 = require("./event");
var Disposable;
(function (Disposable) {
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
    Disposable.NULL = create(function () { });
})(Disposable = exports.Disposable || (exports.Disposable = {}));
var DisposableCollection = /** @class */ (function () {
    function DisposableCollection() {
        this.disposables = [];
        this.onDisposeEmitter = new event_1.Emitter();
    }
    Object.defineProperty(DisposableCollection.prototype, "onDispose", {
        get: function () {
            return this.onDisposeEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    DisposableCollection.prototype.checkDisposed = function () {
        if (this.disposed) {
            this.onDisposeEmitter.fire(undefined);
        }
    };
    Object.defineProperty(DisposableCollection.prototype, "disposed", {
        get: function () {
            return this.disposables.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    DisposableCollection.prototype.dispose = function () {
        if (this.disposed) {
            return;
        }
        while (!this.disposed) {
            this.disposables.pop().dispose();
        }
        this.checkDisposed();
    };
    DisposableCollection.prototype.push = function (disposable) {
        var _this = this;
        var disposables = this.disposables;
        disposables.push(disposable);
        return Disposable.create(function () {
            var index = disposables.indexOf(disposable);
            if (index !== -1) {
                disposables.splice(index, 1);
            }
            _this.checkDisposed();
        });
    };
    DisposableCollection.prototype.pushAll = function (disposables) {
        var _this = this;
        return disposables.map(function (disposable) {
            return _this.push(disposable);
        });
    };
    return DisposableCollection;
}());
exports.DisposableCollection = DisposableCollection;
//# sourceMappingURL=disposable.js.map