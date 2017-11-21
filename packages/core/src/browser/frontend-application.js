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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var common_1 = require("../common");
var shell_1 = require("./shell");
var widgets_1 = require("./widgets");
var common_2 = require("../common");
var shell_layout_restorer_1 = require("./shell-layout-restorer");
/**
 * Clients can implement to get a callback for contributing widgets to a shell on start.
 */
exports.FrontendApplicationContribution = Symbol("FrontendApplicationContribution");
var FrontendApplication = /** @class */ (function () {
    function FrontendApplication(commands, menus, keybindings, logger, layoutRestorer, contributions, _shell) {
        this.commands = commands;
        this.menus = menus;
        this.keybindings = keybindings;
        this.logger = logger;
        this.layoutRestorer = layoutRestorer;
        this.contributions = contributions;
        this._shell = _shell;
    }
    Object.defineProperty(FrontendApplication.prototype, "shell", {
        get: function () {
            return this._shell;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start the frontend application.
     *
     * Start up consists of the following steps:
     * - create the application shell
     * - start frontend contributions
     * - display the application shell
     */
    FrontendApplication.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.startContributions();
                        return [4 /*yield*/, this.layoutRestorer.initializeLayout(this, this.contributions.getContributions())];
                    case 1:
                        _a.sent();
                        this.ensureLoaded().then(function () {
                            return _this.attachShell();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FrontendApplication.prototype.attachShell = function () {
        var _this = this;
        var host = this.getHost();
        widgets_1.Widget.attach(this.shell, host);
        window.addEventListener('resize', function () { return _this.shell.update(); });
        document.addEventListener('keydown', function (event) { return _this.keybindings.run(event); }, true);
    };
    FrontendApplication.prototype.getHost = function () {
        return document.body;
    };
    FrontendApplication.prototype.ensureLoaded = function () {
        if (document.body) {
            return Promise.resolve();
        }
        return new Promise(function (resolve) {
            return window.onload = function () { return resolve(); };
        });
    };
    FrontendApplication.prototype.startContributions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, contribution, _c, _d, contribution, err_1, e_1_1, e_2, _e, e_1, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        try {
                            for (_a = __values(this.contributions.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                contribution = _b.value;
                                if (contribution.initialize) {
                                    try {
                                        contribution.initialize();
                                    }
                                    catch (err) {
                                        this.logger.error(err.toString());
                                    }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        /**
                         * FIXME:
                         * - decouple commands & menus
                         * - consider treat commands, keybindings and menus as frontend application contributions
                         */
                        this.commands.onStart();
                        this.keybindings.onStart();
                        this.menus.onStart();
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 10]);
                        _c = __values(this.contributions.getContributions()), _d = _c.next();
                        _g.label = 2;
                    case 2:
                        if (!!_d.done) return [3 /*break*/, 7];
                        contribution = _d.value;
                        if (!contribution.onStart) return [3 /*break*/, 6];
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, contribution.onStart(this)];
                    case 4:
                        _g.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _g.sent();
                        this.logger.error(err_1.toString());
                        return [3 /*break*/, 6];
                    case 6:
                        _d = _c.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        window.onunload = function () {
                            _this.layoutRestorer.storeLayout(_this);
                            try {
                                for (var _a = __values(_this.contributions.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    var contribution = _b.value;
                                    if (contribution.onStop) {
                                        try {
                                            contribution.onStop(_this);
                                        }
                                        catch (err) {
                                            _this.logger.error(err.toString());
                                        }
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            var e_3, _c;
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    FrontendApplication = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandRegistry)),
        __param(1, inversify_1.inject(common_1.MenuModelRegistry)),
        __param(2, inversify_1.inject(common_1.KeybindingRegistry)),
        __param(3, inversify_1.inject(common_2.ILogger)),
        __param(4, inversify_1.inject(shell_layout_restorer_1.ShellLayoutRestorer)),
        __param(5, inversify_1.inject(common_1.ContributionProvider)), __param(5, inversify_1.named(exports.FrontendApplicationContribution)),
        __param(6, inversify_1.inject(shell_1.ApplicationShell)),
        __metadata("design:paramtypes", [common_1.CommandRegistry,
            common_1.MenuModelRegistry,
            common_1.KeybindingRegistry, Object, shell_layout_restorer_1.ShellLayoutRestorer, Object, shell_1.ApplicationShell])
    ], FrontendApplication);
    return FrontendApplication;
}());
exports.FrontendApplication = FrontendApplication;
//# sourceMappingURL=frontend-application.js.map