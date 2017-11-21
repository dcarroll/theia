"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var endpoint_1 = require("@theia/core/src/browser/endpoint");
var expect = chai.expect;
describe("Endpoint", function () {
    before(function () {
        chai.config.showDiff = true;
        chai.config.includeStack = true;
    });
    describe("01 #getWebSocketUrl", function () {
        it("Should correctly join root pathname", function () {
            expectWsUri({
                httpScheme: "ws",
                path: "/miau/"
            }, {
                host: "example.org",
                pathname: "/",
                search: "",
                protocol: ""
            }, "ws://example.org/miau/");
        });
        it("Should correctly join pathname and path", function () {
            expectWsUri({
                httpScheme: "ws",
                path: "/miau/"
            }, {
                host: "example.org",
                pathname: "/mainresource",
                search: "",
                protocol: ""
            }, "ws://example.org/mainresource/miau/");
        });
        it("Should correctly join pathname and path, ignoring double slash in between", function () {
            expectWsUri({
                httpScheme: "ws",
                path: "/miau/"
            }, {
                host: "example.org",
                pathname: "/mainresource/",
                search: "",
                protocol: ""
            }, "ws://example.org/mainresource/miau/");
        });
        it("Should correctly join pathname and path, without trailing slash", function () {
            expectWsUri({
                httpScheme: "ws",
                path: "/miau"
            }, {
                host: "example.org",
                pathname: "/mainresource",
                search: "",
                protocol: ""
            }, "ws://example.org/mainresource/miau");
        });
    });
    describe("02 #httpScheme", function () {
        it("Should choose https:// if location protocol is https://", function () {
            expectRestUri({
                path: "/"
            }, {
                host: "example.org",
                pathname: "/",
                search: "",
                protocol: "https:"
            }, "https://example.org/");
        });
    });
});
function expectWsUri(options, mockLocation, expectedUri) {
    var cut = new endpoint_1.Endpoint(options, mockLocation);
    var uri = cut.getWebSocketUrl();
    expect(uri.toString()).to.eq(expectedUri);
}
function expectRestUri(options, mockLocation, expectedUri) {
    var cut = new endpoint_1.Endpoint(options, mockLocation);
    var uri = cut.getRestUrl();
    expect(uri.toString()).to.eq(expectedUri);
}
//# sourceMappingURL=endpoint.spec.js.map