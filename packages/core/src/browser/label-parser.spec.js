"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var label_parser_1 = require("./label-parser");
var common_1 = require("./../common");
var inversify_1 = require("inversify");
var chai_1 = require("chai");
var statusBarEntryUtility;
before(function () {
    var testContainer = new inversify_1.Container();
    testContainer.bind(label_parser_1.LabelParser).toSelf().inSingletonScope();
    testContainer.bind(common_1.CommandService).toDynamicValue(function (ctx) { return ({
        executeCommand: function () {
            return Promise.resolve(undefined);
        }
    }); }).inSingletonScope();
    statusBarEntryUtility = testContainer.get(label_parser_1.LabelParser);
});
describe("StatusBarEntryUtility", function () {
    var text;
    it("should create an empty array.", function () {
        text = '';
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(0);
    });
    it("should create a string array with one entry.", function () {
        text = 'foo bar';
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(1);
        chai_1.expect(iconArr[0]).equals('foo bar');
    });
    it("should create a string array with one entry - text contains an $.", function () {
        text = 'foo $ bar';
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(1);
        chai_1.expect(iconArr[0]).equals('foo $ bar');
    });
    it("should create a string array with one entry - text contains an $( which does not close.", function () {
        text = 'foo $(bar';
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(1);
        chai_1.expect(iconArr[0]).equals('foo $(bar');
    });
    it("should create a string array with two entries. Second is a simple StatusBarIcon.", function () {
        text = 'foo $(bar)';
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(2);
        chai_1.expect(iconArr[0]).equals('foo ');
        chai_1.expect(iconArr[1]).has.property('name');
        chai_1.expect(iconArr[1]).has.property('animation');
        chai_1.expect(iconArr[1].name).equals('bar');
        chai_1.expect(iconArr[1].animation).to.be.undefined;
    });
    it("should create a string array with two entries. Second is a StatusBarIcon with an animation.", function () {
        text = 'foo $(bar~baz)';
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(2);
        chai_1.expect(iconArr[0]).equals('foo ');
        chai_1.expect(iconArr[1]).has.property('name');
        chai_1.expect(iconArr[1]).has.property('animation');
        chai_1.expect(iconArr[1].name).equals('bar');
        chai_1.expect(iconArr[1].animation).equals('baz');
    });
    it("should create string array of 'foo $(icon1) bar $(icon2) baz $(icon3)'", function () {
        text = "foo $(icon1) bar $(icon2) baz $(icon3)";
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(6);
        chai_1.expect(iconArr[0]).equals('foo ');
        chai_1.expect(iconArr[2]).equals(' bar ');
    });
    it("should create string array of '$(icon1) foo bar $(icon2) baz $(icon3)'", function () {
        text = "$(icon1) foo bar $(icon2~ani1) baz $(icon3)";
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(5);
        chai_1.expect(iconArr[0]).has.property('name');
        chai_1.expect(iconArr[0].name).equals('icon1');
        chai_1.expect(iconArr[2]).has.property('animation');
        chai_1.expect(iconArr[2].animation).equals('ani1');
    });
    it("should create an array with one element of '$(icon1)'", function () {
        text = "$(icon1)";
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(1);
        chai_1.expect(iconArr[0]).has.property('name');
        chai_1.expect(iconArr[0].name).equals('icon1');
    });
    it("should create an array of '$(icon1)$(icon2) (icon3)'", function () {
        text = "$(icon1)$(icon2) $(icon3)";
        var iconArr = statusBarEntryUtility.parse(text);
        chai_1.expect(iconArr).to.have.lengthOf(4);
        chai_1.expect(iconArr[0]).has.property('name');
        chai_1.expect(iconArr[0].name).equals('icon1');
        chai_1.expect(iconArr[1]).has.property('name');
        chai_1.expect(iconArr[1].name).equals('icon2');
        chai_1.expect(iconArr[2]).equals(' ');
        chai_1.expect(iconArr[3]).has.property('name');
        chai_1.expect(iconArr[3].name).equals('icon3');
    });
});
//# sourceMappingURL=label-parser.spec.js.map