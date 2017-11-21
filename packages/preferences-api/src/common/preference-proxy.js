"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@theia/core/lib/common");
var Ajv = require("ajv");
function createPreferenceProxy(preferences, configuration, schema) {
    var toDispose = new common_1.DisposableCollection();
    var onPreferenceChangedEmitter = new common_1.Emitter();
    toDispose.push(onPreferenceChangedEmitter);
    toDispose.push(preferences.onPreferenceChanged(function (e) {
        if (e.preferenceName in configuration) {
            if (e.newValue) {
                // Fire the pref if it's valid according to the schema
                if (validatePreference(schema, (_a = {},
                    _a[e.preferenceName] = e.newValue,
                    _a))) {
                    onPreferenceChangedEmitter.fire(e);
                }
                else {
                    // Fire the default preference
                    onPreferenceChangedEmitter.fire({
                        preferenceName: e.preferenceName,
                        newValue: configuration[e.preferenceName]
                    });
                }
            }
            else {
                onPreferenceChangedEmitter.fire(e);
            }
        }
        var _a;
    }));
    return new Proxy({}, {
        get: function (_, p) {
            if (p in configuration) {
                var preference = preferences.get(p, configuration[p]);
                if (validatePreference(schema, (_a = {},
                    _a[p] = preference,
                    _a))) {
                    return preference;
                }
                else {
                    return configuration[p];
                }
            }
            if (p === 'onPreferenceChanged') {
                return onPreferenceChangedEmitter.event;
            }
            if (p === 'dispose') {
                return function () { return toDispose.dispose(); };
            }
            if (p === 'ready') {
                return function () { return preferences.ready; };
            }
            throw new Error('unexpected property: ' + p);
            var _a;
        }
    });
}
exports.createPreferenceProxy = createPreferenceProxy;
function validatePreference(schema, preference) {
    var ajv = new Ajv();
    return ajv.validate(schema, preference);
}
exports.validatePreference = validatePreference;
//# sourceMappingURL=preference-proxy.js.map