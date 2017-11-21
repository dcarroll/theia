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
var virtualdom_1 = require("@phosphor/virtualdom");
var core_1 = require("@theia/core");
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("../common");
var extension_uri_1 = require("./extension-uri");
var ExtensionWidget = /** @class */ (function (_super) {
    __extends(ExtensionWidget, _super);
    function ExtensionWidget(extensionManager, openerService) {
        var _this = _super.call(this) || this;
        _this.extensionManager = extensionManager;
        _this.openerService = openerService;
        _this.extensions = [];
        _this.toDisposeOnFetch = new core_1.DisposableCollection();
        _this.toDisposeOnSearch = new core_1.DisposableCollection();
        _this.ready = false;
        _this.id = 'extensions';
        _this.title.label = 'Extensions';
        _this.addClass('theia-extensions');
        _this.update();
        _this.fetchExtensions();
        extensionManager.onDidChange(function () { return _this.update(); });
        return _this;
    }
    ExtensionWidget_1 = ExtensionWidget;
    ExtensionWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.fetchExtensions();
    };
    ExtensionWidget.prototype.fetchExtensions = function () {
        var _this = this;
        var htmlInputElement = document.getElementById('extensionSearchField');
        var query = htmlInputElement ? htmlInputElement.value.trim() : '';
        this.extensionManager.list({ query: query }).then(function (extensions) {
            _this.extensions = query ? extensions : extensions.filter(function (e) { return !e.dependent; });
            _this.ready = true;
            _this.update();
        });
    };
    ExtensionWidget.prototype.render = function () {
        if (this.ready) {
            return [this.renderSearchField(), this.renderExtensionList()];
        }
        else {
            var spinner = virtualdom_1.h.div({ className: 'fa fa-spinner fa-pulse fa-3x fa-fw' }, '');
            return virtualdom_1.h.div({ className: 'spinnerContainer' }, spinner);
        }
    };
    ExtensionWidget.prototype.renderSearchField = function () {
        var _this = this;
        var searchField = virtualdom_1.h.input({
            id: 'extensionSearchField',
            type: 'text',
            placeholder: 'Search theia extensions',
            onkeyup: function () {
                _this.toDisposeOnSearch.dispose();
                var delay = setTimeout(function () { return _this.fetchExtensions(); }, ExtensionWidget_1.SEARCH_DELAY);
                _this.toDisposeOnSearch.push(core_1.Disposable.create(function () { return clearTimeout(delay); }));
            }
        });
        var innerContainer = virtualdom_1.h.div({
            id: 'extensionSearchFieldContainer',
            className: 'flexcontainer'
        }, [searchField]);
        var container = virtualdom_1.h.div({
            id: 'extensionSearchContainer',
            className: 'flexcontainer'
        }, [innerContainer]);
        return container;
    };
    ExtensionWidget.prototype.renderExtensionList = function () {
        var _this = this;
        var theList = [];
        this.extensions.forEach(function (extension) {
            var container = _this.renderExtension(extension);
            theList.push(container);
        });
        return virtualdom_1.h.div({
            id: 'extensionListContainer'
        }, browser_1.VirtualRenderer.flatten(theList));
    };
    ExtensionWidget.prototype.renderExtension = function (extension) {
        var _this = this;
        var name = virtualdom_1.h.div({
            className: 'extensionName noWrapInfo'
        }, extension.name);
        var version = virtualdom_1.h.div({
            className: 'extensionVersion'
        }, extension.version);
        var author = virtualdom_1.h.div({
            className: 'extensionAuthor noWrapInfo flexcontainer'
        }, extension.author);
        var description = virtualdom_1.h.div({
            className: 'extensionDescription noWrapInfo'
        }, extension.description);
        var extensionButtonContainer = !extension.dependent ? virtualdom_1.h.div({
            className: 'extensionButtonContainer flexcontainer'
        }, this.createButton(extension)) : 'installed via ' + extension.dependent;
        var leftColumn = this.renderColumn('extensionInformationContainer', this.renderRow(name, version), this.renderRow(description), this.renderRow(author, extensionButtonContainer));
        return virtualdom_1.h.div({
            className: this.createExtensionClassName(extension),
            onclick: function () { return browser_1.open(_this.openerService, extension_uri_1.ExtensionUri.toUri(extension.name)); }
        }, leftColumn);
    };
    ExtensionWidget.prototype.createExtensionClassName = function (extension) {
        var classNames = ['extensionHeaderContainer'];
        if (extension.dependent) {
            classNames.push(browser_1.DISABLED_CLASS);
        }
        return classNames.join(' ');
    };
    ExtensionWidget.prototype.renderRow = function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        return virtualdom_1.h.div({
            className: 'row flexcontainer'
        }, browser_1.VirtualRenderer.flatten(children));
    };
    ExtensionWidget.prototype.renderColumn = function (additionalClass) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        return virtualdom_1.h.div({
            className: 'column flexcontainer ' + additionalClass
        }, browser_1.VirtualRenderer.flatten(children));
    };
    ExtensionWidget.prototype.createButton = function (extension) {
        var _this = this;
        var btnLabel = 'Install';
        if (extension.installed) {
            if (extension.outdated) {
                btnLabel = 'Update';
            }
            else {
                btnLabel = 'Uninstall';
            }
        }
        var content = extension.busy ? virtualdom_1.h.i({ className: 'fa fa-spinner fa-pulse fa-fw' }) : btnLabel;
        var btn = virtualdom_1.h.div({
            className: 'extensionButton' +
                (extension.busy ? ' working' : '') + ' ' +
                (extension.installed && !extension.busy ? ' installed' : '') + ' ' +
                (extension.outdated && !extension.busy ? ' outdated' : ''),
            onclick: function (event) {
                if (!extension.busy) {
                    if (extension.installed) {
                        if (extension.outdated) {
                            extension.update();
                        }
                        else {
                            extension.uninstall();
                        }
                    }
                    else {
                        extension.install();
                    }
                    _this.update();
                    event.stopPropagation();
                }
            }
        }, content);
        return btn;
    };
    ExtensionWidget.SEARCH_DELAY = 200;
    ExtensionWidget = ExtensionWidget_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ExtensionManager)),
        __param(1, inversify_1.inject(browser_1.OpenerService)),
        __metadata("design:paramtypes", [common_1.ExtensionManager, Object])
    ], ExtensionWidget);
    return ExtensionWidget;
    var ExtensionWidget_1;
}(browser_1.VirtualWidget));
exports.ExtensionWidget = ExtensionWidget;
//# sourceMappingURL=extension-widget.js.map