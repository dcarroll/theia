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
var widgets_1 = require("../widgets");
var common_1 = require("../../common");
var virtualdom_1 = require("@phosphor/virtualdom");
var label_parser_1 = require("../label-parser");
var inversify_1 = require("inversify");
var StatusBarAlignment;
(function (StatusBarAlignment) {
    StatusBarAlignment[StatusBarAlignment["LEFT"] = 0] = "LEFT";
    StatusBarAlignment[StatusBarAlignment["RIGHT"] = 1] = "RIGHT";
})(StatusBarAlignment = exports.StatusBarAlignment || (exports.StatusBarAlignment = {}));
exports.STATUSBAR_WIDGET_FACTORY_ID = 'statusBar';
exports.StatusBar = Symbol('StatusBar');
var StatusBarImpl = /** @class */ (function (_super) {
    __extends(StatusBarImpl, _super);
    function StatusBarImpl(commands, entryService) {
        var _this = _super.call(this) || this;
        _this.commands = commands;
        _this.entryService = entryService;
        _this.entries = new Map();
        _this.id = 'theia-statusBar';
        return _this;
    }
    StatusBarImpl.prototype.setElement = function (id, entry) {
        this.entries.set(id, entry);
        this.update();
    };
    StatusBarImpl.prototype.removeElement = function (id) {
        this.entries.delete(id);
        this.update();
    };
    StatusBarImpl.prototype.getLayoutData = function () {
        var entries = [];
        this.entries.forEach(function (entry, id) {
            entries.push({ id: id, entry: entry });
        });
        return { entries: entries };
    };
    StatusBarImpl.prototype.setLayoutData = function (data) {
        var _this = this;
        if (data && data.entries) {
            data.entries.forEach(function (entryData) {
                _this.entries.set(entryData.id, entryData.entry);
            });
            this.update();
        }
    };
    StatusBarImpl.prototype.render = function () {
        var _this = this;
        var leftEntries = [];
        var rightEntries = [];
        var elements = Array.from(this.entries.values()).sort(function (left, right) {
            var lp = left.priority || 0;
            var rp = right.priority || 0;
            return rp - lp;
        });
        elements.forEach(function (entry) {
            if (entry.alignment === StatusBarAlignment.LEFT) {
                leftEntries.push(_this.renderElement(entry));
            }
            else {
                rightEntries.push(_this.renderElement(entry));
            }
        });
        var leftElements = virtualdom_1.h.div({ className: 'area left' }, widgets_1.VirtualRenderer.flatten(leftEntries));
        var rightElements = virtualdom_1.h.div({ className: 'area right' }, widgets_1.VirtualRenderer.flatten(rightEntries));
        return widgets_1.VirtualRenderer.flatten([leftElements, rightElements]);
    };
    StatusBarImpl.prototype.createAttributes = function (entry) {
        var _this = this;
        var attrs = {};
        if (entry.command) {
            attrs.onclick = function () {
                if (entry.command) {
                    var args = entry.arguments || [];
                    (_a = _this.commands).executeCommand.apply(_a, __spread([entry.command], args));
                }
                var _a;
            };
            attrs.className = 'element hasCommand';
        }
        else {
            attrs.className = 'element';
        }
        if (entry.tooltip) {
            attrs.title = entry.tooltip;
        }
        return attrs;
    };
    StatusBarImpl.prototype.renderElement = function (entry) {
        var childStrings = this.entryService.parse(entry.text);
        var children = [];
        childStrings.forEach(function (val, idx) {
            if (!(typeof val === 'string') && label_parser_1.LabelIcon.is(val)) {
                var classStr = "fa fa-" + val.name + " " + (val.animation ? 'fa-' + val.animation : '');
                children.push(virtualdom_1.h.span({ className: classStr }));
            }
            else {
                children.push(virtualdom_1.h.span({}, val));
            }
        });
        var elementInnerDiv = virtualdom_1.h.div(widgets_1.VirtualRenderer.flatten(children));
        return virtualdom_1.h.div(this.createAttributes(entry), elementInnerDiv);
    };
    StatusBarImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.CommandService)),
        __param(1, inversify_1.inject(label_parser_1.LabelParser)),
        __metadata("design:paramtypes", [Object, label_parser_1.LabelParser])
    ], StatusBarImpl);
    return StatusBarImpl;
}(widgets_1.VirtualWidget));
exports.StatusBarImpl = StatusBarImpl;
//# sourceMappingURL=status-bar.js.map