"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var selection_service_1 = require("./selection-service");
require("mocha");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
before(function () {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
    chai.should();
    chai.use(chaiAsPromised);
});
beforeEach(function () {
});
describe('selection-service', function () {
    describe('01 #addListener and dispose', function () {
        it('Should be rejected when path argument is undefined.', function () {
            var service = createSelectionService();
            var events = [];
            var disposable = service.onSelectionChanged(function (e) { return events.push(e); });
            service.selection = "foo";
            disposable.dispose();
            service.selection = "bar";
            expect(events.length).equals(1);
            expect(events[0]).equals("foo");
        });
    });
});
function createSelectionService() {
    return new selection_service_1.SelectionService();
}
//# sourceMappingURL=selection-service.spec.js.map