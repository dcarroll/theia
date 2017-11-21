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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var contribution_provider_1 = require("../common/contribution-provider");
var common_1 = require("../common");
// tslint:disable:no-any
exports.WidgetFactory = Symbol("WidgetFactory");
/**
 * Creates and manages widgets.
 */
var WidgetManager = /** @class */ (function () {
    function WidgetManager(factoryProvider, logger) {
        this.factoryProvider = factoryProvider;
        this.logger = logger;
        this.widgets = new Map();
        this.widgetPromises = new Map();
    }
    WidgetManager.prototype.getWidgets = function (factoryId) {
        var result = [];
        try {
            for (var _a = __values(this.widgets.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), key = _c[0], widget = _c[1];
                if (this.fromKey(key).factoryId === factoryId) {
                    result.push(widget);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
        var e_1, _d;
    };
    /*
     * creates or returns the widget for the given description.
     */
    WidgetManager.prototype.getOrCreateWidget = function (factoryId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, existingWidget, factory, widgetPromise, widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = this.toKey({ factoryId: factoryId, options: options });
                        existingWidget = this.widgetPromises.get(key);
                        if (existingWidget) {
                            return [2 /*return*/, existingWidget];
                        }
                        factory = this.factories.get(factoryId);
                        if (!factory) {
                            throw Error("No widget factory '" + factoryId + "' has been registered.");
                        }
                        widgetPromise = factory.createWidget(options);
                        this.widgetPromises.set(key, widgetPromise);
                        return [4 /*yield*/, widgetPromise];
                    case 1:
                        widget = _a.sent();
                        this.widgets.set(key, widget);
                        widget.disposed.connect(function () {
                            _this.widgets.delete(key);
                            _this.widgetPromises.delete(key);
                        });
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    /*
     *  returns the construction description for the given widget, or undefined if the widget was not created through this manager.
     */
    WidgetManager.prototype.getDescription = function (widget) {
        try {
            for (var _a = __values(this.widgets.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), key = _c[0], aWidget = _c[1];
                if (aWidget === widget) {
                    return this.fromKey(key);
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
        return undefined;
        var e_2, _d;
    };
    WidgetManager.prototype.toKey = function (options) {
        return JSON.stringify(options);
    };
    WidgetManager.prototype.fromKey = function (key) {
        return JSON.parse(key);
    };
    Object.defineProperty(WidgetManager.prototype, "factories", {
        get: function () {
            if (!this._cachedfactories) {
                this._cachedfactories = new Map();
                try {
                    for (var _a = __values(this.factoryProvider.getContributions()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var f = _b.value;
                        if (f.id) {
                            this._cachedfactories.set(f.id, f);
                        }
                        else {
                            this.logger.error("Factory id cannot be undefined : " + f);
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
            }
            return this._cachedfactories;
            var e_3, _c;
        },
        enumerable: true,
        configurable: true
    });
    WidgetManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.WidgetFactory)),
        __param(1, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [Object, Object])
    ], WidgetManager);
    return WidgetManager;
}());
exports.WidgetManager = WidgetManager;
//# sourceMappingURL=widget-manager.js.map