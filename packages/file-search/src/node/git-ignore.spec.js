"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai = require("chai");
var git_ignore_1 = require("./git-ignore");
var expect = chai.expect;
describe('git-ignore', function () {
    it('shall respect nested ignore files', function () {
        var parent = new git_ignore_1.GitIgnoreImpl("\n            foo.txt\n        ");
        var nested = new git_ignore_1.GitIgnoreImpl("\n            !foo.txt\n        ", parent);
        expect(parent.isFiltered('foo.txt')).eq(true);
        expect(nested.isFiltered('foo.txt')).eq(false);
    });
});
//# sourceMappingURL=git-ignore.spec.js.map