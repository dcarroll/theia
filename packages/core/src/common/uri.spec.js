"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var uri_1 = require("./uri");
var expect = chai.expect;
before(function () {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
    chai.should();
});
beforeEach(function () {
});
describe("uri", function () {
    describe("#getParent", function () {
        it("of file:///foo/bar.txt", function () {
            expect(new uri_1.default("file:///foo/bar.txt").parent.toString()).equals("file:///foo");
        });
        it("of file:///foo/", function () {
            expect(new uri_1.default("file:///foo/").parent.toString()).equals("file:///foo");
        });
        it("of file:///foo", function () {
            expect(new uri_1.default("file:///foo").parent.toString()).equals("file:///");
        });
        it("of file:///", function () {
            expect(new uri_1.default("file:///").parent.toString()).equals("file:///");
        });
        it("of file://", function () {
            expect(new uri_1.default("file://").parent.toString()).equals("file://");
        });
    });
    describe("#lastSegment", function () {
        it("of file:///foo/bar.txt", function () {
            expect(new uri_1.default("file:///foo/bar.txt").path.base).equals("bar.txt");
        });
        it("of file:///foo", function () {
            expect(new uri_1.default("file:///foo").path.base).equals("foo");
        });
        it("of file:///", function () {
            expect(new uri_1.default("file:///").path.base).equals("");
        });
        it("of file://", function () {
            expect(new uri_1.default("file://").path.base).equals("");
        });
    });
    describe("#appendPath", function () {
        it("'' to file:///foo", function () {
            var uri = new uri_1.default("file:///foo");
            expect(uri.resolve("").toString()).to.be.equal(uri.toString());
        });
        it("bar to file:///foo", function () {
            expect(new uri_1.default("file:///foo").resolve("bar").toString()).to.be.equal("file:///foo/bar");
        });
        it("bar/baz to file:///foo", function () {
            expect(new uri_1.default("file:///foo").resolve("bar/baz").toString()).to.be.equal("file:///foo/bar/baz");
        });
        it("'' to file:///", function () {
            var uri = new uri_1.default("file:///");
            expect(uri.resolve("").toString()).to.be.equal(uri.toString());
        });
        it("bar to file:///", function () {
            expect(new uri_1.default("file:///").resolve("bar").toString()).to.be.equal("file:///bar");
        });
        it("bar/baz to file:///", function () {
            expect(new uri_1.default("file:///").resolve("bar/baz").toString()).to.be.equal("file:///bar/baz");
        });
    });
    describe("#path", function () {
        it("Should return with the FS path from the URI.", function () {
            expect(new uri_1.default("file:///foo/bar/baz.txt").path.toString()).equals("/foo/bar/baz.txt");
        });
        it("Should not return the encoded path", function () {
            expect(new uri_1.default("file:///foo 3/bar 4/baz 4.txt").path.toString()).equals("/foo 3/bar 4/baz 4.txt");
        });
    });
    describe("#withFragment", function () {
        it("Should replace the fragment.", function () {
            expect(new uri_1.default("file:///foo/bar/baz.txt#345345").withFragment("foo").toString()).equals("file:///foo/bar/baz.txt#foo");
            expect(new uri_1.default("file:///foo/bar/baz.txt?foo=2#345345").withFragment("foo").toString(true)).equals("file:///foo/bar/baz.txt?foo=2#foo");
        });
        it("Should remove the fragment.", function () {
            expect(new uri_1.default("file:///foo/bar/baz.txt#345345").withFragment("").toString()).equals("file:///foo/bar/baz.txt");
        });
    });
    describe("#toString()", function () {
        it("should produce the non encoded string", function () {
            function check(uri) {
                expect(new uri_1.default(uri).toString(true)).equals(uri);
            }
            check('file:///X?test=32');
            check('file:///X?test=32#345');
            check('file:///X test/ddd?test=32#345');
        });
    });
    describe("#Uri.with...()", function () {
        it("produce proper URIs", function () {
            var uri = new uri_1.default().withScheme('file').withPath('/foo/bar.txt').withQuery("x=12").withFragment("baz");
            expect(uri.toString(true)).equals("file:///foo/bar.txt?x=12#baz");
            expect(uri.withoutScheme().toString(true)).equals("/foo/bar.txt?x=12#baz");
            expect(uri.withScheme("http").toString(true)).equals("http:/foo/bar.txt?x=12#baz");
            expect(uri.withoutQuery().toString(true)).equals("file:///foo/bar.txt#baz");
            expect(uri.withoutFragment().toString(true)).equals(uri.withFragment('').toString(true));
            expect(uri.withPath("hubba-bubba").toString(true)).equals("file://hubba-bubba?x=12#baz");
        });
    });
});
//# sourceMappingURL=uri.spec.js.map