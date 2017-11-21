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
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var marker_manager_1 = require("./marker-manager");
var common_1 = require("@theia/filesystem/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
exports.MarkerOptions = Symbol('MarkerOptions');
var MarkerTree = /** @class */ (function (_super) {
    __extends(MarkerTree, _super);
    function MarkerTree(markerManager, markerOptions) {
        var _this = _super.call(this) || this;
        _this.markerManager = markerManager;
        _this.markerOptions = markerOptions;
        markerManager.onDidChangeMarkers(function () { return _this.refresh(); });
        _this.root = {
            visible: false,
            id: 'theia-' + markerOptions.kind + '-marker-widget',
            name: 'MarkerTree',
            kind: markerOptions.kind,
            children: [],
            parent: undefined
        };
        return _this;
    }
    MarkerTree.prototype.resolveChildren = function (parent) {
        if (MarkerRootNode.is(parent)) {
            return this.getMarkerInfoNodes(parent);
        }
        else if (MarkerInfoNode.is(parent)) {
            return this.getMarkerNodes(parent);
        }
        return _super.prototype.resolveChildren.call(this, parent);
    };
    MarkerTree.prototype.getMarkerInfoNodes = function (parent) {
        var uriNodes = [];
        if (this.root && MarkerRootNode.is(this.root)) {
            try {
                for (var _a = __values(this.markerManager.getUris()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var uriString = _b.value;
                    var id = 'markerInfo-' + uriString;
                    var uri = new uri_1.default(uriString);
                    var numberOfMarkers = this.markerManager.findMarkers({ uri: uri }).length;
                    if (numberOfMarkers > 0) {
                        var cachedMarkerInfo = this.getNode(id);
                        if (cachedMarkerInfo && MarkerInfoNode.is(cachedMarkerInfo)) {
                            cachedMarkerInfo.numberOfMarkers = numberOfMarkers;
                            uriNodes.push(cachedMarkerInfo);
                        }
                        else {
                            uriNodes.push({
                                children: [],
                                expanded: true,
                                uri: uri,
                                id: id,
                                name: uri.displayName,
                                parent: parent,
                                selected: false,
                                numberOfMarkers: numberOfMarkers
                            });
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return Promise.resolve(uriNodes);
        var e_1, _c;
    };
    MarkerTree.prototype.getMarkerNodes = function (parent) {
        var markerNodes = [];
        var markers = this.markerManager.findMarkers({ uri: parent.uri });
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            var uri = new uri_1.default(marker.uri);
            var id = uri.toString() + "_" + i;
            var cachedMarkerNode = this.getNode(id);
            if (MarkerNode.is(cachedMarkerNode)) {
                cachedMarkerNode.marker = marker;
                markerNodes.push(cachedMarkerNode);
            }
            else {
                markerNodes.push({
                    id: id,
                    name: 'marker',
                    parent: parent,
                    selected: false,
                    uri: uri,
                    marker: marker
                });
            }
        }
        return Promise.resolve(markerNodes);
    };
    MarkerTree = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [marker_manager_1.MarkerManager, Object])
    ], MarkerTree);
    return MarkerTree;
}(browser_1.Tree));
exports.MarkerTree = MarkerTree;
var MarkerNode;
(function (MarkerNode) {
    function is(node) {
        return common_1.UriSelection.is(node) && browser_1.ISelectableTreeNode.is(node) && 'marker' in node;
    }
    MarkerNode.is = is;
})(MarkerNode = exports.MarkerNode || (exports.MarkerNode = {}));
var MarkerInfoNode;
(function (MarkerInfoNode) {
    function is(node) {
        return browser_1.IExpandableTreeNode.is(node) && common_1.UriSelection.is(node);
    }
    MarkerInfoNode.is = is;
})(MarkerInfoNode = exports.MarkerInfoNode || (exports.MarkerInfoNode = {}));
var MarkerRootNode;
(function (MarkerRootNode) {
    function is(node) {
        return browser_1.ICompositeTreeNode.is(node) && 'kind' in node;
    }
    MarkerRootNode.is = is;
})(MarkerRootNode = exports.MarkerRootNode || (exports.MarkerRootNode = {}));
//# sourceMappingURL=marker-tree.js.map