"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var browser_menu_plugin_1 = require("./browser-menu-plugin");
var BrowserContextMenuRenderer = /** @class */ (function () {
    function BrowserContextMenuRenderer(menuFactory) {
        this.menuFactory = menuFactory;
    }
    BrowserContextMenuRenderer.prototype.render = function (menuPath, anchor, onHide) {
        var contextMenu = this.menuFactory.createContextMenu(menuPath);
        var _a = anchor instanceof MouseEvent ? { x: anchor.clientX, y: anchor.clientY } : anchor, x = _a.x, y = _a.y;
        if (onHide) {
            contextMenu.aboutToClose.connect(function () { return onHide(); });
        }
        contextMenu.open(x, y);
    };
    BrowserContextMenuRenderer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_menu_plugin_1.BrowserMainMenuFactory)),
        __metadata("design:paramtypes", [browser_menu_plugin_1.BrowserMainMenuFactory])
    ], BrowserContextMenuRenderer);
    return BrowserContextMenuRenderer;
}());
exports.BrowserContextMenuRenderer = BrowserContextMenuRenderer;
//# sourceMappingURL=browser-context-menu-renderer.js.map