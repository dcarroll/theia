"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var opener_service_1 = require("./opener-service");
var assert = require("assert");
var id = 'my-opener';
var openHandler = {
    id: id,
    label: 'My Opener',
    canHandle: function () {
        return Promise.resolve(1);
    },
    open: function () {
        return Promise.resolve(undefined);
    }
};
var openerService = new opener_service_1.DefaultOpenerService({
    getContributions: function () { return [openHandler]; }
});
describe("opener-service", function () {
    it("getOpeners", function () {
        return openerService.getOpeners().then(function (openers) {
            assert.deepStrictEqual([openHandler], openers);
        });
    });
});
//# sourceMappingURL=opener-service.spec.js.map