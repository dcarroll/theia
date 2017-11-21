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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var TreeNavigationService = /** @class */ (function () {
    function TreeNavigationService() {
        this.index = -1;
        this.nodes = [];
    }
    Object.defineProperty(TreeNavigationService.prototype, "next", {
        get: function () {
            return this.nodes[this.index + 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNavigationService.prototype, "prev", {
        get: function () {
            return this.nodes[this.index - 1];
        },
        enumerable: true,
        configurable: true
    });
    TreeNavigationService.prototype.advance = function () {
        var node = this.next;
        if (node) {
            this.index = this.index + 1;
            return node;
        }
        return undefined;
    };
    TreeNavigationService.prototype.retreat = function () {
        var node = this.prev;
        if (node) {
            this.index = this.index - 1;
            return node;
        }
        return undefined;
    };
    TreeNavigationService.prototype.push = function (node) {
        this.nodes = this.nodes.slice(0, this.index + 1);
        this.nodes.push(node);
        this.index = this.index + 1;
    };
    TreeNavigationService = __decorate([
        inversify_1.injectable()
    ], TreeNavigationService);
    return TreeNavigationService;
}());
exports.TreeNavigationService = TreeNavigationService;
//# sourceMappingURL=tree-navigation.js.map