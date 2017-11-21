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
var inversify_1 = require("inversify");
var marker_manager_1 = require("../marker-manager");
var problem_marker_1 = require("../../common/problem-marker");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
var common_1 = require("@theia/filesystem/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var ProblemManager = /** @class */ (function (_super) {
    __extends(ProblemManager, _super);
    function ProblemManager(storageService, fileWatcher) {
        var _this = _super.call(this, storageService, fileWatcher) || this;
        _this.fileWatcher = fileWatcher;
        return _this;
    }
    ProblemManager.prototype.getKind = function () {
        return problem_marker_1.PROBLEM_KIND;
    };
    ProblemManager.prototype.getProblemStat = function () {
        var allMarkers = [];
        try {
            for (var _a = __values(this.getUris()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var uri = _b.value;
                allMarkers.push.apply(allMarkers, __spread(this.findMarkers({ uri: new uri_1.default(uri) })));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var errors = allMarkers.filter(function (m) { return m.data.severity === 1; }).length;
        var warnings = allMarkers.filter(function (m) { return m.data.severity === 2; }).length;
        return { errors: errors, warnings: warnings };
        var e_1, _c;
    };
    ProblemManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(storage_service_1.StorageService)),
        __param(1, inversify_1.inject(common_1.FileSystemWatcher)),
        __metadata("design:paramtypes", [Object, common_1.FileSystemWatcher])
    ], ProblemManager);
    return ProblemManager;
}(marker_manager_1.MarkerManager));
exports.ProblemManager = ProblemManager;
//# sourceMappingURL=problem-manager.js.map