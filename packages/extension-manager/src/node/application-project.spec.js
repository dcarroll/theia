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
var path = require("path");
var temp = require("temp");
var fs = require("fs-extra");
var assert = require("assert");
var extension_node_test_container_1 = require("./test/extension-node-test-container");
var application_project_1 = require("./application-project");
process.on('unhandledRejection', function (reason, promise) {
    throw reason;
});
var appProjectPath;
var appProject;
function assertInstallation(expectation) {
    return __awaiter(this, void 0, void 0, function () {
        var waitForWillInstall, waitForDidInstall, result, _a, _b, extension, _c, _d, extension, e_1, _e, e_2, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    waitForWillInstall = new Promise(function (resolve) { return appProject.onWillInstall(resolve); });
                    waitForDidInstall = new Promise(function (resolve) { return appProject.onDidInstall(resolve); });
                    return [4 /*yield*/, waitForWillInstall];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, waitForDidInstall];
                case 2:
                    result = _g.sent();
                    if (expectation.installed) {
                        try {
                            for (_a = __values(expectation.installed), _b = _a.next(); !_b.done; _b = _a.next()) {
                                extension = _b.value;
                                assert.equal(true, fs.existsSync(path.resolve(appProjectPath, 'node_modules', extension)), extension + ' is not installed');
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    if (expectation.uninstalled) {
                        try {
                            for (_c = __values(expectation.uninstalled), _d = _c.next(); !_d.done; _d = _c.next()) {
                                extension = _d.value;
                                assert.equal(false, fs.existsSync(path.resolve(appProjectPath, 'node_modules', extension)), extension + ' is not uninstalled');
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    assert.equal(true, fs.existsSync(path.resolve(appProjectPath, 'lib', 'bundle.js')), 'the bundle is not generated');
                    assert.equal(false, result.failed, 'the installation is failed');
                    return [2 /*return*/];
            }
        });
    });
}
exports.assertInstallation = assertInstallation;
describe("application-project", function () {
    beforeEach(function () {
        this.timeout(50000);
        var dir = path.resolve(__dirname, '..', '..', 'application-project-test-temp');
        fs.ensureDirSync(dir);
        appProjectPath = temp.mkdirSync({ dir: dir });
        appProject = extension_node_test_container_1.default({
            projectPath: appProjectPath,
            npmClient: 'yarn',
            autoInstall: false,
            watchRegistry: false
        }).get(application_project_1.ApplicationProject);
    });
    afterEach(function () {
        this.timeout(50000);
        appProject.dispose();
        fs.removeSync(appProjectPath);
    });
    it("install", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(1800000);
                        return [4 /*yield*/, fs.writeJSON(path.resolve(appProjectPath, 'package.json'), {
                                "private": true,
                                "dependencies": {
                                    "@theia/core": "0.1.1",
                                    "@theia/filesystem": "0.1.1"
                                }
                            })];
                    case 1:
                        _a.sent();
                        appProject.scheduleInstall();
                        return [4 /*yield*/, assertInstallation({
                                installed: ['@theia/core', '@theia/filesystem']
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fs.writeJSON(path.resolve(appProjectPath, 'package.json'), {
                                "private": true,
                                "dependencies": {
                                    "@theia/core": "0.1.1"
                                }
                            })];
                    case 3:
                        _a.sent();
                        appProject.scheduleInstall();
                        return [4 /*yield*/, assertInstallation({
                                installed: ['@theia/core'],
                                uninstalled: ['@theia/filesystem']
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=application-project.spec.js.map