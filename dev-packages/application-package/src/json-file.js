"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var writeJsonFile = require("write-json-file");
exports.writeJsonFile = writeJsonFile;
function readJsonFile(path) {
    return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));
}
exports.readJsonFile = readJsonFile;
//# sourceMappingURL=json-file.js.map