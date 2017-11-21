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
var virtualdom_1 = require("@phosphor/virtualdom");
var browser_1 = require("@theia/core/lib/browser");
var uri_1 = require("@theia/core/lib/common/uri");
exports.LOCATION_LIST_CLASS = 'theia-LocationList';
var LocationListRenderer = /** @class */ (function (_super) {
    __extends(LocationListRenderer, _super);
    function LocationListRenderer(service, host) {
        var _this = _super.call(this, host) || this;
        _this.service = service;
        return _this;
    }
    LocationListRenderer.prototype.render = function () {
        _super.prototype.render.call(this);
        var locationList = this.locationList;
        if (locationList) {
            var currentLocation = this.service.location;
            locationList.value = currentLocation ? currentLocation.toString() : '';
        }
    };
    LocationListRenderer.prototype.doRender = function () {
        var _this = this;
        var location = this.service.location;
        var locations = !!location ? location.allLocations : [];
        var options = locations.map(function (value) { return _this.renderLocation(value); });
        return virtualdom_1.h.select.apply(virtualdom_1.h, __spread([{
                className: exports.LOCATION_LIST_CLASS,
                onchange: function (e) { return _this.onLocationChanged(e); }
            }], options));
    };
    LocationListRenderer.prototype.renderLocation = function (uri) {
        var value = uri.toString();
        return virtualdom_1.h.option({
            value: value
        }, uri.displayName);
    };
    LocationListRenderer.prototype.onLocationChanged = function (e) {
        var locationList = this.locationList;
        if (locationList) {
            var value = locationList.value;
            var uri = new uri_1.default(value);
            this.service.location = uri;
        }
        e.preventDefault();
        e.stopPropagation();
    };
    Object.defineProperty(LocationListRenderer.prototype, "locationList", {
        get: function () {
            var locationList = this.host.getElementsByClassName(exports.LOCATION_LIST_CLASS)[0];
            if (locationList instanceof HTMLSelectElement) {
                return locationList;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return LocationListRenderer;
}(browser_1.VirtualRenderer));
exports.LocationListRenderer = LocationListRenderer;
//# sourceMappingURL=location-renderer.js.map