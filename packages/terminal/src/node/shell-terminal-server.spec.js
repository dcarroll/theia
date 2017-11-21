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
var shell_terminal_protocol_1 = require("../common/shell-terminal-protocol");
chai.use(chaiAsPromised);
/**
 * Globals
 */
var expect = chai.expect;
describe('ShellServer', function () {
    this.timeout(5000);
    var shellTerminalServer = inversify_spec_config_1.testContainer.get(shell_terminal_protocol_1.IShellTerminalServer);
    it('test shell terminal create', function () {
        var createResult = shellTerminalServer.create({});
        return expect(createResult).to.be.eventually.greaterThan(-1);
    });
});
//# sourceMappingURL=shell-terminal-server.spec.js.map