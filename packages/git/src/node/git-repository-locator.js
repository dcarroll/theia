"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var abs = require('abs');
var finder = require('findit2');
/**
 * Resolves to an array of repositories, recursively discovered from the given root `path`.
 *
 * @param path the FS path of the root to start the discovery.
 */
function locateRepositories(path) {
    return new Promise(function (resolve, reject) {
        var repositoryPaths = new Set();
        var emitter = finder(abs(path));
        emitter.on('directory', function (dir, stat, stop) {
            var base = Path.basename(dir);
            if (base === '.git') {
                var dirName = Path.dirname(dir);
                repositoryPaths.add(dirName);
                stop();
            }
        });
        emitter.on('end', function () { return resolve(__spread(repositoryPaths).map(function (p) { return ({ localUri: file_uri_1.FileUri.create(p).toString() }); })); });
        emitter.on('error', function (error) { return reject(error); });
    });
}
exports.locateRepositories = locateRepositories;
//# sourceMappingURL=git-repository-locator.js.map