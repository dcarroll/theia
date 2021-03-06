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
Object.defineProperty(exports, "__esModule", { value: true });
var temp = require("temp");
var path = require("path");
var fs = require("fs-extra");
var assert = require("assert");
var extension_protocol_1 = require("../common/extension-protocol");
var extension_node_test_container_1 = require("./test/extension-node-test-container");
var application_project_1 = require("./application-project");
process.on('unhandledRejection', function (reason, promise) {
    console.error(reason);
    throw reason;
});
var appProjectPath;
var appProject;
var server;
function waitForDidChange() {
    return new Promise(function (resolve) {
        server.setClient({
            onDidChange: function (change) { return resolve(); }
        });
    });
}
exports.waitForDidChange = waitForDidChange;
var dir = path.resolve(__dirname, '..', '..', 'node-extension-server-test-temp');
fs.ensureDirSync(dir);
describe("node-extension-server", function () {
    beforeEach(function () {
        this.timeout(50000);
        appProjectPath = temp.mkdirSync({ dir: dir });
        fs.writeJsonSync(path.resolve(appProjectPath, 'package.json'), {
            "dependencies": {
                "@theia/core": "0.1.0",
                "@theia/extension-manager": "0.1.0"
            }
        });
        var container = extension_node_test_container_1.default({
            projectPath: appProjectPath,
            npmClient: 'yarn',
            autoInstall: false,
            watchRegistry: false
        });
        server = container.get(extension_protocol_1.ExtensionServer);
        appProject = container.get(application_project_1.ApplicationProject);
    });
    afterEach(function () {
        this.timeout(50000);
        server.dispose();
        appProject.dispose();
        fs.removeSync(appProjectPath);
    });
    it("search", function () {
        this.timeout(30000);
        return server.search({
            query: "filesystem scope:theia"
        }).then(function (extensions) {
            assert.equal(extensions.length, 1, JSON.stringify(extensions, undefined, 2));
            assert.equal(extensions[0].name, '@theia/filesystem');
        });
    });
    it("installed", function () {
        this.timeout(10000);
        return server.installed().then(function (extensions) {
            assert.equal(true, extensions.length >= 3, JSON.stringify(extensions, undefined, 2));
            assert.equal(true, extensions.some(function (e) { return e.name === '@theia/core'; }), JSON.stringify(before, undefined, 2));
            assert.equal(true, extensions.some(function (e) { return e.name === '@theia/filesystem'; }), JSON.stringify(before, undefined, 2));
            assert.equal(true, extensions.some(function (e) { return e.name === '@theia/extension-manager'; }), JSON.stringify(before, undefined, 2));
        });
    });
    it("install", function () {
        return __awaiter(this, void 0, void 0, function () {
            var before, onDidChangePackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(10000);
                        return [4 /*yield*/, server.installed()];
                    case 1:
                        before = _a.sent();
                        assert.equal(false, before.some(function (e) { return e.name === '@theia/editor'; }), JSON.stringify(before, undefined, 2));
                        onDidChangePackage = waitForDidChange();
                        return [4 /*yield*/, server.install("@theia/editor")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, onDidChangePackage];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, server.installed().then(function (after) {
                                assert.equal(true, after.some(function (e) { return e.name === '@theia/editor'; }), JSON.stringify(after, undefined, 2));
                            })];
                }
            });
        });
    });
    it("uninstall", function () {
        return __awaiter(this, void 0, void 0, function () {
            var before, onDidChangePackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(10000);
                        return [4 /*yield*/, server.installed()];
                    case 1:
                        before = _a.sent();
                        assert.equal(true, before.some(function (e) { return e.name === '@theia/extension-manager'; }), JSON.stringify(before, undefined, 2));
                        onDidChangePackage = waitForDidChange();
                        return [4 /*yield*/, server.uninstall("@theia/extension-manager")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, onDidChangePackage];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, server.installed().then(function (after) {
                                assert.equal(false, after.some(function (e) { return e.name === '@theia/extension-manager'; }), JSON.stringify(after, undefined, 2));
                            })];
                }
            });
        });
    });
    it("outdated", function () {
        this.timeout(10000);
        return server.outdated().then(function (extensions) {
            assert.equal(extensions.length, 2, JSON.stringify(extensions, undefined, 2));
            assert.deepEqual(extensions.map(function (e) { return e.name; }).sort(), ['@theia/core', '@theia/extension-manager']);
        });
    });
    it("update", function () {
        return __awaiter(this, void 0, void 0, function () {
            var before, onDidChangePackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(10000);
                        return [4 /*yield*/, server.outdated()];
                    case 1:
                        before = _a.sent();
                        assert.equal(true, before.some(function (e) { return e.name === '@theia/core'; }), JSON.stringify(before, undefined, 2));
                        onDidChangePackage = waitForDidChange();
                        return [4 /*yield*/, server.update("@theia/core")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, onDidChangePackage];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, server.outdated().then(function (after) {
                                assert.equal(false, after.some(function (e) { return e.name === '@theia/core'; }), JSON.stringify(after, undefined, 2));
                            })];
                }
            });
        });
    });
    it("list", function () {
        this.timeout(10000);
        return server.list().then(function (extensions) {
            assertExtension({
                name: '@theia/core',
                installed: true,
                outdated: true,
                dependent: undefined
            }, extensions);
            assertExtension({
                name: '@theia/filesystem',
                installed: true,
                outdated: false,
                dependent: '@theia/extension-manager'
            }, extensions);
            assertExtension({
                name: '@theia/extension-manager',
                installed: true,
                outdated: true,
                dependent: undefined
            }, extensions);
        });
    });
    it("list with search", function () {
        this.timeout(30000);
        return server.list({
            query: "scope:theia"
        }).then(function (extensions) {
            var filtered = extensions.filter(function (e) { return ['@theia/core', '@theia/editor'].indexOf(e.name) !== -1; });
            assertExtension({
                name: '@theia/core',
                installed: true,
                outdated: true,
                dependent: undefined
            }, filtered);
            assertExtension({
                name: '@theia/editor',
                installed: false,
                outdated: false,
                dependent: undefined
            }, filtered);
        });
    });
});
function assertExtension(expectation, extensions) {
    var extension = extensions.find(function (e) { return e.name === expectation.name; });
    assert.ok(extension, JSON.stringify(extensions, undefined, 2));
    assert.deepEqual(expectation, Object.assign({}, {
        name: extension.name,
        installed: extension.installed,
        outdated: extension.outdated,
        dependent: extension.dependent
    }), JSON.stringify(extensions, undefined, 2));
}
//# sourceMappingURL=node-extension-server.slow-spec.js.map