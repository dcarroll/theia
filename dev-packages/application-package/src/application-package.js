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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var fs = require("fs-extra");
var paths = require("path");
var json_file_1 = require("./json-file");
var npm_registry_1 = require("./npm-registry");
var extension_package_1 = require("./extension-package");
var extension_package_collector_1 = require("./extension-package-collector");
var ApplicationPackageConfig = /** @class */ (function (_super) {
    __extends(ApplicationPackageConfig, _super);
    function ApplicationPackageConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApplicationPackageConfig;
}(npm_registry_1.NpmRegistryConfig));
exports.ApplicationPackageConfig = ApplicationPackageConfig;
var ApplicationPackageOptions = /** @class */ (function () {
    function ApplicationPackageOptions() {
    }
    return ApplicationPackageOptions;
}());
exports.ApplicationPackageOptions = ApplicationPackageOptions;
var ApplicationPackage = /** @class */ (function () {
    function ApplicationPackage(options) {
        this.options = options;
        this.projectPath = options.projectPath;
        this.log = options.log || console.log.bind(console);
        this.error = options.error || console.error.bind(console);
    }
    Object.defineProperty(ApplicationPackage.prototype, "registry", {
        get: function () {
            if (this._registry) {
                return this._registry;
            }
            this._registry = this.options.registry || new npm_registry_1.NpmRegistry();
            this._registry.updateConfig(this.config);
            return this._registry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "target", {
        get: function () {
            return this.config.target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "config", {
        get: function () {
            if (this._config) {
                return this._config;
            }
            var theia = this.pck.theia || {};
            return this._config = __assign({}, ApplicationPackage.defaultConfig, theia);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "pck", {
        get: function () {
            if (this._pck) {
                return this._pck;
            }
            return this._pck = json_file_1.readJsonFile(this.packagePath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "extensionPackages", {
        /**
         * Extension packages in the topological order.
         */
        get: function () {
            var _this = this;
            if (!this._extensionPackages) {
                var collector = new extension_package_collector_1.ExtensionPackageCollector(function (raw) { return _this.newExtensionPackage(raw); }, this.resolveModule);
                this._extensionPackages = collector.collect(this.pck);
            }
            return this._extensionPackages;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationPackage.prototype.getExtensionPackage = function (extension) {
        return this.extensionPackages.find(function (pck) { return pck.name === extension; });
    };
    ApplicationPackage.prototype.findExtensionPackage = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getExtensionPackage(extension);
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resolveExtensionPackage(extension)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        });
    };
    ApplicationPackage.prototype.resolveExtensionPackage = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            var raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, extension_package_1.RawExtensionPackage.view(this.registry, extension)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, raw ? this.newExtensionPackage(raw) : undefined];
                }
            });
        });
    };
    ApplicationPackage.prototype.newExtensionPackage = function (raw) {
        return new extension_package_1.ExtensionPackage(raw, this.registry);
    };
    Object.defineProperty(ApplicationPackage.prototype, "frontendModules", {
        get: function () {
            if (!this._frontendModules) {
                this._frontendModules = this.computeModules('frontend');
            }
            return this._frontendModules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "frontendElectronModules", {
        get: function () {
            if (!this._frontendElectronModules) {
                this._frontendElectronModules = this.computeModules('frontendElectron', 'frontend');
            }
            return this._frontendElectronModules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "backendModules", {
        get: function () {
            if (!this._backendModules) {
                this._backendModules = this.computeModules('backend');
            }
            return this._backendModules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "backendElectronModules", {
        get: function () {
            if (!this._backendElectronModules) {
                this._backendElectronModules = this.computeModules('backendElectron', 'backend');
            }
            return this._backendElectronModules;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationPackage.prototype.computeModules = function (primary, secondary) {
        var result = new Map();
        var moduleIndex = 1;
        try {
            for (var _a = __values(this.extensionPackages), _b = _a.next(); !_b.done; _b = _a.next()) {
                var extensionPackage = _b.value;
                var extensions = extensionPackage.theiaExtensions;
                if (extensions) {
                    try {
                        for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                            var extension = extensions_1_1.value;
                            var modulePath = extension[primary] || (secondary && extension[secondary]);
                            if (typeof modulePath === 'string') {
                                var extensionPath = paths.join(extensionPackage.name, modulePath).split(paths.sep).join('/');
                                result.set(primary + "_" + moduleIndex, extensionPath);
                                moduleIndex = moduleIndex + 1;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (extensions_1_1 && !extensions_1_1.done && (_c = extensions_1.return)) _c.call(extensions_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
        var e_2, _d, e_1, _c;
    };
    ApplicationPackage.prototype.relative = function (path) {
        return paths.relative(this.projectPath, path);
    };
    ApplicationPackage.prototype.path = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return paths.resolve.apply(paths, __spread([this.projectPath], segments));
    };
    Object.defineProperty(ApplicationPackage.prototype, "packagePath", {
        get: function () {
            return this.path('package.json');
        },
        enumerable: true,
        configurable: true
    });
    ApplicationPackage.prototype.lib = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return this.path.apply(this, __spread(['lib'], segments));
    };
    ApplicationPackage.prototype.srcGen = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return this.path.apply(this, __spread(['src-gen'], segments));
    };
    ApplicationPackage.prototype.backend = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return this.srcGen.apply(this, __spread(['backend'], segments));
    };
    ApplicationPackage.prototype.frontend = function () {
        var segments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            segments[_i] = arguments[_i];
        }
        return this.srcGen.apply(this, __spread(['frontend'], segments));
    };
    ApplicationPackage.prototype.isBrowser = function () {
        return this.target === 'browser';
    };
    ApplicationPackage.prototype.isElectron = function () {
        return this.target === 'electron';
    };
    ApplicationPackage.prototype.ifBrowser = function (value, defaultValue) {
        return this.isBrowser() ? value : defaultValue;
    };
    ApplicationPackage.prototype.ifElectron = function (value, defaultValue) {
        return this.isElectron() ? value : defaultValue;
    };
    Object.defineProperty(ApplicationPackage.prototype, "targetBackendModules", {
        get: function () {
            return this.ifBrowser(this.backendModules, this.backendElectronModules);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationPackage.prototype, "targetFrontendModules", {
        get: function () {
            return this.ifBrowser(this.frontendModules, this.frontendElectronModules);
        },
        enumerable: true,
        configurable: true
    });
    ApplicationPackage.prototype.setDependency = function (name, version) {
        var dependencies = this.pck.dependencies || {};
        var currentVersion = dependencies[name];
        if (currentVersion === version) {
            return false;
        }
        if (version) {
            dependencies[name] = version;
        }
        else {
            delete dependencies[name];
        }
        this.pck.dependencies = npm_registry_1.sortByKey(dependencies);
        return true;
    };
    ApplicationPackage.prototype.save = function () {
        return json_file_1.writeJsonFile(this.packagePath, this.pck, {
            detectIndent: true
        });
    };
    Object.defineProperty(ApplicationPackage.prototype, "resolveModule", {
        /**
         * A node module resolver in the context of the application package.
         */
        get: function () {
            if (!this._moduleResolver) {
                var loaderPath = this.path('.application-module-loader.js');
                fs.writeFileSync(loaderPath, 'module.exports = modulePath => require.resolve(modulePath);');
                this._moduleResolver = require(loaderPath);
                fs.removeSync(loaderPath);
            }
            return this._moduleResolver;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationPackage.prototype.resolveModulePath = function (moduleName) {
        var segments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            segments[_i - 1] = arguments[_i];
        }
        return paths.resolve.apply(paths, __spread([this.resolveModule(moduleName + '/package.json'), '..'], segments));
    };
    ApplicationPackage.defaultConfig = __assign({}, npm_registry_1.NpmRegistry.defaultConfig, { target: 'browser' });
    return ApplicationPackage;
}());
exports.ApplicationPackage = ApplicationPackage;
//# sourceMappingURL=application-package.js.map