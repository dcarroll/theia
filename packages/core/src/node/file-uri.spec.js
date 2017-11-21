"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var path = require("path");
var chai = require("chai");
var file_uri_1 = require("./file-uri");
var expect = chai.expect;
describe("file-uri", function () {
    var filePaths = ["with.txt", "with spaces.txt", "with:colon.txt", "with_Ö.txt"].map(function (filePath) { return path.join(os.tmpdir(), "file-uri-folder", filePath); });
    it("create -> fsPath -> create should be symmetric", function () {
        var orderedPaths = filePaths.map(function (filePath) { return filePath.toLowerCase(); }).sort();
        expect(orderedPaths.map(function (filePath) { return file_uri_1.FileUri.create(filePath); }).map(function (uri) { return file_uri_1.FileUri.fsPath(uri).toLowerCase(); }).sort()).to.be.deep.equal(orderedPaths);
    });
    it("fsPath -> create -> fsPath should be symmetric", function () {
        filePaths.forEach(function (filePath) {
            var expectedUri = file_uri_1.FileUri.create(filePath);
            var convertedPath = file_uri_1.FileUri.fsPath(expectedUri);
            var actualUri = file_uri_1.FileUri.create(convertedPath);
            expect(actualUri.toString()).to.be.equal(expectedUri.toString());
        });
    });
    it('from /', function () {
        var uri = file_uri_1.FileUri.create('/');
        expect(uri.toString(true)).to.be.equal('file:///');
    });
    it('from //', function () {
        var uri = file_uri_1.FileUri.create('//');
        expect(uri.toString(true)).to.be.equal('file:///');
    });
    it('from c:', function () {
        var uri = file_uri_1.FileUri.create('c:');
        expect(uri.toString(true)).to.be.equal('file:///c:');
    });
    it('from /c:', function () {
        var uri = file_uri_1.FileUri.create('/c:');
        expect(uri.toString(true)).to.be.equal('file:///c:');
    });
    it('from /c:/', function () {
        var uri = file_uri_1.FileUri.create('/c:/');
        expect(uri.toString(true)).to.be.equal('file:///c:/');
    });
});
//# sourceMappingURL=file-uri.spec.js.map