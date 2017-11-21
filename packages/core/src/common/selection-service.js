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
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../common/event");
var inversify_1 = require("inversify");
var SelectionService = /** @class */ (function () {
    function SelectionService() {
        this.selectionListeners = new event_1.Emitter();
    }
    Object.defineProperty(SelectionService.prototype, "selection", {
        get: function () {
            return this.currentSelection;
        },
        set: function (selection) {
            this.currentSelection = selection;
            this.selectionListeners.fire(this.currentSelection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionService.prototype, "onSelectionChanged", {
        get: function () {
            return this.selectionListeners.event;
        },
        enumerable: true,
        configurable: true
    });
    SelectionService = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], SelectionService);
    return SelectionService;
}());
exports.SelectionService = SelectionService;
//# sourceMappingURL=selection-service.js.map