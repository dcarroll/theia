"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var CompoundPreferenceServer = /** @class */ (function () {
    function CompoundPreferenceServer() {
        var servers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            servers[_i] = arguments[_i];
        }
        var _this = this;
        this.servers = servers;
        try {
            for (var servers_1 = __values(servers), servers_1_1 = servers_1.next(); !servers_1_1.done; servers_1_1 = servers_1.next()) {
                var server = servers_1_1.value;
                server.setClient({
                    onDidChangePreference: function (event) { return _this.onDidChangePreference(event); }
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (servers_1_1 && !servers_1_1.done && (_a = servers_1.return)) _a.call(servers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    }
    // TODO scope management should happen here
    CompoundPreferenceServer.prototype.onDidChangePreference = function (event) {
        // TODO only fire when all pref servers are ready (scope management)
        if (this.client) {
            this.client.onDidChangePreference(event);
        }
    };
    CompoundPreferenceServer.prototype.dispose = function () {
        try {
            for (var _a = __values(this.servers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var server = _b.value;
                server.dispose();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    CompoundPreferenceServer.prototype.setClient = function (client) {
        this.client = client;
    };
    return CompoundPreferenceServer;
}());
exports.CompoundPreferenceServer = CompoundPreferenceServer;
//# sourceMappingURL=compound-preference-server.js.map