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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var widgets_1 = require("@phosphor/widgets");
var common_1 = require("../../common");
inversify_1.decorate(inversify_1.injectable(), widgets_1.Widget);
inversify_1.decorate(inversify_1.unmanaged(), widgets_1.Widget, 0);
__export(require("@phosphor/widgets"));
__export(require("@phosphor/messaging"));
exports.DISABLED_CLASS = 'theia-mod-disabled';
exports.COLLAPSED_CLASS = 'theia-mod-collapsed';
exports.SELECTED_CLASS = 'theia-mod-selected';
var BaseWidget = /** @class */ (function (_super) {
    __extends(BaseWidget, _super);
    function BaseWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toDispose = new common_1.DisposableCollection();
        _this.toDisposeOnDetach = new common_1.DisposableCollection();
        return _this;
    }
    BaseWidget.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        this.toDispose.dispose();
    };
    BaseWidget.prototype.onCloseRequest = function (msg) {
        _super.prototype.onCloseRequest.call(this, msg);
        this.dispose();
    };
    BaseWidget.prototype.onBeforeDetach = function (msg) {
        this.toDisposeOnDetach.dispose();
        _super.prototype.onBeforeDetach.call(this, msg);
    };
    BaseWidget.prototype.addUpdateListener = function (element, type, useCapture) {
        var _this = this;
        this.addEventListener(element, type, function (e) {
            _this.update();
            e.preventDefault();
        }, useCapture);
    };
    BaseWidget.prototype.addEventListener = function (element, type, listener, useCapture) {
        this.toDisposeOnDetach.push(addEventListener(element, type, listener));
    };
    BaseWidget.prototype.addKeyListener = function (element, keybinding, action) {
        var additionalEventTypes = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            additionalEventTypes[_i - 3] = arguments[_i];
        }
        this.toDisposeOnDetach.push(addKeyListener.apply(void 0, __spread([element, keybinding, action], additionalEventTypes)));
    };
    BaseWidget.prototype.addClipboardListener = function (element, type, listener) {
        this.toDisposeOnDetach.push(addClipboardListener(element, type, listener));
    };
    BaseWidget = __decorate([
        inversify_1.injectable()
    ], BaseWidget);
    return BaseWidget;
}(widgets_1.Widget));
exports.BaseWidget = BaseWidget;
function setEnabled(element, enabled) {
    element.classList.toggle(exports.DISABLED_CLASS, !enabled);
    element.tabIndex = enabled ? 0 : -1;
}
exports.setEnabled = setEnabled;
function createIconButton() {
    var classNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classNames[_i] = arguments[_i];
    }
    var icon = document.createElement('i');
    (_a = icon.classList).add.apply(_a, __spread(classNames));
    var button = document.createElement('span');
    button.tabIndex = 0;
    button.appendChild(icon);
    return button;
    var _a;
}
exports.createIconButton = createIconButton;
var EventListenerObject;
(function (EventListenerObject) {
    function is(listener) {
        return !!listener && 'handleEvent' in listener;
    }
    EventListenerObject.is = is;
})(EventListenerObject = exports.EventListenerObject || (exports.EventListenerObject = {}));
function addEventListener(element, type, listener, useCapture) {
    element.addEventListener(type, listener, useCapture);
    return common_1.Disposable.create(function () {
        return element.removeEventListener(type, listener);
    });
}
exports.addEventListener = addEventListener;
function addKeyListener(element, keybinding, action) {
    var additionalEventTypes = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        additionalEventTypes[_i - 3] = arguments[_i];
    }
    var toDispose = new common_1.DisposableCollection();
    var keyCode = common_1.KeyCode.createKeyCode({ first: keybinding });
    toDispose.push(addEventListener(element, 'keydown', function (e) {
        if (common_1.KeyCode.createKeyCode(e).equals(keyCode)) {
            action();
            e.stopPropagation();
            e.preventDefault();
        }
    }));
    try {
        for (var additionalEventTypes_1 = __values(additionalEventTypes), additionalEventTypes_1_1 = additionalEventTypes_1.next(); !additionalEventTypes_1_1.done; additionalEventTypes_1_1 = additionalEventTypes_1.next()) {
            var type = additionalEventTypes_1_1.value;
            toDispose.push(addEventListener(element, type, function (e) {
                action();
                e.stopPropagation();
                e.preventDefault();
            }));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (additionalEventTypes_1_1 && !additionalEventTypes_1_1.done && (_a = additionalEventTypes_1.return)) _a.call(additionalEventTypes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return toDispose;
    var e_1, _a;
}
exports.addKeyListener = addKeyListener;
function addClipboardListener(element, type, listener) {
    var documentListener = function (e) {
        var activeElement = document.activeElement;
        if (activeElement && element.contains(activeElement)) {
            if (EventListenerObject.is(listener)) {
                listener.handleEvent(e);
            }
            else {
                listener.bind(element)(e);
            }
        }
    };
    document.addEventListener(type, documentListener);
    return common_1.Disposable.create(function () {
        return document.removeEventListener(type, documentListener);
    });
}
exports.addClipboardListener = addClipboardListener;
//# sourceMappingURL=widget.js.map