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
var showdown = require("showdown");
var sanitize = require("sanitize-html");
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var application_package_1 = require("@theia/application-package");
var npms = require("./npms");
var application_project_1 = require("./application-project");
exports.ExtensionKeywords = Symbol('ExtensionKeyword');
var NodeExtensionServer = /** @class */ (function () {
    function NodeExtensionServer(project, extensionKeywords) {
        var _this = this;
        this.project = project;
        this.extensionKeywords = extensionKeywords;
        this.toDispose = new core_1.DisposableCollection();
        this.busyExtensions = new Set();
        this.toDispose.push(project.onWillInstall(function (param) { return _this.notification('onWillStartInstallation')(param); }));
        this.toDispose.push(project.onDidInstall(function (result) { return _this.notification('onDidStopInstallation')(result); }));
    }
    NodeExtensionServer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    NodeExtensionServer.prototype.setClient = function (client) {
        this.client = client;
    };
    NodeExtensionServer.prototype.notification = function (notification) {
        return this.client ? this.client[notification] : function () { };
    };
    NodeExtensionServer.prototype.search = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, query, packages, extensions, packages_1, packages_1_1, raw, extensionPackage, extension, e_1_1, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        manager = this.project.createPackageManager();
                        query = this.prepareQuery(param.query);
                        return [4 /*yield*/, npms.search(query, param.from, param.size)];
                    case 1:
                        packages = _b.sent();
                        extensions = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        packages_1 = __values(packages), packages_1_1 = packages_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!packages_1_1.done) return [3 /*break*/, 6];
                        raw = packages_1_1.value;
                        if (!application_package_1.PublishedNodePackage.is(raw)) return [3 /*break*/, 5];
                        return [4 /*yield*/, manager.pck.findExtensionPackage(raw.name)];
                    case 4:
                        extensionPackage = _b.sent();
                        if (extensionPackage) {
                            extension = this.toRawExtension(extensionPackage);
                            extensions.push(extension);
                        }
                        _b.label = 5;
                    case 5:
                        packages_1_1 = packages_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (packages_1_1 && !packages_1_1.done && (_a = packages_1.return)) _a.call(packages_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, extensions];
                }
            });
        });
    };
    NodeExtensionServer.prototype.prepareQuery = function (query) {
        var args = query.split(/\s+/).map(function (v) { return v.toLowerCase().trim(); }).filter(function (v) { return !!v; });
        return __spread(["keywords:" + this.extensionKeywords.join(',')], args).join(' ');
    };
    NodeExtensionServer.prototype.resolveRaw = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, extensionPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = this.project.createPackageManager();
                        return [4 /*yield*/, manager.pck.findExtensionPackage(extension)];
                    case 1:
                        extensionPackage = _a.sent();
                        if (!extensionPackage) {
                            throw new Error('The extension package is not found for ' + extension);
                        }
                        return [2 /*return*/, this.toResolvedRawExtension(extensionPackage)];
                }
            });
        });
    };
    NodeExtensionServer.prototype.installed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var manager;
            return __generator(this, function (_a) {
                manager = this.project.createPackageManager();
                return [2 /*return*/, manager.pck.extensionPackages.map(function (pck) { return _this.toRawExtension(pck); })];
            });
        });
    };
    NodeExtensionServer.prototype.install = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, extensionPackage, latestVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setBusy(extension, true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 6, 7]);
                        manager = this.project.createPackageManager();
                        return [4 /*yield*/, manager.pck.findExtensionPackage(extension)];
                    case 2:
                        extensionPackage = _a.sent();
                        if (!extensionPackage) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extensionPackage.getLatestVersion()];
                    case 3:
                        latestVersion = _a.sent();
                        if (!latestVersion) {
                            return [2 /*return*/];
                        }
                        if (!manager.pck.setDependency(extension, "^" + latestVersion)) return [3 /*break*/, 5];
                        this.notifyDidChange({
                            name: extension,
                            installed: true
                        });
                        return [4 /*yield*/, manager.pck.save()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.setBusy(extension, false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NodeExtensionServer.prototype.uninstall = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setBusy(extension, true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 4, 5]);
                        manager = this.project.createPackageManager();
                        if (!manager.pck.setDependency(extension, undefined)) return [3 /*break*/, 3];
                        this.notifyDidChange({
                            name: extension,
                            installed: false,
                            outdated: false
                        });
                        return [4 /*yield*/, manager.pck.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.setBusy(extension, false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NodeExtensionServer.prototype.outdated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, promises, manager, _loop_1, _a, _b, extensionPackage, e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = [];
                        promises = [];
                        manager = this.project.createPackageManager();
                        _loop_1 = function (extensionPackage) {
                            promises.push(extensionPackage.isOutdated().then(function (outdated) {
                                if (outdated) {
                                    result.push(_this.toRawExtension(extensionPackage));
                                }
                            }));
                        };
                        try {
                            for (_a = __values(manager.pck.extensionPackages), _b = _a.next(); !_b.done; _b = _a.next()) {
                                extensionPackage = _b.value;
                                _loop_1(extensionPackage);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    NodeExtensionServer.prototype.update = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, extensionPackage, latestVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setBusy(extension, true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 6, 7]);
                        manager = this.project.createPackageManager();
                        extensionPackage = manager.pck.getExtensionPackage(extension);
                        if (!extensionPackage || !extensionPackage.version) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extensionPackage.isOutdated()];
                    case 2:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extensionPackage.getLatestVersion()];
                    case 3:
                        latestVersion = _a.sent();
                        if (!latestVersion) {
                            return [2 /*return*/];
                        }
                        if (!manager.pck.setDependency(extension, "^" + latestVersion)) return [3 /*break*/, 5];
                        this.notifyDidChange({
                            name: extension,
                            outdated: false
                        });
                        return [4 /*yield*/, manager.pck.save()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.setBusy(extension, false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NodeExtensionServer.prototype.list = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var manager, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = this.project.createPackageManager();
                        if (!(param && param.query)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.search(param)];
                    case 1:
                        found = _a.sent();
                        return [2 /*return*/, Promise.all(found.map(function (raw) {
                                var extensionPackage = manager.pck.getExtensionPackage(raw.name);
                                if (extensionPackage) {
                                    return _this.toExtension(extensionPackage);
                                }
                                return Object.assign(raw, {
                                    busy: _this.isBusy(raw.name),
                                    installed: false,
                                    outdated: false
                                });
                            }))];
                    case 2: return [2 /*return*/, Promise.all(manager.pck.extensionPackages.map(function (pck) { return _this.toExtension(pck); }))];
                }
            });
        });
    };
    NodeExtensionServer.prototype.resolve = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, extensionPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.project.createPackageManager()];
                    case 1:
                        manager = _a.sent();
                        return [4 /*yield*/, manager.pck.findExtensionPackage(extension)];
                    case 2:
                        extensionPackage = _a.sent();
                        if (!extensionPackage) {
                            throw new Error('The extension package is not found for ' + extension);
                        }
                        return [2 /*return*/, this.toResolvedExtension(extensionPackage)];
                }
            });
        });
    };
    NodeExtensionServer.prototype.toResolvedExtension = function (extensionPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedRawExtension;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toResolvedRawExtension(extensionPackage)];
                    case 1:
                        resolvedRawExtension = _a.sent();
                        return [2 /*return*/, this.withExtensionPackage(resolvedRawExtension, extensionPackage)];
                }
            });
        });
    };
    NodeExtensionServer.prototype.toResolvedRawExtension = function (extensionPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var rawExtension, documentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawExtension = this.toRawExtension(extensionPackage);
                        return [4 /*yield*/, this.compileDocumentation(extensionPackage)];
                    case 1:
                        documentation = _a.sent();
                        return [2 /*return*/, Object.assign(rawExtension, {
                                documentation: documentation
                            })];
                }
            });
        });
    };
    NodeExtensionServer.prototype.compileDocumentation = function (extensionPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var markdownConverter, readme, readmeHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        markdownConverter = new showdown.Converter({
                            noHeaderId: true,
                            strikethrough: true,
                            headerLevelStart: 2
                        });
                        return [4 /*yield*/, extensionPackage.getReadme()];
                    case 1:
                        readme = _a.sent();
                        readmeHtml = markdownConverter.makeHtml(readme);
                        return [2 /*return*/, sanitize(readmeHtml, {
                                allowedTags: sanitize.defaults.allowedTags.concat(['h1', 'h2', 'img'])
                            })];
                }
            });
        });
    };
    NodeExtensionServer.prototype.toExtension = function (extensionPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var rawExtension;
            return __generator(this, function (_a) {
                rawExtension = this.toRawExtension(extensionPackage);
                return [2 /*return*/, this.withExtensionPackage(rawExtension, extensionPackage)];
            });
        });
    };
    NodeExtensionServer.prototype.withExtensionPackage = function (raw, extensionPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = Object).assign;
                        _c = [raw];
                        _d = {
                            installed: extensionPackage.installed
                        };
                        return [4 /*yield*/, extensionPackage.isOutdated()];
                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([(_d.outdated = _e.sent(),
                                _d.busy = this.isBusy(extensionPackage.name),
                                _d.dependent = extensionPackage.dependent,
                                _d)]))];
                }
            });
        });
    };
    NodeExtensionServer.prototype.toRawExtension = function (extensionPackage) {
        return {
            name: extensionPackage.name,
            version: extensionPackage.version,
            description: extensionPackage.description,
            author: extensionPackage.getAuthor()
        };
    };
    NodeExtensionServer.prototype.isBusy = function (extension) {
        return this.busyExtensions.has(extension);
    };
    NodeExtensionServer.prototype.setBusy = function (extension, busy) {
        if (busy) {
            this.busyExtensions.add(extension);
        }
        else {
            this.busyExtensions.delete(extension);
        }
        this.notifyDidChange({
            name: extension,
            busy: busy
        });
    };
    NodeExtensionServer.prototype.notifyDidChange = function (change) {
        this.notification('onDidChange')(change);
    };
    NodeExtensionServer.prototype.scheduleInstall = function () {
        return this.project.scheduleInstall();
    };
    NodeExtensionServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(application_project_1.ApplicationProject)),
        __param(1, inversify_1.inject(exports.ExtensionKeywords)),
        __metadata("design:paramtypes", [application_project_1.ApplicationProject, Array])
    ], NodeExtensionServer);
    return NodeExtensionServer;
}());
exports.NodeExtensionServer = NodeExtensionServer;
//# sourceMappingURL=node-extension-server.js.map