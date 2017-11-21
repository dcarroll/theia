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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var dialogs_1 = require("./dialogs");
var Saveable;
(function (Saveable) {
    function isSource(arg) {
        return !!arg && ('saveable' in arg);
    }
    Saveable.isSource = isSource;
    function is(arg) {
        return !!arg && ('dirty' in arg) && ('onDirtyChanged' in arg);
    }
    Saveable.is = is;
    function get(arg) {
        if (is(arg)) {
            return arg;
        }
        if (isSource(arg)) {
            return arg.saveable;
        }
        return undefined;
    }
    Saveable.get = get;
    function getDirty(arg) {
        var saveable = get(arg);
        if (saveable && saveable.dirty) {
            return saveable;
        }
        return undefined;
    }
    Saveable.getDirty = getDirty;
    function isDirty(arg) {
        return !!getDirty(arg);
    }
    Saveable.isDirty = isDirty;
    function save(arg) {
        return __awaiter(this, void 0, void 0, function () {
            var saveable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saveable = getDirty(arg);
                        if (!saveable) return [3 /*break*/, 2];
                        return [4 /*yield*/, saveable.save()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    Saveable.save = save;
    function apply(widget) {
        var _this = this;
        var saveable = Saveable.get(widget);
        if (saveable) {
            setDirty(widget, saveable.dirty);
            saveable.onDirtyChanged(function () { return setDirty(widget, saveable.dirty); });
            var close_1 = widget.close.bind(widget);
            widget.close = function () { return __awaiter(_this, void 0, void 0, function () {
                var dialog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!saveable.dirty) return [3 /*break*/, 3];
                            dialog = new ShouldSaveDialog(widget);
                            return [4 /*yield*/, dialog.open()];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 3];
                            return [4 /*yield*/, Saveable.save(widget)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            close_1();
                            return [2 /*return*/];
                    }
                });
            }); };
        }
    }
    Saveable.apply = apply;
})(Saveable = exports.Saveable || (exports.Saveable = {}));
/**
 * The class name added to the dirty widget's title.
 */
var DIRTY_CLASS = 'theia-mod-dirty';
function setDirty(widget, dirty) {
    var dirtyClass = " " + DIRTY_CLASS;
    widget.title.className = widget.title.className.replace(dirtyClass, '');
    if (dirty) {
        widget.title.className += dirtyClass;
    }
}
exports.setDirty = setDirty;
var ShouldSaveDialog = /** @class */ (function (_super) {
    __extends(ShouldSaveDialog, _super);
    function ShouldSaveDialog(widget) {
        var _this = _super.call(this, {
            title: "Do you want to save the changes you made to " + (widget.title.label || widget.title.caption) + "?"
        }) || this;
        _this.shouldSave = true;
        var messageNode = document.createElement("div");
        messageNode.textContent = "Your change will be lost if you don't save them.";
        messageNode.setAttribute('style', 'flex: 1 100%; padding-bottom: calc(var(--theia-ui-padding)*3);');
        _this.contentNode.appendChild(messageNode);
        _this.contentNode.appendChild(_this.dontSaveButton = _this.createButton("Don't Save"));
        _this.appendCloseButton();
        _this.appendAcceptButton('Save');
        return _this;
    }
    ShouldSaveDialog.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        this.addKeyListener(this.dontSaveButton, common_1.Key.ENTER, function () {
            _this.shouldSave = false;
            _this.accept();
        }, 'click');
    };
    Object.defineProperty(ShouldSaveDialog.prototype, "value", {
        get: function () {
            return this.shouldSave;
        },
        enumerable: true,
        configurable: true
    });
    return ShouldSaveDialog;
}(dialogs_1.AbstractDialog));
exports.ShouldSaveDialog = ShouldSaveDialog;
//# sourceMappingURL=saveable.js.map