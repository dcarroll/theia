"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var chai = require("chai");
require("mocha");
var chaiAsPromised = require("chai-as-promised");
var process = require("process");
var stream = require("stream");
var inversify_spec_config_1 = require("./inversify.spec-config");
var raw_process_1 = require("./raw-process");
chai.use(chaiAsPromised);
/**
 * Globals
 */
var expect = chai.expect;
describe('RawProcess', function () {
    this.timeout(5000);
    var rawProcessFactory = inversify_spec_config_1.testContainer.get(raw_process_1.RawProcessFactory);
    it('test error on non existent path', function () {
        var rawProcess = rawProcessFactory({ command: '/non-existant' });
        var p = new Promise(function (resolve) {
            rawProcess.onError(function (error) {
                resolve();
            });
        });
        return expect(p).to.be.eventually.fulfilled;
    });
    it('test exit', function () {
        var args = ['--version'];
        var rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
        var p = new Promise(function (resolve, reject) {
            rawProcess.onError(function (error) {
                reject();
            });
            rawProcess.onExit(function (event) {
                if (event.code > 0) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
        return expect(p).to.be.eventually.fulfilled;
    });
    it('test pipe stdout stream', function () {
        var args = ['--version'];
        var rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
        var outStream = new stream.PassThrough();
        var p = new Promise(function (resolve, reject) {
            var version = '';
            outStream.on('data', function (data) {
                version += data.toString();
            });
            outStream.on('end', function () {
                resolve(version.trim());
            });
        });
        rawProcess.output.pipe(outStream);
        return expect(p).to.be.eventually.equal(process.version);
    });
    it('test pipe stderr stream', function () {
        var args = ['invalidarg'];
        var rawProcess = rawProcessFactory({ command: process.execPath, 'args': args });
        var outStream = new stream.PassThrough();
        var p = new Promise(function (resolve, reject) {
            var version = '';
            outStream.on('data', function (data) {
                version += data.toString();
            });
            outStream.on('end', function () {
                resolve(version.trim());
            });
        });
        rawProcess.errorOutput.pipe(outStream);
        return expect(p).to.be.eventually.have.string('Error');
    });
});
//# sourceMappingURL=raw-process.spec.js.map