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
exports.extensionPath = '/services/extensions';
/**
 * The raw extension information from the repository.
 */
var RawExtension = /** @class */ (function () {
    function RawExtension() {
    }
    return RawExtension;
}());
exports.RawExtension = RawExtension;
/**
 * The detailed extension information from the repository.
 */
var ResolvedRawExtension = /** @class */ (function (_super) {
    __extends(ResolvedRawExtension, _super);
    function ResolvedRawExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResolvedRawExtension;
}(RawExtension));
exports.ResolvedRawExtension = ResolvedRawExtension;
/**
 * The extension consists of the raw information and the installation state.
 */
var Extension = /** @class */ (function (_super) {
    __extends(Extension, _super);
    function Extension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Extension;
}(RawExtension));
exports.Extension = Extension;
exports.ExtensionServer = Symbol('ExtensionServer');
exports.ExtensionClient = Symbol('ExtensionClient');
//# sourceMappingURL=extension-protocol.js.map