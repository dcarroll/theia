"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROBLEM_KIND = 'problem';
var ProblemMarker;
(function (ProblemMarker) {
    function is(node) {
        return 'kind' in node && node.kind === exports.PROBLEM_KIND;
    }
    ProblemMarker.is = is;
})(ProblemMarker = exports.ProblemMarker || (exports.ProblemMarker = {}));
//# sourceMappingURL=problem-marker.js.map