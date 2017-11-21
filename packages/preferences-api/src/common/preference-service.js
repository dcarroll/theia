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
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var preference_protocol_1 = require("./preference-protocol");
var PreferenceService = /** @class */ (function () {
    function PreferenceService(server) {
        var _this = this;
        this.server = server;
        this.prefCache = {};
        this.toDispose = new common_1.DisposableCollection();
        this.onPreferenceChangedEmitter = new common_1.Emitter();
        this.ready = new Promise(function (resolve) {
            _this.resolveReady = resolve;
        });
        server.setClient({
            onDidChangePreference: function (event) { return _this.onDidChangePreference(event); }
        });
        this.toDispose.push(server);
    }
    PreferenceService.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    PreferenceService.prototype.onDidChangePreference = function (event) {
        try {
            for (var _a = __values(event.changes), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prefChange = _b.value;
                if (prefChange.newValue === undefined || prefChange.newValue === null) {
                    delete this.prefCache[prefChange.preferenceName];
                }
                else if (prefChange.newValue !== undefined) {
                    this.prefCache[prefChange.preferenceName] = prefChange.newValue;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.resolveReady();
        try {
            for (var _d = __values(event.changes), _e = _d.next(); !_e.done; _e = _d.next()) {
                var change = _e.value;
                this.onPreferenceChangedEmitter.fire(change);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_1, _c, e_2, _f;
    };
    Object.defineProperty(PreferenceService.prototype, "onPreferenceChanged", {
        get: function () {
            return this.onPreferenceChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    PreferenceService.prototype.has = function (preferenceName) {
        return this.prefCache[preferenceName] !== undefined;
    };
    PreferenceService.prototype.get = function (preferenceName, defaultValue) {
        var value = this.prefCache[preferenceName];
        return value !== null && value !== undefined ? value : defaultValue;
    };
    PreferenceService.prototype.getBoolean = function (preferenceName, defaultValue) {
        var value = this.prefCache[preferenceName];
        return value !== null && value !== undefined ? !!value : defaultValue;
    };
    PreferenceService.prototype.getString = function (preferenceName, defaultValue) {
        var value = this.prefCache[preferenceName];
        if (value === null || value === undefined) {
            return defaultValue;
        }
        if (typeof value === "string") {
            return value;
        }
        return value.toString();
    };
    PreferenceService.prototype.getNumber = function (preferenceName, defaultValue) {
        var value = this.prefCache[preferenceName];
        if (value === null || value === undefined) {
            return defaultValue;
        }
        if (typeof value === "number") {
            return value;
        }
        return Number(value);
    };
    PreferenceService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(preference_protocol_1.PreferenceServer)),
        __metadata("design:paramtypes", [Object])
    ], PreferenceService);
    return PreferenceService;
}());
exports.PreferenceService = PreferenceService;
//# sourceMappingURL=preference-service.js.map