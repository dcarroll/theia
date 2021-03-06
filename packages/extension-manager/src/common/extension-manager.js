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
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var protocol = require("./extension-protocol");
/**
 * The extension allows to:
 * - access its information from the repository;
 * - resolve the detailed information from the repository;
 * - test whether it is installed or outdated;
 * - install, uninstall and update it.
 *
 * The user code should access extensions and listen to their changes with the extension manager.
 */
var Extension = /** @class */ (function (_super) {
    __extends(Extension, _super);
    function Extension(extension, server, manager) {
        var _this = _super.call(this) || this;
        _this.server = server;
        _this.manager = manager;
        _this.onDidChangedEmitter = new core_1.Emitter();
        Object.assign(_this, extension);
        manager.onDidChange(function (change) {
            if (change.name === _this.name) {
                Object.assign(_this, change);
                _this.onDidChangedEmitter.fire(change);
            }
        });
        return _this;
    }
    Object.defineProperty(Extension.prototype, "onDidChange", {
        get: function () {
            return this.onDidChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resolve the detailed information.
     *
     * Resolving can be used to refresh an already resolved extension.
     */
    Extension.prototype.resolve = function () {
        var _this = this;
        return this.server.resolve(this.name).then(function (resolved) {
            return Object.assign(_this, resolved);
        });
    };
    /**
     * Install the latest version of this extension.
     */
    Extension.prototype.install = function () {
        this.server.install(this.name);
    };
    /**
     * Uninstall the extension.
     */
    Extension.prototype.uninstall = function () {
        this.server.uninstall(this.name);
    };
    /**
     * Update the extension to the latest version.
     */
    Extension.prototype.update = function () {
        this.server.update(this.name);
    };
    return Extension;
}(protocol.Extension));
exports.Extension = Extension;
/**
 * The extension manager allows to:
 * - access installed extensions;
 * - look up extensions from the repository;
 * - listen to changes of:
 *   - installed extension;
 *   - and the installation process.

 */
var ExtensionManager = /** @class */ (function () {
    function ExtensionManager(server) {
        var _this = this;
        this.server = server;
        this.onChangedEmitter = new core_1.Emitter();
        this.onWillStartInstallationEmitter = new core_1.Emitter();
        this.onDidStopInstallationEmitter = new core_1.Emitter();
        this.toDispose = new core_1.DisposableCollection();
        this.toDispose.push(server);
        this.toDispose.push(this.onChangedEmitter);
        this.toDispose.push(this.onWillStartInstallationEmitter);
        this.toDispose.push(this.onDidStopInstallationEmitter);
        this.server.setClient({
            onDidChange: function (change) { return _this.fireDidChange(change); },
            onWillStartInstallation: function (param) { return _this.fireWillStartInstallation(param); },
            onDidStopInstallation: function (result) { return _this.fireDidStopInstallation(result); },
        });
    }
    ExtensionManager.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    /**
     * Resolve the detailed extension for the given name.
     */
    ExtensionManager.prototype.resolve = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var raw, extension;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.server.resolve(name)];
                    case 1:
                        raw = _a.sent();
                        extension = new Extension(raw, this.server, this);
                        return [2 /*return*/, extension];
                }
            });
        });
    };
    /**
     * List installed extensions if the given query is undefined or empty.
     * Otherwise look up extensions from the repository matching the given query
     * taking into the account installed extensions.
     */
    ExtensionManager.prototype.list = function (param) {
        var _this = this;
        return this.server.list(param).then(function (extensions) {
            return extensions.map(function (extension) {
                return new Extension(extension, _this.server, _this);
            });
        });
    };
    Object.defineProperty(ExtensionManager.prototype, "onDidChange", {
        /**
         * Notify when extensions are installed, uninstalled or updated.
         */
        get: function () {
            return this.onChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ExtensionManager.prototype.fireDidChange = function (change) {
        this.onChangedEmitter.fire(change);
    };
    Object.defineProperty(ExtensionManager.prototype, "onWillStartInstallation", {
        /**InsrallationResultInsrallationResult
         * Notify when the installation process is going to be started.
         */
        get: function () {
            return this.onWillStartInstallationEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ExtensionManager.prototype.fireWillStartInstallation = function (param) {
        this.onWillStartInstallationEmitter.fire(param);
    };
    Object.defineProperty(ExtensionManager.prototype, "onDidStopInstallation", {
        /**
         * Notify when the installation process has been finished.
         */
        get: function () {
            return this.onDidStopInstallationEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ExtensionManager.prototype.fireDidStopInstallation = function (result) {
        this.onDidStopInstallationEmitter.fire(result);
    };
    ExtensionManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(protocol.ExtensionServer)),
        __metadata("design:paramtypes", [Object])
    ], ExtensionManager);
    return ExtensionManager;
}());
exports.ExtensionManager = ExtensionManager;
//# sourceMappingURL=extension-manager.js.map