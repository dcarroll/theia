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
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var inversify_1 = require("inversify");
var contribution_provider_1 = require("../common/contribution-provider");
exports.CliContribution = Symbol('CliContribution');
var CliManager = /** @class */ (function () {
    function CliManager(contributionsProvider) {
        this.contributionsProvider = contributionsProvider;
    }
    CliManager.prototype.initializeCli = function () {
        var pack = require('../../package.json');
        var version = pack.version;
        var command = yargs.version(version);
        command.exitProcess(this.isExit());
        try {
            for (var _a = __values(this.contributionsProvider.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var contrib = _b.value;
                contrib.configure(command);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var args = command
            .detectLocale(false)
            .showHelpOnFail(false, 'Specify --help for available options')
            .help('help')
            .parse(this.getArgs());
        try {
            for (var _d = __values(this.contributionsProvider.getContributions()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var contrib = _e.value;
                contrib.setArguments(args);
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
    CliManager.prototype.getArgs = function () {
        return process.argv;
    };
    CliManager.prototype.isExit = function () {
        return true;
    };
    CliManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.CliContribution)),
        __metadata("design:paramtypes", [Object])
    ], CliManager);
    return CliManager;
}());
exports.CliManager = CliManager;
//# sourceMappingURL=cli.js.map