"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var types_1 = require("./types");
describe('types', function () {
    describe('Prioritizeable', function () {
        it('prioritizeAll #01', function () {
            var input = [-4, 4, -3, 3, -2, 2, -1, 1, 0, -0];
            return types_1.Prioritizeable.prioritizeAll(input, function (value) { return -value; })
                .then(function (values) {
                return assert.deepStrictEqual([
                    {
                        priority: 4,
                        value: -4
                    },
                    {
                        priority: 3,
                        value: -3
                    }, {
                        priority: 2,
                        value: -2
                    }, {
                        priority: 1,
                        value: -1
                    }
                ], values);
            });
        });
        it('prioritizeAll #02', function () {
            var input = [-4, 4, -3, 3, -2, 2, -1, 1, 0, -0].map(function (v) { return Promise.resolve(v); });
            return types_1.Prioritizeable.prioritizeAll(input, function (value) { return -value; })
                .then(function (values) {
                return assert.deepStrictEqual([
                    {
                        priority: 4,
                        value: -4
                    },
                    {
                        priority: 3,
                        value: -3
                    }, {
                        priority: 2,
                        value: -2
                    }, {
                        priority: 1,
                        value: -1
                    }
                ], values);
            });
        });
    });
});
//# sourceMappingURL=types.spec.js.map