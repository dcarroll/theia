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
var inversify_spec_config_1 = require("./test/inversify.spec-config");
var terminal_watcher_1 = require("../common/terminal-watcher");
var terminal_protocol_1 = require("../common/terminal-protocol");
var common_1 = require("@theia/core/lib/common");
chai.use(chaiAsPromised);
/**
 * Globals
 */
var expect = chai.expect;
describe('TermninalServer', function () {
    this.timeout(5000);
    var terminalServer = inversify_spec_config_1.testContainer.get(terminal_protocol_1.ITerminalServer);
    var terminalWatcher = inversify_spec_config_1.testContainer.get(terminal_watcher_1.TerminalWatcher);
    it('test terminal create', function () {
        var args = ['--version'];
        var createResult = terminalServer.create({ command: process.execPath, 'args': args });
        return expect(createResult).to.be.eventually.greaterThan(-1);
    });
    it('test terminal create from non-existant path', function () {
        terminalServer.setClient(terminalWatcher.getTerminalClient());
        var createResult = terminalServer.create({ command: '/non-existant' });
        if (common_1.isWindows) {
            return expect(createResult).to.eventually.equal(-1);
        }
        else {
            var errorPromise = new Promise(function (resolve, reject) {
                createResult.then(function (termId) {
                    terminalWatcher.onTerminalExit(function (event) {
                        if (event.terminalId === termId) {
                            if (event.code === 1) {
                                resolve();
                            }
                            else {
                                reject();
                            }
                        }
                    });
                });
            });
            return Promise.all([
                expect(createResult).to.be.eventually.greaterThan(-1),
                expect(errorPromise).to.be.eventually.fulfilled
            ]);
        }
    });
});
//# sourceMappingURL=terminal-server.spec.js.map