"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var inversify_1 = require("inversify");
var LabelIcon;
(function (LabelIcon) {
    function is(val) {
        return 'name' in val;
    }
    LabelIcon.is = is;
})(LabelIcon = exports.LabelIcon || (exports.LabelIcon = {}));
var LabelParser = /** @class */ (function () {
    function LabelParser() {
    }
    /**
     * Returns an array with parts of the given text.
     * These parts are of type LabelPart which can be either a string or a LabelIcon.
     * For splitting up the giving text the parser follows this rule:
     * The text gets parsed for the following pattern: $(iconName~iconAnimation).
     * If the parser finds such pattern a new LabelIcon object
     * { name: 'iconName', animation: 'iconAnimation'} is added to the returned array.
     * iconName can be for instance the name of an icon of e.g. FontAwesome and the (optional) iconAnimation
     * the name of an animation class which must be supported by the particular icon toolkit.
     *
     * Every string before, between or after such icon patterns gets also added to the array
     * before, between or after the related LabelIcon.
     *
     * @param text - the label text to parse
     */
    LabelParser.prototype.parse = function (text) {
        var parserArray = [];
        var arrPointer = 0;
        var potentialIcon = '';
        for (var idx = 0; idx < text.length; idx++) {
            var char = text.charAt(idx);
            parserArray[arrPointer] = parserArray[arrPointer] || '';
            if (potentialIcon === '') {
                if (char === '$') {
                    potentialIcon += char;
                }
                else {
                    parserArray[arrPointer] += char;
                }
            }
            else if (potentialIcon === '$') {
                if (char === '(') {
                    potentialIcon += char;
                }
                else {
                    parserArray[arrPointer] += potentialIcon + char;
                    potentialIcon = '';
                }
            }
            else {
                if (char === ')') {
                    var iconClassArr = potentialIcon.substring(2, potentialIcon.length).split('~');
                    if (parserArray[arrPointer] !== '') {
                        arrPointer++;
                    }
                    parserArray[arrPointer] = { name: iconClassArr[0], animation: iconClassArr[1] };
                    arrPointer++;
                    potentialIcon = '';
                }
                else {
                    potentialIcon += char;
                }
            }
        }
        if (potentialIcon !== '') {
            parserArray[arrPointer] += potentialIcon;
        }
        return parserArray;
    };
    LabelParser = __decorate([
        inversify_1.injectable()
    ], LabelParser);
    return LabelParser;
}());
exports.LabelParser = LabelParser;
//# sourceMappingURL=label-parser.js.map