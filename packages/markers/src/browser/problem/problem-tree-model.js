"use strict";
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
/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
var problem_marker_1 = require("../../common/problem-marker");
var problem_manager_1 = require("./problem-manager");
var marker_tree_1 = require("../marker-tree");
var marker_tree_model_1 = require("../marker-tree-model");
var inversify_1 = require("inversify");
var ProblemTree = /** @class */ (function (_super) {
    __extends(ProblemTree, _super);
    function ProblemTree(problemManager, markerOptions) {
        var _this = _super.call(this, problemManager, markerOptions) || this;
        _this.problemManager = problemManager;
        _this.markerOptions = markerOptions;
        return _this;
    }
    ProblemTree = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(problem_manager_1.ProblemManager)),
        __param(1, inversify_1.inject(marker_tree_1.MarkerOptions)),
        __metadata("design:paramtypes", [problem_manager_1.ProblemManager, Object])
    ], ProblemTree);
    return ProblemTree;
}(marker_tree_1.MarkerTree));
exports.ProblemTree = ProblemTree;
var ProblemTreeModel = /** @class */ (function (_super) {
    __extends(ProblemTreeModel, _super);
    function ProblemTreeModel(tree, services) {
        var _this = _super.call(this, tree, services) || this;
        _this.tree = tree;
        _this.services = services;
        return _this;
    }
    ProblemTreeModel.prototype.getOpenerOptionsByMarker = function (node) {
        if (problem_marker_1.ProblemMarker.is(node.marker)) {
            return {
                selection: node.marker.data.range
            };
        }
        return undefined;
    };
    ProblemTreeModel = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(ProblemTree)),
        __param(1, inversify_1.inject(marker_tree_model_1.MarkerTreeServices)),
        __metadata("design:paramtypes", [ProblemTree,
            marker_tree_model_1.MarkerTreeServices])
    ], ProblemTreeModel);
    return ProblemTreeModel;
}(marker_tree_model_1.MarkerTreeModel));
exports.ProblemTreeModel = ProblemTreeModel;
//# sourceMappingURL=problem-tree-model.js.map