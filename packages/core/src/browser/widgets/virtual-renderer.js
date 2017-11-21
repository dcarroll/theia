"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var virtualdom_1 = require("@phosphor/virtualdom");
var VirtualRenderer = /** @class */ (function () {
    function VirtualRenderer(host) {
        this.host = host || document.createElement('div');
    }
    VirtualRenderer.prototype.render = function () {
        VirtualRenderer.render(this.doRender(), this.host);
    };
    VirtualRenderer.prototype.doRender = function () {
        return null;
    };
    return VirtualRenderer;
}());
exports.VirtualRenderer = VirtualRenderer;
(function (VirtualRenderer) {
    function render(child, host) {
        var content = toContent(child);
        virtualdom_1.VirtualDOM.render(content, host);
    }
    VirtualRenderer.render = render;
    function flatten(children) {
        return children.reduce(function (prev, current) { return merge(prev, current); }, null);
    }
    VirtualRenderer.flatten = flatten;
    function merge(left, right) {
        if (!right) {
            return left || null;
        }
        if (!left) {
            return right;
        }
        var result = left instanceof Array ? left : [left];
        if (right instanceof Array) {
            result.push.apply(result, __spread(right));
        }
        else {
            result.push(right);
        }
        return result;
    }
    VirtualRenderer.merge = merge;
    function toContent(children) {
        if (!children) {
            return null;
        }
        if (typeof children === "string") {
            return new virtualdom_1.VirtualText(children);
        }
        if (children instanceof Array) {
            var nodes = [];
            try {
                for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var child = children_1_1.value;
                    if (child) {
                        var node = typeof child === "string" ? new virtualdom_1.VirtualText(child) : child;
                        nodes.push(node);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return nodes;
        }
        return children;
        var e_1, _a;
    }
    VirtualRenderer.toContent = toContent;
})(VirtualRenderer = exports.VirtualRenderer || (exports.VirtualRenderer = {}));
exports.VirtualRenderer = VirtualRenderer;
//# sourceMappingURL=virtual-renderer.js.map