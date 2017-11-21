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
var terminal_process_1 = require("./terminal-process");
var common_1 = require("@theia/core/lib/common");
chai.use(chaiAsPromised);
/**
 * Globals
 */
var expect = chai.expect;
describe('TerminalProcess', function () {
    this.timeout(5000);
    var terminalProcessFactory = inversify_spec_config_1.testContainer.get(terminal_process_1.TerminalProcessFactory);
    it('test error on non existent path', function () {
        /* Strangly linux returns exited with code 1 when using a non existant path but windows throws an error.
        This would need to be investigated more.  */
        if (common_1.isWindows) {
            return expect(function () { return terminalProcessFactory({ command: '/non-existent' }); }).to.throw();
        }
        else {
            var terminalProcess_1 = terminalProcessFactory({ command: '/non-existant' });
            var p = new Promise(function (resolve) {
                terminalProcess_1.onExit(function (event) {
                    if (event.code > 0) {
                        resolve();
                    }
                });
            });
            return expect(p).to.be.eventually.fulfilled;
        }
    });
    it('test exit', function () {
        var args = ['--version'];
        var terminalProcess = terminalProcessFactory({ command: process.execPath, 'args': args });
        var p = new Promise(function (resolve, reject) {
            terminalProcess.onError(function (error) {
                reject();
            });
            terminalProcess.onExit(function (event) {
                if (event.code === 0) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
        return expect(p).to.be.eventually.fulfilled;
    });
    it('test pipe stream', function () {
        var args = ['--version'];
        var terminalProcess = terminalProcessFactory({ command: process.execPath, 'args': args });
        var outStream = new stream.PassThrough();
        var p = new Promise(function (resolve, reject) {
            var version = '';
            outStream.on('data', function (data) {
                version += data.toString();
            });
            /* node-pty is not sending 'end' on the stream as it quits
            only 'exit' is sent on the terminal process.  */
            terminalProcess.onExit(function () {
                resolve(version.trim());
            });
        });
        terminalProcess.output.pipe(outStream);
        /* Avoid using equal since terminal characters can be inserted at the end.  */
        return expect(p).to.eventually.have.string(process.version);
    });
});
//# sourceMappingURL=terminal-process.spec.js.map