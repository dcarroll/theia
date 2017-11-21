"use strict";
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
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var inversify_1 = require("inversify");
var widget_manager_1 = require("./widget-manager");
var storage_service_1 = require("./storage-service");
var logger_1 = require("../common/logger");
var StatefulWidget;
(function (StatefulWidget) {
    // tslint:disable-next-line:no-any
    function is(arg) {
        return typeof arg["storeState"] === 'function' && typeof arg["restoreState"] === 'function';
    }
    StatefulWidget.is = is;
})(StatefulWidget = exports.StatefulWidget || (exports.StatefulWidget = {}));
var ShellLayoutRestorer = /** @class */ (function () {
    function ShellLayoutRestorer(widgetManager, logger, storageService) {
        this.widgetManager = widgetManager;
        this.logger = logger;
        this.storageService = storageService;
        this.storageKey = 'layout';
        this.shouldStoreLayout = true;
    }
    ShellLayoutRestorer.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand({
            id: 'reset.layout',
            label: 'Reset Workbench Layout'
        }, {
            execute: function () {
                _this.shouldStoreLayout = false;
                _this.storageService.setData(_this.storageKey, undefined)
                    .then(function () { return window.location.reload(); });
            }
        });
    };
    ShellLayoutRestorer.prototype.initializeLayout = function (app, contributions) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedLayoutData, contributions_1, contributions_1_1, initializer, e_1_1, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.storageService.getData(this.storageKey)];
                    case 1:
                        serializedLayoutData = _b.sent();
                        if (!(serializedLayoutData !== undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.inflate(serializedLayoutData).then(function (layoutData) {
                                app.shell.setLayoutData(layoutData);
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 3:
                        _b.trys.push([3, 8, 9, 10]);
                        contributions_1 = __values(contributions), contributions_1_1 = contributions_1.next();
                        _b.label = 4;
                    case 4:
                        if (!!contributions_1_1.done) return [3 /*break*/, 7];
                        initializer = contributions_1_1.value;
                        if (!initializer.initializeLayout) return [3 /*break*/, 6];
                        return [4 /*yield*/, initializer.initializeLayout(app)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        contributions_1_1 = contributions_1.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (contributions_1_1 && !contributions_1_1.done && (_a = contributions_1.return)) _a.call(contributions_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ShellLayoutRestorer.prototype.storeLayout = function (app) {
        if (this.shouldStoreLayout) {
            try {
                var layoutData = app.shell.getLayoutData();
                this.storageService.setData(this.storageKey, this.deflate(layoutData));
            }
            catch (error) {
                this.storageService.setData(this.storageKey, undefined);
                this.logger.error("Error during serialization of layout data: " + error);
            }
        }
    };
    ShellLayoutRestorer.prototype.isWidgetsProperty = function (property) {
        return property.toLowerCase().endsWith('widgets');
    };
    /**
     * Turns the layout data to a string representation.
     */
    ShellLayoutRestorer.prototype.deflate = function (data) {
        var _this = this;
        return JSON.stringify(data, function (property, value) {
            if (_this.isWidgetsProperty(property)) {
                var result = [];
                try {
                    for (var _a = __values(value), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var widget = _b.value;
                        var desc = _this.widgetManager.getDescription(widget);
                        if (desc) {
                            var innerState = undefined;
                            if (StatefulWidget.is(widget)) {
                                innerState = widget.storeState();
                            }
                            result.push({
                                constructionOptions: desc,
                                innerWidgetState: innerState
                            });
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return result;
            }
            return value;
            var e_2, _c;
        });
    };
    /**
     * Creates the layout data from its string representation.
     */
    ShellLayoutRestorer.prototype.inflate = function (layoutData) {
        var _this = this;
        var pending = [];
        var result = JSON.parse(layoutData, function (property, value) {
            if (_this.isWidgetsProperty(property)) {
                var widgets_1 = [];
                var descs = value;
                var _loop_1 = function (i) {
                    var desc = descs[i];
                    if (desc.constructionOptions) {
                        var promise = _this.widgetManager.getOrCreateWidget(desc.constructionOptions.factoryId, desc.constructionOptions.options)
                            .then(function (widget) {
                            if (widget) {
                                if (StatefulWidget.is(widget) && desc.innerWidgetState !== undefined) {
                                    widget.restoreState(desc.innerWidgetState);
                                }
                                widgets_1[i] = widget;
                            }
                        }).catch(function (err) {
                            _this.logger.warn("Couldn't restore widget for " + desc + ". Error : " + err + " ");
                        });
                        pending.push(promise);
                    }
                };
                for (var i = 0; i < descs.length; i++) {
                    _loop_1(i);
                }
                return widgets_1;
            }
            return value;
        });
        return Promise.all(pending).then(function () { return result; });
    };
    ShellLayoutRestorer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(widget_manager_1.WidgetManager)),
        __param(1, inversify_1.inject(logger_1.ILogger)),
        __param(2, inversify_1.inject(storage_service_1.StorageService)),
        __metadata("design:paramtypes", [widget_manager_1.WidgetManager, Object, Object])
    ], ShellLayoutRestorer);
    return ShellLayoutRestorer;
}());
exports.ShellLayoutRestorer = ShellLayoutRestorer;
//# sourceMappingURL=shell-layout-restorer.js.map