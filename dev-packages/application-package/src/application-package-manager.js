"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var application_package_1 = require("./application-package");
var generator_1 = require("./generator");
var application_process_1 = require("./application-process");
var ApplicationPackageManager = /** @class */ (function () {
    function ApplicationPackageManager(options) {
        this.pck = new application_package_1.ApplicationPackage(options);
        this.process = new application_process_1.ApplicationProcess(this.pck, options.projectPath);
        this.__process = new application_process_1.ApplicationProcess(this.pck, __dirname + "/..");
        this.webpack = new generator_1.WebpackGenerator(this.pck);
        this.backend = new generator_1.BackendGenerator(this.pck);
        this.frontend = new generator_1.FrontendGenerator(this.pck);
    }
    ApplicationPackageManager.prototype.remove = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.pathExists(path)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.remove(path)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationPackageManager.prototype.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.remove(this.pck.lib())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.remove(this.pck.srcGen())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.remove(this.webpack.configPath)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationPackageManager.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.webpack.generate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.backend.generate()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.frontend.generate()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationPackageManager.prototype.copy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.ensureDir(this.pck.lib())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.copy(this.pck.frontend('index.html'), this.pck.lib('index.html'))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationPackageManager.prototype.build = function (args) {
        if (args === void 0) { args = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.copy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.__process.run('webpack', args)];
                }
            });
        });
    };
    ApplicationPackageManager.prototype.start = function (args) {
        if (args === void 0) { args = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.pck.isElectron()) {
                    return [2 /*return*/, this.startElectron(args)];
                }
                return [2 /*return*/, this.startBrowser(args)];
            });
        });
    };
    ApplicationPackageManager.prototype.startElectron = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.__process.bunyan(this.__process.spawnBin('electron', __spread([this.pck.frontend('electron-main.js')], args), {
                        stdio: [0, 'pipe', 'pipe']
                    }))];
            });
        });
    };
    ApplicationPackageManager.prototype.startBrowser = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.__process.bunyan(this.__process.fork(this.pck.backend('main.js'), args, {
                        stdio: [0, 'pipe', 'pipe', 'ipc']
                    }))];
            });
        });
    };
    return ApplicationPackageManager;
}());
exports.ApplicationPackageManager = ApplicationPackageManager;
//# sourceMappingURL=application-package-manager.js.map