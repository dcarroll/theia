"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
var coreutils_1 = require("@phosphor/coreutils");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var common_2 = require("@theia/filesystem/lib/common");
var filesystem_watcher_protocol_1 = require("@theia/filesystem/lib/common/filesystem-watcher-protocol");
var jsoncparser = require("jsonc-parser");
exports.PreferenceUri = Symbol("PreferencePath");
var JsonPreferenceServer = /** @class */ (function () {
    function JsonPreferenceServer(fileSystem, watcherServer, logger, preferenceUri) {
        var _this = this;
        this.fileSystem = fileSystem;
        this.watcherServer = watcherServer;
        this.logger = logger;
        this.toDispose = new common_1.DisposableCollection();
        this.preferenceUri = Promise.resolve(preferenceUri).then(function (uri) { return uri.toString(); });
        this.toDispose.push(watcherServer);
        watcherServer.setClient({
            onDidFilesChanged: function (p) { return _this.onDidFilesChanged(p); }
        });
        this.preferenceUri.then(function (uri) {
            return watcherServer.watchFileChanges(uri).then(function (id) {
                _this.toDispose.push(common_1.Disposable.create(function () {
                    return watcherServer.unwatchFileChanges(id);
                }));
            });
        });
        this.ready = this.reconcilePreferences();
    }
    JsonPreferenceServer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    JsonPreferenceServer.prototype.onDidFilesChanged = function (params) {
        var _this = this;
        this.arePreferencesAffected(params.changes).then(function () {
            return _this.reconcilePreferences();
        });
    };
    /**
     * Checks to see if the preference file was modified
     */
    JsonPreferenceServer.prototype.arePreferencesAffected = function (changes) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.preferenceUri.then(function (uri) {
                if (changes.some(function (c) { return c.uri === uri; })) {
                    resolve();
                }
            });
        });
    };
    JsonPreferenceServer.prototype.reconcilePreferences = function () {
        var _this = this;
        return this.readPreferences().then(function (preferences) {
            return _this.doReconcilePreferences(preferences);
        });
    };
    JsonPreferenceServer.prototype.readPreferences = function () {
        var _this = this;
        return this.preferenceUri.then(function (uri) {
            return _this.fileSystem.exists(uri).then(function (exists) {
                if (!exists) {
                    return undefined;
                }
                return _this.fileSystem.resolveContent(uri).then(function (_a) {
                    var stat = _a.stat, content = _a.content;
                    var strippedContent = jsoncparser.stripComments(content);
                    var errors = [];
                    var preferences = jsoncparser.parse(strippedContent, errors);
                    if (errors.length) {
                        try {
                            for (var errors_1 = __values(errors), errors_1_1 = errors_1.next(); !errors_1_1.done; errors_1_1 = errors_1.next()) {
                                var error = errors_1_1.value;
                                _this.logger.error("JSON parsing error", error);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (errors_1_1 && !errors_1_1.done && (_b = errors_1.return)) _b.call(errors_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    return preferences;
                    var e_1, _b;
                });
            }).catch(function (reason) {
                if (reason) {
                    _this.logger.error("Failed to read preferences " + uri + ":", reason);
                }
                return undefined;
            });
        });
    };
    JsonPreferenceServer.prototype.doReconcilePreferences = function (preferences) {
        if (preferences) {
            if (this.preferences) {
                this.fireChanged(this.preferences, preferences);
            }
            else {
                this.fireNew(preferences);
            }
        }
        else if (this.preferences) {
            this.fireRemoved(this.preferences);
        }
        this.preferences = preferences;
    };
    JsonPreferenceServer.prototype.fireNew = function (preferences) {
        var changes = [];
        // tslint:disable-next-line:forin
        for (var preferenceName in preferences) {
            var newValue = preferences[preferenceName];
            changes.push({
                preferenceName: preferenceName, newValue: newValue
            });
        }
        this.fireEvent({ changes: changes });
    };
    JsonPreferenceServer.prototype.fireRemoved = function (preferences) {
        var changes = [];
        // tslint:disable-next-line:forin
        for (var preferenceName in preferences) {
            var oldValue = preferences[preferenceName];
            changes.push({
                preferenceName: preferenceName, oldValue: oldValue
            });
        }
        this.fireEvent({ changes: changes });
    };
    JsonPreferenceServer.prototype.fireChanged = function (target, source) {
        var deleted = new Set(Object.keys(target));
        var changes = [];
        // tslint:disable-next-line:forin
        for (var preferenceName in source) {
            deleted.delete(preferenceName);
            var newValue = source[preferenceName];
            if (preferenceName in target) {
                var oldValue = target[preferenceName];
                if (!coreutils_1.JSONExt.deepEqual(oldValue, newValue)) {
                    changes.push({ preferenceName: preferenceName, newValue: newValue, oldValue: oldValue });
                }
            }
            else {
                changes.push({ preferenceName: preferenceName, newValue: newValue });
            }
        }
        try {
            for (var deleted_1 = __values(deleted), deleted_1_1 = deleted_1.next(); !deleted_1_1.done; deleted_1_1 = deleted_1.next()) {
                var preferenceName = deleted_1_1.value;
                var oldValue = target[preferenceName];
                changes.push({ preferenceName: preferenceName, oldValue: oldValue });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (deleted_1_1 && !deleted_1_1.done && (_a = deleted_1.return)) _a.call(deleted_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.fireEvent({ changes: changes });
        var e_2, _a;
    };
    JsonPreferenceServer.prototype.fireEvent = function (event) {
        this.logger.debug(function (log) {
            return log('onDidChangePreference:', event);
        });
        if (this.client) {
            this.client.onDidChangePreference(event);
        }
    };
    JsonPreferenceServer.prototype.has = function (preferenceName) {
        var _this = this;
        return this.ready.then(function () {
            return !!_this.preferences && (preferenceName in _this.preferences);
        });
    };
    JsonPreferenceServer.prototype.get = function (preferenceName) {
        var _this = this;
        return this.ready.then(function () {
            return !!_this.preferences ? _this.preferences[preferenceName] : undefined;
        });
    };
    JsonPreferenceServer.prototype.setClient = function (client) {
        this.client = client;
    };
    JsonPreferenceServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_2.FileSystem)),
        __param(1, inversify_1.inject(filesystem_watcher_protocol_1.FileSystemWatcherServer)),
        __param(2, inversify_1.inject(common_1.ILogger)),
        __param(3, inversify_1.inject(exports.PreferenceUri)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], JsonPreferenceServer);
    return JsonPreferenceServer;
}());
exports.JsonPreferenceServer = JsonPreferenceServer;
//# sourceMappingURL=json-preference-server.js.map