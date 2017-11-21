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
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/filesystem/lib/browser");
var navigator_tree_1 = require("./navigator-tree");
var FileNavigatorServices = /** @class */ (function (_super) {
    __extends(FileNavigatorServices, _super);
    function FileNavigatorServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], FileNavigatorServices.prototype, "openerService", void 0);
    FileNavigatorServices = __decorate([
        inversify_1.injectable()
    ], FileNavigatorServices);
    return FileNavigatorServices;
}(browser_2.FileTreeServices));
exports.FileNavigatorServices = FileNavigatorServices;
var FileNavigatorModel = /** @class */ (function (_super) {
    __extends(FileNavigatorModel, _super);
    function FileNavigatorModel(tree, services) {
        var _this = _super.call(this, tree, services) || this;
        _this.tree = tree;
        return _this;
    }
    FileNavigatorModel.prototype.doOpenNode = function (node) {
        if (browser_2.FileNode.is(node)) {
            browser_1.open(this.openerService, node.uri);
        }
        else {
            _super.prototype.doOpenNode.call(this, node);
        }
    };
    FileNavigatorModel = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(navigator_tree_1.FileNavigatorTree)),
        __param(1, inversify_1.inject(FileNavigatorServices)),
        __metadata("design:paramtypes", [navigator_tree_1.FileNavigatorTree,
            FileNavigatorServices])
    ], FileNavigatorModel);
    return FileNavigatorModel;
}(browser_2.FileTreeModel));
exports.FileNavigatorModel = FileNavigatorModel;
//# sourceMappingURL=navigator-model.js.map