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
var browser_1 = require("@theia/core/lib/browser");
var lib_1 = require("@phosphor/virtualdom/lib");
var ExtensionDetailWidget = /** @class */ (function (_super) {
    __extends(ExtensionDetailWidget, _super);
    function ExtensionDetailWidget(resolvedExtension) {
        var _this = _super.call(this) || this;
        _this.resolvedExtension = resolvedExtension;
        _this.addClass('theia-extension-detail');
        resolvedExtension.onDidChange(function (change) {
            if (change.name === _this.resolvedExtension.name) {
                _this.update();
            }
        });
        _this.update();
        return _this;
    }
    ExtensionDetailWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.update();
    };
    ExtensionDetailWidget.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        var el = document.getElementById(this.id + 'Doc');
        if (el !== null) {
            el.innerHTML = this.resolvedExtension.documentation;
        }
    };
    ExtensionDetailWidget.prototype.render = function () {
        var r = this.resolvedExtension;
        var name = lib_1.h.h2({ className: 'extensionName' }, r.name);
        var extversion = lib_1.h.div({ className: 'extensionVersion' }, r.version);
        var author = lib_1.h.div({ className: 'extensionAuthor' }, r.author);
        var titleInfo = lib_1.h.div({ className: 'extensionSubtitle' }, author, extversion);
        var titleContainer = lib_1.h.div({ className: 'extensionTitleContainer' }, name, titleInfo);
        var description = lib_1.h.div({ className: 'extensionDescription' }, r.description);
        var buttonContainer = this.createButtonContainer();
        var headerContainer = lib_1.h.div({
            className: this.createExtensionClassName()
        }, titleContainer, description, buttonContainer);
        var documentation = lib_1.h.div({ className: 'extensionDocumentation', id: this.id + 'Doc' }, '');
        var docContainer = lib_1.h.div({ className: 'extensionDocContainer flexcontainer' }, documentation);
        return [headerContainer, docContainer];
    };
    ExtensionDetailWidget.prototype.createExtensionClassName = function () {
        var classNames = ['extensionHeaderContainer'];
        if (this.resolvedExtension.dependent) {
            classNames.push(browser_1.DISABLED_CLASS);
        }
        return classNames.join(' ');
    };
    ExtensionDetailWidget.prototype.createButtonContainer = function () {
        if (this.resolvedExtension.dependent) {
            return 'installed via ' + this.resolvedExtension.dependent;
        }
        var buttonRow = lib_1.h.div({ className: 'extensionButtonRow' }, browser_1.VirtualRenderer.flatten(this.createButtons(this.resolvedExtension)));
        return lib_1.h.div({ className: 'extensionButtonContainer' }, buttonRow);
    };
    ExtensionDetailWidget.prototype.createButtons = function (extension) {
        var buttonArr = [];
        var btnLabel = 'Install';
        if (extension.installed) {
            btnLabel = 'Uninstall';
        }
        var faEl = lib_1.h.i({ className: 'fa fa-spinner fa-pulse fa-fw' });
        var content = extension.busy ? faEl : btnLabel;
        buttonArr.push(lib_1.h.div({
            className: 'extensionButton' +
                (extension.busy ? ' working' : '') + ' ' +
                (extension.installed && !extension.busy ? ' installed' : '') + ' ' +
                (extension.outdated && !extension.busy ? ' outdated' : ''),
            onclick: function (event) {
                if (!extension.busy) {
                    if (extension.installed) {
                        extension.uninstall();
                    }
                    else {
                        extension.install();
                    }
                    event.stopPropagation();
                }
            }
        }, content));
        if (extension.outdated) {
            buttonArr.push(lib_1.h.div({
                className: (extension.busy ? ' working' : '') + ' ' + 'extensionButton' + (extension.outdated && !extension.busy ? ' outdated' : ''),
                onclick: function (event) {
                    if (!extension.busy) {
                        extension.update();
                    }
                }
            }, extension.busy ? faEl : 'Update'));
        }
        return buttonArr;
    };
    return ExtensionDetailWidget;
}(browser_1.VirtualWidget));
exports.ExtensionDetailWidget = ExtensionDetailWidget;
//# sourceMappingURL=extension-detail-widget.js.map