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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var marker_tree_1 = require("./marker-tree");
var browser_1 = require("@theia/core/lib/browser");
var MarkerTreeServices = /** @class */ (function (_super) {
    __extends(MarkerTreeServices, _super);
    function MarkerTreeServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], MarkerTreeServices.prototype, "openerService", void 0);
    MarkerTreeServices = __decorate([
        inversify_1.injectable()
    ], MarkerTreeServices);
    return MarkerTreeServices;
}(browser_1.TreeServices));
exports.MarkerTreeServices = MarkerTreeServices;
var MarkerTreeModel = /** @class */ (function (_super) {
    __extends(MarkerTreeModel, _super);
    function MarkerTreeModel(tree, services) {
        var _this = _super.call(this, tree, services) || this;
        _this.tree = tree;
        _this.services = services;
        return _this;
    }
    MarkerTreeModel.prototype.doOpenNode = function (node) {
        if (marker_tree_1.MarkerNode.is(node)) {
            browser_1.open(this.openerService, node.uri, this.getOpenerOptionsByMarker(node));
        }
        else {
            _super.prototype.doOpenNode.call(this, node);
        }
    };
    MarkerTreeModel.prototype.getOpenerOptionsByMarker = function (node) {
        return undefined;
    };
    MarkerTreeModel = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(marker_tree_1.MarkerTree)),
        __param(1, inversify_1.inject(MarkerTreeServices)),
        __metadata("design:paramtypes", [marker_tree_1.MarkerTree,
            MarkerTreeServices])
    ], MarkerTreeModel);
    return MarkerTreeModel;
}(browser_1.TreeModel));
exports.MarkerTreeModel = MarkerTreeModel;
//# sourceMappingURL=marker-tree-model.js.map