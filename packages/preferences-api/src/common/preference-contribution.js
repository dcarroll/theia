"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
exports.PreferenceContribution = Symbol("PreferenceContribution");
exports.PreferenceSchema = Symbol("PreferenceSchema");
var PreferenceSchemaProvider = /** @class */ (function () {
    function PreferenceSchemaProvider(logger, preferenceContributions) {
        var _this = this;
        this.logger = logger;
        this.preferenceContributions = preferenceContributions;
        this.preferenceContributions.getContributions().forEach(function (contrib) {
            for (var property in contrib.schema) {
                if (_this.combinedSchema.properties[property]) {
                    _this.logger.error("Preference name collision detected in the schema for property: " + property);
                }
                else {
                    _this.combinedSchema.properties[property] = contrib.schema.properties[property];
                }
            }
        });
    }
    PreferenceSchemaProvider.prototype.getSchema = function () {
        return this.combinedSchema;
    };
    PreferenceSchemaProvider = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ILogger)),
        __param(1, inversify_1.inject(common_1.ContributionProvider)), __param(1, inversify_1.named(exports.PreferenceContribution)),
        __metadata("design:paramtypes", [Object, Object])
    ], PreferenceSchemaProvider);
    return PreferenceSchemaProvider;
}());
exports.PreferenceSchemaProvider = PreferenceSchemaProvider;
//# sourceMappingURL=preference-contribution.js.map