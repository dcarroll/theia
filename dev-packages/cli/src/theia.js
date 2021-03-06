"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console
var yargs = require("yargs");
var application_package_1 = require("@theia/application-package");
process.on('unhandledRejection', function (reason, promise) {
    throw reason;
});
process.on('uncaughtException', function (error) {
    if (error) {
        console.error('Uncaught Exception: ', error.toString());
        if (error.stack) {
            console.error(error.stack);
        }
    }
});
function commandArgs(arg) {
    var restIndex = process.argv.indexOf(arg);
    return restIndex !== -1 ? process.argv.slice(restIndex + 1) : [];
}
function rebuildCommand(command, target) {
    return {
        command: command,
        describe: 'rebuild native node modules for the ' + target,
        handler: function () {
            var modules = yargs.array('modules').argv.modules;
            try {
                application_package_1.rebuild(target, modules);
            }
            catch (err) {
                console.error(err);
                process.exit(1);
            }
        }
    };
}
var projectPath = process.cwd();
var manager = new application_package_1.ApplicationPackageManager({ projectPath: projectPath });
var target = manager.pck.target;
yargs
    .command({
    command: 'start',
    describe: 'start the ' + manager.pck.target + ' backend',
    handler: function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, manager.start(commandArgs('start'))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
})
    .command({
    command: 'clean',
    describe: 'clean for the ' + target + ' target',
    handler: function () {
        try {
            manager.clean();
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
})
    .command({
    command: 'copy',
    handler: function () {
        try {
            manager.copy();
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
})
    .command({
    command: 'generate',
    handler: function () {
        try {
            manager.generate();
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
})
    .command({
    command: 'build',
    describe: 'webpack the ' + target + ' frontend',
    handler: function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, manager.build(commandArgs('build'))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error(err_2);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
})
    .command(rebuildCommand('rebuild', target))
    .command(rebuildCommand('rebuild:browser', 'browser'))
    .command(rebuildCommand('rebuild:electron', 'electron'));
// see https://github.com/yargs/yargs/issues/287#issuecomment-314463783
var commands = yargs.getCommandInstance().getCommands();
var argv = yargs.demandCommand(1).argv;
var command = argv._[0];
if (!command || commands.indexOf(command) === -1) {
    console.log("non-existing or no command specified");
    yargs.showHelp();
    process.exit(1);
}
else {
    yargs.help(false);
}
//# sourceMappingURL=theia.js.map