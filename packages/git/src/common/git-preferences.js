"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var preferences_api_1 = require("@theia/preferences-api");
var DefaultGitConfiguration = {
    'git.pollInterval': 1000
};
exports.GitPreferenceSchema = {
    'type': 'object',
    'properties': {
        'git.pollInterval': {
            'type': 'number',
            'minimum': 100,
            'description': 'The time-interval (in milliseconds) to poll for the status changes in the local working directory.'
        }
    }
};
exports.GitPreferences = Symbol('GitPreferences');
function createGitPreferences(preferences) {
    return preferences_api_1.createPreferenceProxy(preferences, DefaultGitConfiguration, exports.GitPreferenceSchema);
}
function bindGitPreferences(bind) {
    bind(exports.GitPreferences).toDynamicValue(function (context) { return createGitPreferences(context.container.get(preferences_api_1.PreferenceService)); });
}
exports.bindGitPreferences = bindGitPreferences;
//# sourceMappingURL=git-preferences.js.map