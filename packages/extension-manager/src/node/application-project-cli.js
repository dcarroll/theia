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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var appProjectPath = 'app-project-path';
var appNpmClient = 'app-npm-client';
var appAutoInstall = 'app-auto-install';
var appWatchRegistry = 'app-watch-registry';
var ApplicationProjectCliContribution = /** @class */ (function () {
    function ApplicationProjectCliContribution() {
    }
    Object.defineProperty(ApplicationProjectCliContribution.prototype, "args", {
        get: function () {
            return this._args;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationProjectCliContribution.prototype.configure = function (conf) {
        conf.option(appProjectPath, {
            description: "Sets the application project directory",
            default: process.cwd()
        });
        conf.option(appNpmClient, {
            description: "Sets the application npm client",
            choices: ["npm", "yarn"],
            default: "yarn"
        });
        conf.option(appAutoInstall, {
            description: "Sets whether the application should be build on package.json changes",
            type: "boolean",
            default: true
        });
        conf.option(appWatchRegistry, {
            type: "boolean",
            default: true
        });
    };
    ApplicationProjectCliContribution.prototype.setArguments = function (args) {
        this._args = {
            projectPath: args[appProjectPath],
            npmClient: args[appNpmClient],
            autoInstall: args[appAutoInstall],
            watchRegistry: args[appWatchRegistry]
        };
    };
    ApplicationProjectCliContribution = __decorate([
        inversify_1.injectable()
    ], ApplicationProjectCliContribution);
    return ApplicationProjectCliContribution;
}());
exports.ApplicationProjectCliContribution = ApplicationProjectCliContribution;
//# sourceMappingURL=application-project-cli.js.map