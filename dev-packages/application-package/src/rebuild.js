"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var cp = require("child_process");
function rebuild(target, modules) {
    var nodeModulesPath = path.join(process.cwd(), 'node_modules');
    var browserModulesPath = path.join(process.cwd(), '.browser_modules');
    var modulesToProcess = modules || ['node-pty'];
    if (target === 'electron' && !fs.existsSync(browserModulesPath)) {
        var dependencies = {};
        try {
            for (var modulesToProcess_1 = __values(modulesToProcess), modulesToProcess_1_1 = modulesToProcess_1.next(); !modulesToProcess_1_1.done; modulesToProcess_1_1 = modulesToProcess_1.next()) {
                var module_1 = modulesToProcess_1_1.value;
                console.log("Processing " + module_1);
                var src = path.join(nodeModulesPath, module_1);
                if (fs.existsSync(src)) {
                    var dest = path.join(browserModulesPath, module_1);
                    var packJson = fs.readJsonSync(path.join(src, 'package.json'));
                    dependencies[module_1] = packJson.version;
                    fs.copySync(src, dest);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (modulesToProcess_1_1 && !modulesToProcess_1_1.done && (_a = modulesToProcess_1.return)) _a.call(modulesToProcess_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var packFile_1 = path.join(process.cwd(), "package.json");
        var packageText_1 = fs.readFileSync(packFile_1);
        var pack = fs.readJsonSync(packFile_1);
        try {
            pack.dependencies = Object.assign({}, pack.dependencies, dependencies);
            fs.writeFileSync(packFile_1, JSON.stringify(pack, undefined, "  "));
            var electronRebuildPath = path.join(process.cwd(), 'node_modules', '.bin', 'electron-rebuild');
            if (process.platform === 'win32') {
                cp.spawnSync('cmd', ['/c', electronRebuildPath]);
            }
            else {
                require(electronRebuildPath);
            }
        }
        finally {
            setTimeout(function () {
                fs.writeFile(packFile_1, packageText_1);
            }, 100);
        }
    }
    else if (target === 'browser' && fs.existsSync(browserModulesPath)) {
        try {
            for (var _b = __values(fs.readdirSync(browserModulesPath)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var moduleName = _c.value;
                console.log("Reverting " + moduleName);
                var src = path.join(browserModulesPath, moduleName);
                var dest = path.join(nodeModulesPath, moduleName);
                fs.removeSync(dest);
                fs.copySync(src, dest);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        fs.removeSync(browserModulesPath);
    }
    else {
        console.log('native node modules are already rebuilt for ' + target);
    }
    var e_1, _a, e_2, _d;
}
exports.rebuild = rebuild;
//# sourceMappingURL=rebuild.js.map