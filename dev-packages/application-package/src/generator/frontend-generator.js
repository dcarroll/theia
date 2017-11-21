"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_generator_1 = require("./abstract-generator");
var FrontendGenerator = /** @class */ (function (_super) {
    __extends(FrontendGenerator, _super);
    function FrontendGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrontendGenerator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var frontendModules;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        frontendModules = this.pck.targetFrontendModules;
                        return [4 /*yield*/, this.write(this.pck.frontend('index.html'), this.compileIndexHtml(frontendModules))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.write(this.pck.frontend('index.js'), this.compileIndexJs(frontendModules))];
                    case 2:
                        _a.sent();
                        if (!this.pck.isElectron()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.write(this.pck.frontend('electron-main.js'), this.compileElectronMain())];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FrontendGenerator.prototype.compileIndexHtml = function (frontendModules) {
        return "<!DOCTYPE html>\n<html>\n\n<head>" + this.compileIndexHead(frontendModules) + this.ifBrowser("\n  <script type=\"text/javascript\" src=\"./require.js\" charset=\"utf-8\"></script>") + "\n  <script type=\"text/javascript\" src=\"./bundle.js\" charset=\"utf-8\"></script>\n</head>\n\n<body>\n</body>\n\n</html>";
    };
    FrontendGenerator.prototype.compileIndexHead = function (frontendModules) {
        return "\n  <meta charset=\"UTF-8\">\n  <script type=\"text/javascript\" src=\"https://www.promisejs.org/polyfills/promise-6.1.0.js\" charset=\"utf-8\"></script>";
    };
    FrontendGenerator.prototype.compileIndexJs = function (frontendModules) {
        return "// @ts-check\nrequire('reflect-metadata');\nconst { Container } = require('inversify');\nconst { FrontendApplication } = require('@theia/core/lib/browser');\nconst { frontendApplicationModule } = require('@theia/core/lib/browser/frontend-application-module');\nconst { messagingFrontendModule } = require('@theia/core/lib/browser/messaging/messaging-frontend-module');\nconst { loggerFrontendModule } = require('@theia/core/lib/browser/logger-frontend-module');\n\nconst container = new Container();\ncontainer.load(frontendApplicationModule);\ncontainer.load(messagingFrontendModule);\ncontainer.load(loggerFrontendModule);\n\nfunction load(raw) {\n    return Promise.resolve(raw.default).then(module =>\n        container.load(module)\n    )\n}\n\nfunction start() {\n    const application = container.get(FrontendApplication);\n    application.start();\n}\n\nmodule.exports = Promise.resolve()" + this.compileFrontendModuleImports(frontendModules) + "\n    .then(start).catch(reason => {\n        console.error('Failed to start the frontend application.');\n        if (reason) {\n            console.error(reason);\n        }\n    });";
    };
    FrontendGenerator.prototype.compileElectronMain = function () {
        return "// @ts-check\nconst cluster = require('cluster');\nif (cluster.isMaster) {\n    // Workaround for https://github.com/electron/electron/issues/9225. Chrome has an issue where\n    // in certain locales (e.g. PL), image metrics are wrongly computed. We explicitly set the\n    // LC_NUMERIC to prevent this from happening (selects the numeric formatting category of the\n    // C locale, http://en.cppreference.com/w/cpp/locale/LC_categories).\n    if (process.env.LC_ALL) {\n        process.env.LC_ALL = 'C';\n    }\n    process.env.LC_NUMERIC = 'C';\n    const electron = require('electron');\n    electron.app.on('window-all-closed', function () {\n        if (process.platform !== 'darwin') {\n            electron.app.quit();\n        }\n    });\n    electron.app.on('ready', function () {\n        const path = require('path');\n        const { fork } = require('child_process');\n        // Check whether we are in bundled application or development mode.\n        const devMode = process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath);\n        const mainWindow = new electron.BrowserWindow({ width: 1024, height: 728, show: false });\n        mainWindow.on('ready-to-show', () => mainWindow.show());\n        const mainPath = path.join(__dirname, '..', 'backend', 'main');\n        const loadMainWindow = function (port) {\n            mainWindow.loadURL(`file://${path.join(__dirname, '../../lib/index.html')}?port=${port}`);\n        };\n        // We need to distinguish between bundled application and development mode when starting the clusters.\n        // https://github.com/electron/electron/issues/6337#issuecomment-230183287\n        if (devMode) {\n            require(mainPath).then(address => {\n                loadMainWindow(address.port);\n            }).catch((error) => {\n                console.error(error);\n                electron.app.exit(1);\n            });\n        } else {\n            const cp = fork(mainPath);\n            cp.on('message', function (message) {\n                loadMainWindow(message);\n            });\n            cp.on('error', function (error) {\n                console.error(error);\n                electron.app.exit(1);\n            });\n            electron.app.on('quit', function() {\n                // If we forked the process for the clusters, we need to manually terminate it.\n                // See: https://github.com/theia-ide/theia/issues/835\n                process.kill(cp.pid);\n            });\n        }\n        mainWindow.on('closed', function () {\n            electron.app.exit(0);\n        });\n    });\n} else {\n    require('../backend/main');\n}\n";
    };
    return FrontendGenerator;
}(abstract_generator_1.AbstractGenerator));
exports.FrontendGenerator = FrontendGenerator;
//# sourceMappingURL=frontend-generator.js.map