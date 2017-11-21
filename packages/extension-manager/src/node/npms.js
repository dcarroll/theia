"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
function search(query, from, size) {
    return new Promise(function (resolve, reject) {
        var url = 'https://api.npms.io/v2/search?q=' + encodeURIComponent(query);
        if (from) {
            url += '&from=' + from;
        }
        if (size) {
            url += '&size=' + size;
        }
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
                // tslint:disable-next-line:no-magic-numbers
            }
            else if (response.statusCode === 200) {
                var result = JSON.parse(body);
                resolve(result.results.map(function (v) { return v.package; }));
            }
            else {
                reject(new Error(response.statusCode + ": " + response.statusMessage + " for " + url));
            }
        });
    });
}
exports.search = search;
//# sourceMappingURL=npms.js.map