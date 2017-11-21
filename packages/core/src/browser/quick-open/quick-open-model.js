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
Object.defineProperty(exports, "__esModule", { value: true });
var QuickOpenMode;
(function (QuickOpenMode) {
    QuickOpenMode[QuickOpenMode["PREVIEW"] = 0] = "PREVIEW";
    QuickOpenMode[QuickOpenMode["OPEN"] = 1] = "OPEN";
    QuickOpenMode[QuickOpenMode["OPEN_IN_BACKGROUND"] = 2] = "OPEN_IN_BACKGROUND";
})(QuickOpenMode = exports.QuickOpenMode || (exports.QuickOpenMode = {}));
var QuickOpenItem = /** @class */ (function () {
    function QuickOpenItem() {
    }
    QuickOpenItem.prototype.getTooltip = function () {
        return this.getLabel();
    };
    QuickOpenItem.prototype.getLabel = function () {
        return undefined;
    };
    QuickOpenItem.prototype.getLabelHighlights = function () {
        return [];
    };
    QuickOpenItem.prototype.getDescription = function () {
        return undefined;
    };
    QuickOpenItem.prototype.getDescriptionHighlights = function () {
        return undefined;
    };
    QuickOpenItem.prototype.getDetail = function () {
        return undefined;
    };
    QuickOpenItem.prototype.getDetailHighlights = function () {
        return undefined;
    };
    QuickOpenItem.prototype.isHidden = function () {
        return false;
    };
    QuickOpenItem.prototype.getUri = function () {
        return undefined;
    };
    QuickOpenItem.prototype.getIconClass = function () {
        return undefined;
    };
    QuickOpenItem.prototype.getKeybinding = function () {
        return undefined;
    };
    QuickOpenItem.prototype.run = function (mode) {
        return false;
    };
    return QuickOpenItem;
}());
exports.QuickOpenItem = QuickOpenItem;
var QuickOpenGroupItem = /** @class */ (function (_super) {
    __extends(QuickOpenGroupItem, _super);
    function QuickOpenGroupItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickOpenGroupItem.prototype.getGroupLabel = function () {
        return undefined;
    };
    QuickOpenGroupItem.prototype.showBorder = function () {
        return false;
    };
    return QuickOpenGroupItem;
}(QuickOpenItem));
exports.QuickOpenGroupItem = QuickOpenGroupItem;
//# sourceMappingURL=quick-open-model.js.map