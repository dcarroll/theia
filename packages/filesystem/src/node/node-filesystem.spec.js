"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var assert = require("assert");
var chaiAsPromised = require("chai-as-promised");
var fs = require("fs-extra");
var os = require("os");
var node_1 = require("@theia/core/lib/node");
var preferences_api_1 = require("@theia/preferences-api");
var common_1 = require("../common");
var node_filesystem_1 = require("./node-filesystem");
var chokidar_filesystem_watcher_1 = require("./chokidar-filesystem-watcher");
function tmpdirPath() {
    var path = os.tmpdir();
    if (path.charAt(1) === ':' && process.platform === 'win32') {
        return "" + path.charAt(0).toLowerCase() + path.slice(1);
    }
    return path;
}
var expect = chai.expect;
var uuidV1 = require('uuid/v1');
var TEST_ROOT = node_1.FileUri.create(tmpdirPath()).resolve("node-fs-root");
describe("NodeFileSystem", function () {
    var roots = [];
    var fileSystems = [];
    var root;
    var fileSystem;
    var watcher;
    before(function () {
        chai.config.showDiff = true;
        chai.config.includeStack = true;
        chai.should();
        chai.use(chaiAsPromised);
    });
    beforeEach(function () {
        root = TEST_ROOT.resolve(uuidV1());
        fs.mkdirsSync(node_1.FileUri.fsPath(root));
        expect(fs.existsSync(node_1.FileUri.fsPath(root))).to.be.true;
        expect(fs.readdirSync(node_1.FileUri.fsPath(root))).to.be.empty;
        roots.push(root);
        fileSystem = createFileSystem();
        fileSystems.push(fileSystem);
        watcher = createFileSystemWatcher();
    });
    after(function () {
        watcher.dispose();
        roots.map(function (root) { return node_1.FileUri.fsPath(root); }).forEach(function (root) {
            if (fs.existsSync(root)) {
                try {
                    fs.removeSync(root);
                }
                catch (error) {
                    // Please do not fail during the clean-up phase.
                }
            }
        });
    });
    describe("01 #getFileStat", function () {
        it("Should be rejected if not file exists under the given URI.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.getFileStat(uri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Should return a proper result for a file.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            return fileSystem.getFileStat(uri.toString()).then(function (stat) {
                expect(stat.isDirectory).to.be.false;
                expect(stat.uri).to.eq(uri.toString());
            });
        });
        it("Should return a proper result for a directory.", function () {
            var uri_1 = root.resolve("foo.txt");
            var uri_2 = root.resolve("bar.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri_1), "foo");
            fs.writeFileSync(node_1.FileUri.fsPath(uri_2), "bar");
            expect(fs.statSync(node_1.FileUri.fsPath(uri_1)).isFile()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri_2)).isFile()).to.be.true;
            return fileSystem.getFileStat(root.toString()).then(function (stat) {
                expect(stat.children.length).to.equal(2);
            });
        });
    });
    describe("02 #resolveContent", function () {
        it("Should be rejected with an error when trying to resolve the content of a non-existing file.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.resolveContent(uri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Should be rejected with an error when trying to resolve the content of a directory.", function () {
            var uri = root.resolve("foo");
            fs.mkdirSync(node_1.FileUri.fsPath(uri));
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isDirectory()).to.be.true;
            return fileSystem.resolveContent(uri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Should be rejected with an error if the desired encoding cannot be handled.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo", { encoding: "utf8" });
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("foo");
            return fileSystem.resolveContent(uri.toString(), { encoding: "unknownEncoding" }).should.eventually.be.rejectedWith(Error);
        });
        it("Should be return with the content for an existing file.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo", { encoding: "utf8" });
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("foo");
            return fileSystem.resolveContent(uri.toString()).should.eventually.have.property("content").that.is.equal("foo");
        });
        it("Should be return with the stat object for an existing file.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo", { encoding: "utf8" });
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("foo");
            var content = fileSystem.resolveContent(uri.toString());
            return Promise.all([
                content.should.eventually.be.fulfilled,
                content.should.eventually.have.be.an("object"),
                content.should.eventually.have.property("stat"),
                content.should.eventually.have.property("stat").that.has.property("uri").that.is.equal(uri.toString()),
                content.should.eventually.have.property("stat").that.has.property("size").that.is.greaterThan(1),
                content.should.eventually.have.property("stat").that.has.property("lastModification").that.is.greaterThan(1),
                content.should.eventually.have.property("stat").that.has.property("isDirectory").that.is.false,
                content.should.eventually.have.property("stat").that.not.have.property("children"),
            ]);
        });
    });
    describe("03 #setContent", function () {
        it("Should be rejected with an error when trying to set the content of a non-existing file.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            var stat = {
                uri: uri.toString(),
                lastModification: new Date().getTime(),
                isDirectory: false
            };
            return fileSystem.setContent(stat, "foo").should.eventually.be.rejectedWith(Error);
        });
        it("Should be rejected with an error when trying to set the content of a directory.", function () {
            var uri = root.resolve("foo");
            fs.mkdirSync(node_1.FileUri.fsPath(uri));
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isDirectory()).to.be.true;
            var fileSystem = createFileSystem();
            return fileSystem.getFileStat(uri.toString()).then(function (stat) {
                fileSystem.setContent(stat, "foo").should.be.eventually.be.rejectedWith(Error);
            });
        });
        it("Should be rejected with an error when trying to set the content of a file which is out-of-sync.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo", { encoding: "utf8" });
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("foo");
            var fileSystem = createFileSystem();
            return fileSystem.getFileStat(uri.toString()).then(function (stat) {
                // Make sure current file stat is out-of-sync.
                // Here the content is modified in the way that file sizes will differ.
                fs.writeFileSync(node_1.FileUri.fsPath(uri), "longer", { encoding: "utf8" });
                expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("longer");
                fileSystem.setContent(stat, "baz").should.be.eventually.be.rejectedWith(Error);
            });
        });
        it("Should be rejected with an error when trying to set the content when the desired encoding cannot be handled.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo", { encoding: "utf8" });
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("foo");
            var fileSystem = createFileSystem();
            return fileSystem.getFileStat(uri.toString()).then(function (stat) {
                fileSystem.setContent(stat, "baz", { encoding: "unknownEncoding" }).should.be.eventually.be.rejectedWith(Error);
            });
        });
        it("Should return with a stat representing the latest state of the successfully modified file.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo", { encoding: "utf8" });
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("foo");
            var fileSystem = createFileSystem();
            return fileSystem.getFileStat(uri.toString()).then(function (currentStat) {
                return fileSystem.setContent(currentStat, "baz");
            }).then(function (newStat) {
                expect(fs.readFileSync(node_1.FileUri.fsPath(uri), { encoding: "utf8" })).to.be.equal("baz");
            });
        });
    });
    describe("04 #move", function () {
        it("Should be rejected with an error if no file exists under the source location.", function () {
            var sourceUri = root.resolve("foo.txt");
            var targetUri = root.resolve("bar.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.false;
            return fileSystem.move(sourceUri.toString(), targetUri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Should be rejected with an error if target exists and overwrite is not set to \'true\'.", function () {
            var sourceUri = root.resolve("foo.txt");
            var targetUri = root.resolve("bar.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceUri), "foo");
            fs.writeFileSync(node_1.FileUri.fsPath(targetUri), "bar");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isFile()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isFile()).to.be.true;
            return fileSystem.move(sourceUri.toString(), targetUri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Moving a file to an empty directory. Should be rejected with an error because files cannot be moved to an existing directory locations.", function () {
            var sourceUri = root.resolve("foo.txt");
            var targetUri = root.resolve("bar");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceUri), "foo");
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(sourceUri), "utf8")).to.be.equal("foo");
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.be.empty;
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).should.eventually.be.rejectedWith(Error);
        });
        it("Moving a file to a non-empty directory. Should be rejected with and error because files cannot be moved to an existing directory locations.", function () {
            var sourceUri = root.resolve("foo.txt");
            var targetUri = root.resolve("bar");
            var targetFileUri_01 = targetUri.resolve("bar_01.txt");
            var targetFileUri_02 = targetUri.resolve("bar_02.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceUri), "foo");
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            fs.writeFileSync(node_1.FileUri.fsPath(targetFileUri_01), "bar_01");
            fs.writeFileSync(node_1.FileUri.fsPath(targetFileUri_02), "bar_02");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(sourceUri), "utf8")).to.be.equal("foo");
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetFileUri_01), "utf8")).to.be.equal("bar_01");
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetFileUri_02), "utf8")).to.be.equal("bar_02");
            expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.include("bar_01.txt").and.to.include("bar_02.txt");
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).should.eventually.be.rejectedWith(Error);
        });
        it("Moving an empty directory to file. Should be rejected with an error because directories and cannot be moved to existing file locations.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.writeFileSync(node_1.FileUri.fsPath(targetUri), "bar");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri), "utf8")).to.be.equal("bar");
            expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.be.empty;
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).should.eventually.be.rejectedWith(Error);
        });
        it("Moving a non-empty directory to file. Should be rejected with an error because directories cannot be moved to existing file locations.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar.txt");
            var sourceFileUri_01 = sourceUri.resolve("foo_01.txt");
            var sourceFileUri_02 = sourceUri.resolve("foo_02.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.writeFileSync(node_1.FileUri.fsPath(targetUri), "bar");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceFileUri_01), "foo_01");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceFileUri_02), "foo_02");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri), "utf8")).to.be.equal("bar");
            expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.include("foo_01.txt").and.to.include("foo_02.txt");
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).should.eventually.be.rejectedWith(Error);
        });
        it("Moving file to file. Should overwrite the target file content and delete the source file.", function () {
            var sourceUri = root.resolve("foo.txt");
            var targetUri = root.resolve("bar.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceUri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isFile()).to.be.true;
            expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.false;
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).then(function (stat) {
                expect(stat).is.an("object").and.has.property("uri").that.equals(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.false;
                expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isFile()).to.be.true;
                expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri), "utf8")).to.be.equal("foo");
            });
        });
        it("Moving an empty directory to an empty directory. Should remove the source directory.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.be.empty;
            expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.be.empty;
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).then(function (stat) {
                expect(stat).is.an("object").and.has.property("uri").that.equals(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.false;
                expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
                expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.be.empty;
            });
        });
        it("Moving an empty directory to a non-empty directory. Should be rejected because the target folder is not empty.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            var targetFileUri_01 = targetUri.resolve("bar_01.txt");
            var targetFileUri_02 = targetUri.resolve("bar_02.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            fs.writeFileSync(node_1.FileUri.fsPath(targetFileUri_01), "bar_01");
            fs.writeFileSync(node_1.FileUri.fsPath(targetFileUri_02), "bar_02");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.be.empty;
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetFileUri_01), "utf8")).to.be.equal("bar_01");
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetFileUri_02), "utf8")).to.be.equal("bar_02");
            expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.include("bar_01.txt").and.to.include("bar_02.txt");
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).should.eventually.be.rejectedWith(Error);
        });
        it("Moving a non-empty directory to an empty directory. Source folder and its content should be moved to the target location.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            var sourceFileUri_01 = sourceUri.resolve("foo_01.txt");
            var sourceFileUri_02 = sourceUri.resolve("foo_02.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            fs.writeFileSync(node_1.FileUri.fsPath(sourceFileUri_01), "foo_01");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceFileUri_02), "foo_02");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.be.empty;
            expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.include("foo_01.txt").and.to.include("foo_02.txt");
            expect(fs.readFileSync(node_1.FileUri.fsPath(sourceFileUri_01), "utf8")).to.be.equal("foo_01");
            expect(fs.readFileSync(node_1.FileUri.fsPath(sourceFileUri_02), "utf8")).to.be.equal("foo_02");
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).then(function (stat) {
                expect(stat).is.an("object").and.has.property("uri").that.equals(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.false;
                expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
                expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.include("foo_01.txt").and.to.include("foo_02.txt");
                expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri.resolve("foo_01.txt")), "utf8")).to.be.equal("foo_01");
                expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri.resolve("foo_02.txt")), "utf8")).to.be.equal("foo_02");
            });
        });
        it("Moving a non-empty directory to a non-empty directory. Should be rejected because the target location is not empty.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            var sourceFileUri_01 = sourceUri.resolve("foo_01.txt");
            var sourceFileUri_02 = sourceUri.resolve("foo_02.txt");
            var targetFileUri_01 = targetUri.resolve("bar_01.txt");
            var targetFileUri_02 = targetUri.resolve("bar_02.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            fs.writeFileSync(node_1.FileUri.fsPath(sourceFileUri_01), "foo_01");
            fs.writeFileSync(node_1.FileUri.fsPath(sourceFileUri_02), "foo_02");
            fs.writeFileSync(node_1.FileUri.fsPath(targetFileUri_01), "bar_01");
            fs.writeFileSync(node_1.FileUri.fsPath(targetFileUri_02), "bar_02");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(sourceFileUri_01), "utf8")).to.be.equal("foo_01");
            expect(fs.readFileSync(node_1.FileUri.fsPath(sourceFileUri_02), "utf8")).to.be.equal("foo_02");
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetFileUri_01), "utf8")).to.be.equal("bar_01");
            expect(fs.readFileSync(node_1.FileUri.fsPath(targetFileUri_02), "utf8")).to.be.equal("bar_02");
            expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.include("foo_01.txt").and.to.include("foo_02.txt");
            expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.include("bar_01.txt").and.to.include("bar_02.txt");
            return fileSystem.move(sourceUri.toString(), targetUri.toString(), { overwrite: true }).should.eventually.be.rejectedWith(Error);
        });
    });
    describe("05 #copy", function () {
        it("Copy a file from non existing location. Should be rejected with an error. Nothing to copy.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.false;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            return fileSystem.copy(sourceUri.toString(), targetUri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Copy a file to existing location without overwrite enabled. Should be rejected with an error.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            fs.mkdirSync(node_1.FileUri.fsPath(targetUri));
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(targetUri)).isDirectory()).to.be.true;
            return fileSystem.copy(sourceUri.toString(), targetUri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Copy an empty directory to a non-existing location. Should return with the file stat representing the new file at the target location.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.false;
            return fileSystem.copy(sourceUri.toString(), targetUri.toString()).then(function (stat) {
                expect(stat).to.be.an("object");
                expect(stat).to.have.property("uri").that.is.equal(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.true;
                expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.true;
            });
        });
        it("Copy an empty directory to a non-existing, nested location. Should return with the file stat representing the new file at the target location.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("nested/path/to/bar");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.false;
            return fileSystem.copy(sourceUri.toString(), targetUri.toString()).then(function (stat) {
                expect(stat).to.be.an("object");
                expect(stat).to.have.property("uri").that.is.equal(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.true;
                expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.true;
            });
        });
        it("Copy a directory with content to a non-existing location. Should return with the file stat representing the new file at the target location.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("bar");
            var subSourceUri = sourceUri.resolve("foo_01.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.writeFileSync(node_1.FileUri.fsPath(subSourceUri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(subSourceUri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(subSourceUri), "utf8")).to.be.equal("foo");
            expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.false;
            return fileSystem.copy(sourceUri.toString(), targetUri.toString()).then(function (stat) {
                expect(stat).to.be.an("object");
                expect(stat).to.have.property("uri").that.is.equal(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.true;
                expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.true;
                expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.contain("foo_01.txt");
                expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.contain("foo_01.txt");
                expect(fs.readFileSync(node_1.FileUri.fsPath(subSourceUri), "utf8")).to.be.equal("foo");
                expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri.resolve("foo_01.txt")), "utf8")).to.be.equal("foo");
            });
        });
        it("Copy a directory with content to a non-existing, nested location. Should return with the file stat representing the new file at the target location.", function () {
            var sourceUri = root.resolve("foo");
            var targetUri = root.resolve("nested/path/to/bar");
            var subSourceUri = sourceUri.resolve("foo_01.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(sourceUri));
            fs.writeFileSync(node_1.FileUri.fsPath(subSourceUri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(sourceUri)).isDirectory()).to.be.true;
            expect(fs.statSync(node_1.FileUri.fsPath(subSourceUri)).isFile()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(subSourceUri), "utf8")).to.be.equal("foo");
            expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.false;
            return fileSystem.copy(sourceUri.toString(), targetUri.toString()).then(function (stat) {
                expect(stat).to.be.an("object");
                expect(stat).to.have.property("uri").that.is.equal(targetUri.toString());
                expect(fs.existsSync(node_1.FileUri.fsPath(sourceUri))).to.be.true;
                expect(fs.existsSync(node_1.FileUri.fsPath(targetUri))).to.be.true;
                expect(fs.readdirSync(node_1.FileUri.fsPath(sourceUri))).to.contain("foo_01.txt");
                expect(fs.readdirSync(node_1.FileUri.fsPath(targetUri))).to.contain("foo_01.txt");
                expect(fs.readFileSync(node_1.FileUri.fsPath(subSourceUri), "utf8")).to.be.equal("foo");
                expect(fs.readFileSync(node_1.FileUri.fsPath(targetUri.resolve("foo_01.txt")), "utf8")).to.be.equal("foo");
            });
        });
    });
    describe("07 #createFile", function () {
        it("Should be rejected with an error if a file already exists with the given URI.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            return fileSystem.createFile(uri.toString()).should.be.eventually.rejectedWith(Error);
        });
        it("Should be rejected with an error if the encoding is given but cannot be handled.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFile(uri.toString(), { encoding: "unknownEncoding" }).should.be.eventually.rejectedWith(Error);
        });
        it("Should create an empty file without any contents by default.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFile(uri.toString()).then(function (stat) {
                expect(stat).is.an("object");
                expect(stat).has.property("uri").that.is.equal(uri.toString());
                expect(stat).not.has.property("children");
                expect(fs.readFileSync(node_1.FileUri.fsPath(uri), "utf8")).to.be.empty;
            });
        });
        it("Should create a file with the desired content.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFile(uri.toString(), { content: "foo" }).then(function (stat) {
                expect(stat).is.an("object");
                expect(stat).has.property("uri").that.is.equal(uri.toString());
                expect(stat).not.has.property("children");
                expect(fs.readFileSync(node_1.FileUri.fsPath(uri), "utf8")).to.be.equal("foo");
            });
        });
        it("Should create a file with the desired content into a non-existing, nested location.", function () {
            var uri = root.resolve("foo/bar/baz.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFile(uri.toString(), { content: "foo" }).then(function (stat) {
                expect(stat).is.an("object");
                expect(stat).has.property("uri").that.is.equal(uri.toString());
                expect(stat).not.has.property("children");
                expect(fs.readFileSync(node_1.FileUri.fsPath(uri), "utf8")).to.be.equal("foo");
            });
        });
        it("Should create a file with the desired content and encoding.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFile(uri.toString(), { content: "foo", encoding: "utf8" }).then(function (stat) {
                expect(stat).is.an("object");
                expect(stat).has.property("uri").that.is.equal(uri.toString());
                expect(stat).not.has.property("children");
                expect(fs.readFileSync(node_1.FileUri.fsPath(uri), "utf8")).to.be.equal("foo");
            });
        });
    });
    describe("08 #createFolder", function () {
        it("Should be rejected with an error if a directory already exist under the desired URI.", function () {
            var uri = root.resolve("foo");
            fs.mkdirSync(node_1.FileUri.fsPath(uri));
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isDirectory()).to.be.true;
            return fileSystem.createFolder(uri.toString()).should.eventually.be.rejectedWith(Error);
        });
        it("Should create a directory and return with the stat object on successful directory creation.", function () {
            var uri = root.resolve("foo");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFolder(uri.toString()).then(function (stat) {
                expect(stat).to.be.an("object");
                expect(stat).to.have.property("uri").that.equals(uri.toString());
                expect(stat).to.have.property("children").that.is.empty;
            });
        });
        it("Should create a directory and return with the stat object on successful directory creation.", function () {
            var uri = root.resolve("foo/bar");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.createFolder(uri.toString()).then(function (stat) {
                expect(stat).to.be.an("object");
                expect(stat).to.have.property("uri").that.equals(uri.toString());
                expect(stat).to.have.property("children").that.is.empty;
            });
        });
    });
    describe("09 #touch", function () {
        it("Should create a new file if it does not exist yet.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.touchFile(uri.toString()).then(function (stat) {
                expect(stat).is.an("object");
                expect(stat).has.property("uri").that.equals(uri.toString());
                expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            });
        });
        it("Should update the modification timestamp on an existing file.", function (done) {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            var fileSystem = createFileSystem();
            fileSystem.getFileStat(uri.toString()).then(function (initialStat) {
                expect(initialStat).is.an("object");
                expect(initialStat).has.property("uri").that.equals(uri.toString());
                expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
                return initialStat;
            }).then(function (initialStat) {
                // https://nodejs.org/en/docs/guides/working-with-different-filesystems/#timestamp-resolution
                sleep(1000).then(function () {
                    fileSystem.touchFile(uri.toString()).then(function (updatedStat) {
                        expect(updatedStat).is.an("object");
                        expect(updatedStat).has.property("uri").that.equals(uri.toString());
                        expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
                        expect(updatedStat.lastModification).to.be.greaterThan(initialStat.lastModification);
                        done();
                    });
                });
            });
        });
    });
    describe("#10 delete", function () {
        it("Should be rejected when the file to delete does not exist.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.delete(uri.toString(), { moveToTrash: false }).should.be.eventually.rejectedWith(Error);
        });
        it("Should delete the file.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo");
            expect(fs.readFileSync(node_1.FileUri.fsPath(uri), "utf8")).to.be.equal("foo");
            return fileSystem.delete(uri.toString(), { moveToTrash: false }).then(function () {
                expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            });
        });
        it("Should delete a directory without content.", function () {
            var uri = root.resolve("foo");
            fs.mkdirSync(node_1.FileUri.fsPath(uri));
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isDirectory()).to.be.true;
            return fileSystem.delete(uri.toString(), { moveToTrash: false }).then(function () {
                expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            });
        });
        it("Should delete a directory with all its content.", function () {
            var uri = root.resolve("foo");
            var subUri = uri.resolve("bar.txt");
            fs.mkdirSync(node_1.FileUri.fsPath(uri));
            fs.writeFileSync(node_1.FileUri.fsPath(subUri), "bar");
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isDirectory()).to.be.true;
            expect(fs.readFileSync(node_1.FileUri.fsPath(subUri), "utf8")).to.be.equal("bar");
            return fileSystem.delete(uri.toString(), { moveToTrash: false }).then(function () {
                expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
                expect(fs.existsSync(node_1.FileUri.fsPath(subUri))).to.be.false;
            });
        });
    });
    describe("#11 getEncoding", function () {
        it("Should be rejected with an error if no file exists under the given URI.", function () {
            var uri = root.resolve("foo.txt");
            expect(fs.existsSync(node_1.FileUri.fsPath(uri))).to.be.false;
            return fileSystem.getEncoding(uri.toString()).should.be.eventually.rejectedWith(Error);
        });
        it("Should be rejected with an error if the URI points to a directory instead of a file.", function () {
            var uri = root.resolve("foo");
            fs.mkdirSync(node_1.FileUri.fsPath(uri));
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isDirectory()).to.be.true;
            return fileSystem.getEncoding(uri.toString()).should.be.eventually.rejectedWith(Error);
        });
        it("Should return with the encoding of the file.", function () {
            var uri = root.resolve("foo.txt");
            fs.writeFileSync(node_1.FileUri.fsPath(uri), "foo");
            expect(fs.statSync(node_1.FileUri.fsPath(uri)).isFile()).to.be.true;
            return fileSystem.getEncoding(uri.toString()).should.be.eventually.be.equal("utf8");
        });
    });
    describe("#13 watchFileChanges", function () {
        it("Should receive file changes events from in the workspace by default.", function (done) {
            this.timeout(4000);
            var type = common_1.FileChangeType.ADDED;
            var expectedChanges = [
                { uri: root.resolve("foo"), type: type },
                { uri: root.withPath(root.path.join('foo', 'bar')), type: type },
                { uri: root.withPath(root.path.join('foo', 'bar', 'baz.txt')), type: type }
            ];
            var actualChanges = [];
            watcher.onFilesChanged(function (changes) {
                return actualChanges.push.apply(actualChanges, __spread(changes));
            });
            watcher.watchFileChanges(root).then(function () {
                fs.mkdirSync(node_1.FileUri.fsPath(root.resolve("foo")));
                expect(fs.statSync(node_1.FileUri.fsPath(root.resolve("foo"))).isDirectory()).to.be.true;
                fs.mkdirSync(node_1.FileUri.fsPath(root.resolve("foo").resolve("bar")));
                expect(fs.statSync(node_1.FileUri.fsPath(root.resolve("foo").resolve("bar"))).isDirectory()).to.be.true;
                fs.writeFileSync(node_1.FileUri.fsPath(root.resolve("foo").resolve("bar").resolve("baz.txt")), "baz");
                expect(fs.readFileSync(node_1.FileUri.fsPath(root.resolve("foo").resolve("bar").resolve("baz.txt")), "utf8")).to.be.equal("baz");
            });
            setTimeout(function () {
                assert.deepEqual(expectedChanges, actualChanges);
                done();
            }, 2000);
        });
    });
    describe("#14 roots", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            it("should not throw error", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = expect;
                            return [4 /*yield*/, createFileSystem().getRoots()];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).to.be.not.empty;
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe("#15 currentUserHome", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            it("should exist", function () { return __awaiter(_this, void 0, void 0, function () {
                var actual, expected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, createFileSystem().getCurrentUserHome()];
                        case 1:
                            actual = (_a.sent()).uri.toString();
                            expected = node_1.FileUri.create(os.homedir()).toString();
                            expect(expected).to.be.equal(actual);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    function createFileSystem() {
        return new node_filesystem_1.FileSystemNode();
    }
    function createFileSystemWatcher() {
        var logger = new Proxy({}, {
            get: function (target, name) { return function () {
                if (name.toString().startsWith('is')) {
                    return Promise.resolve(false);
                }
                if (name.toString().startsWith('if')) {
                    return new Promise(function (resolve) { });
                }
            }; }
        });
        var preferences = new preferences_api_1.PreferenceService(new PreferenceServerStub());
        var fileSystemPreferences = common_1.createFileSystemPreferences(preferences);
        var server = new chokidar_filesystem_watcher_1.ChokidarFileSystemWatcherServer(logger);
        return new common_1.FileSystemWatcher(server, fileSystemPreferences);
    }
    function sleep(time) {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
    }
});
process.on("unhandledRejection", function (reason) {
    console.error("Unhandled promise rejection: " + reason);
});
var PreferenceServerStub = /** @class */ (function () {
    function PreferenceServerStub() {
    }
    PreferenceServerStub.prototype.setClient = function (client) { };
    PreferenceServerStub.prototype.dispose = function () { };
    return PreferenceServerStub;
}());
//# sourceMappingURL=node-filesystem.spec.js.map