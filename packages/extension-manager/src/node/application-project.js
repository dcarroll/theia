"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var paths = require("path");
var fs = require("fs-extra");
var inversify_1 = require("inversify");
var application_package_1 = require("@theia/application-package");
var core_1 = require("@theia/core");
var node_1 = require("@theia/core/lib/node");
var filesystem_watcher_protocol_1 = require("@theia/filesystem/lib/common/filesystem-watcher-protocol");
var npm_client_1 = require("./npm-client");
var ApplicationProjectOptions = /** @class */ (function (_super) {
    __extends(ApplicationProjectOptions, _super);
    function ApplicationProjectOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationProjectOptions = __decorate([
        inversify_1.injectable()
    ], ApplicationProjectOptions);
    return ApplicationProjectOptions;
}(application_package_1.ApplicationPackageOptions));
exports.ApplicationProjectOptions = ApplicationProjectOptions;
var ApplicationProject = /** @class */ (function () {
    function ApplicationProject(options, fileSystemWatcher, logger, npmClient, serverProcess) {
        var _this = this;
        this.options = options;
        this.fileSystemWatcher = fileSystemWatcher;
        this.logger = logger;
        this.npmClient = npmClient;
        this.serverProcess = serverProcess;
        this.toDispose = new core_1.DisposableCollection();
        this.onChangePackageEmitter = new core_1.Emitter();
        this.onWillInstallEmitter = new core_1.Emitter();
        this.onDidInstallEmitter = new core_1.Emitter();
        this.installed = Promise.resolve();
        this.installationTokenSource = new core_1.CancellationTokenSource();
        logger.debug('AppProjectOptions', options);
        this.registry = new application_package_1.NpmRegistry({
            watchChanges: this.options.watchRegistry
        });
        this.backup();
        this.packageUri = node_1.FileUri.create(this.packagePath).toString();
        this.toDispose.push(this.fileSystemWatcher);
        this.fileSystemWatcher.setClient({
            onDidFilesChanged: function (changes) { return _this.onDidFilesChanged(changes); }
        });
        this.fileSystemWatcher.watchFileChanges(this.packageUri).then(function (watcher) {
            return _this.toDispose.push(core_1.Disposable.create(function () {
                return _this.fileSystemWatcher.unwatchFileChanges(watcher);
            }));
        });
        this.toDispose.push(this.onWillInstallEmitter);
        this.toDispose.push(this.onDidInstallEmitter);
    }
    ApplicationProject.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(ApplicationProject.prototype, "onDidChangePackage", {
        get: function () {
            return this.onChangePackageEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationProject.prototype.fireDidChangePackage = function () {
        this.onChangePackageEmitter.fire(undefined);
    };
    ApplicationProject.prototype.isPackageChanged = function (param) {
        var _this = this;
        return param.changes.some(function (change) { return change.uri === _this.packageUri; });
    };
    ApplicationProject.prototype.onDidFilesChanged = function (param) {
        if (this.isPackageChanged(param)) {
            this.fireDidChangePackage();
            this.autoInstall();
        }
    };
    ApplicationProject.prototype.createPackageManager = function () {
        return new application_package_1.ApplicationPackageManager(Object.assign({
            log: this.logger.info.bind(this.logger),
            error: this.logger.error.bind(this.logger),
            registry: this.registry
        }, this.options));
    };
    Object.defineProperty(ApplicationProject.prototype, "onWillInstall", {
        get: function () {
            return this.onWillInstallEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationProject.prototype.fireWillInstall = function (param) {
        this.onWillInstallEmitter.fire(param);
    };
    Object.defineProperty(ApplicationProject.prototype, "onDidInstall", {
        get: function () {
            return this.onDidInstallEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationProject.prototype.fireDidInstall = function (result) {
        this.onDidInstallEmitter.fire(result);
    };
    ApplicationProject.prototype.autoInstall = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.autoInstall) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.scheduleInstall()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationProject.prototype.scheduleInstall = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.installationTokenSource) {
                            this.installationTokenSource.cancel();
                        }
                        this.installationTokenSource = new core_1.CancellationTokenSource();
                        token = this.installationTokenSource.token;
                        this.installed = this.installed.then(function () { return _this.install(token); });
                        return [4 /*yield*/, this.installed];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationProject.prototype.install = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var reverting, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reverting = this.reverting;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        this.fireWillInstall({ reverting: reverting });
                        this.logger.info('Intalling the app...');
                        return [4 /*yield*/, this.build(token)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.restart(token)];
                    case 3:
                        _a.sent();
                        this.backup();
                        this.logger.info('The app installation is finished');
                        this.fireDidInstall({
                            reverting: reverting,
                            failed: false
                        });
                        this.serverProcess.kill();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        if (core_1.isCancelled(error_1)) {
                            this.logger.info('The app installation is cancelled');
                            return [2 /*return*/];
                        }
                        this.logger.error('The app installation is failed' + os.EOL, error_1);
                        this.fireDidInstall({
                            reverting: reverting,
                            failed: true
                        });
                        return [4 /*yield*/, this.revert(token)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationProject.prototype.restart = function (token) {
        core_1.checkCancelled(token);
        return this.serverProcess.restart();
    };
    ApplicationProject.prototype.build = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('Installing extensions...');
                        return [4 /*yield*/, this.prepareBuild(token)];
                    case 1:
                        _a.sent();
                        this.logger.info('Extensions are installed');
                        this.logger.info('Building the app...');
                        return [4 /*yield*/, this.doBuild(token)];
                    case 2:
                        _a.sent();
                        this.logger.info('The app is built');
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationProject.prototype.prepareBuild = function (token) {
        core_1.checkCancelled(token);
        return this.npmClient.execute(this.options.projectPath, 'install', [], token);
    };
    ApplicationProject.prototype.doBuild = function (token) {
        core_1.checkCancelled(token);
        var manager = this.createPackageManager();
        var scripts = manager.pck.pck.scripts;
        if (scripts) {
            if ('prepare' in scripts) {
                return Promise.resolve();
            }
            if ('build' in scripts) {
                return this.npmClient.execute(this.options.projectPath, 'build', [], token);
            }
        }
        if (manager.process.canRun('theia')) {
            return manager.process.run('theia', ['build']);
        }
        return manager.build();
    };
    Object.defineProperty(ApplicationProject.prototype, "reverting", {
        get: function () {
            var packagePath = this.packagePath;
            if (!fs.existsSync(packagePath)) {
                return false;
            }
            var backupPath = this.backupPath;
            if (!fs.existsSync(backupPath)) {
                return false;
            }
            var packageContent = fs.readFileSync(packagePath, { encoding: 'utf-8' });
            var backupContent = fs.readFileSync(backupPath, { encoding: 'utf-8' });
            return packageContent === backupContent;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationProject.prototype.backup = function () {
        var packagePath = this.packagePath;
        if (fs.existsSync(packagePath)) {
            fs.copySync(packagePath, this.backupPath);
        }
    };
    ApplicationProject.prototype.revert = function (token) {
        core_1.checkCancelled(token);
        try {
            this.logger.info('Reverting the app installation ...');
            var backupPath = this.backupPath;
            if (fs.existsSync(backupPath)) {
                fs.copySync(backupPath, this.packagePath);
            }
        }
        catch (error) {
            if (core_1.isCancelled(error)) {
                this.logger.info('Reverting the app installation is cancelled');
                return;
            }
            this.logger.error('Reverting the app installation is failed' + os.EOL, error);
        }
    };
    Object.defineProperty(ApplicationProject.prototype, "backupPath", {
        get: function () {
            return paths.resolve(this.options.projectPath, 'package-backup.json');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationProject.prototype, "packagePath", {
        get: function () {
            return paths.resolve(this.options.projectPath, 'package.json');
        },
        enumerable: true,
        configurable: true
    });
    ApplicationProject = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(ApplicationProjectOptions)),
        __param(1, inversify_1.inject(filesystem_watcher_protocol_1.FileSystemWatcherServer)),
        __param(2, inversify_1.inject(core_1.ILogger)),
        __param(3, inversify_1.inject(npm_client_1.NpmClient)),
        __param(4, inversify_1.inject(node_1.ServerProcess)),
        __metadata("design:paramtypes", [ApplicationProjectOptions, Object, Object, npm_client_1.NpmClient,
            node_1.ServerProcess])
    ], ApplicationProject);
    return ApplicationProject;
}());
exports.ApplicationProject = ApplicationProject;
//# sourceMappingURL=application-project.js.map