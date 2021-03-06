"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var problem_marker_1 = require("../../common/problem-marker");
var problem_manager_1 = require("./problem-manager");
var status_bar_1 = require("@theia/core/lib/browser/status-bar/status-bar");
var ProblemCommands;
(function (ProblemCommands) {
    ProblemCommands.OPEN = {
        id: 'problems:open',
        label: 'Open Problems View'
    };
})(ProblemCommands = exports.ProblemCommands || (exports.ProblemCommands = {}));
var ProblemContribution = /** @class */ (function () {
    function ProblemContribution(widgetFactory, app, problemManager, statusBar) {
        this.widgetFactory = widgetFactory;
        this.app = app;
        this.problemManager = problemManager;
        this.statusBar = statusBar;
    }
    ProblemContribution.prototype.onStart = function (app) {
        var _this = this;
        this.problemManager.onDidChangeMarkers(function () {
            _this.setStatusBarElement(_this.problemManager.getProblemStat());
        });
    };
    ProblemContribution.prototype.initializeLayout = function (app) {
        this.setStatusBarElement({
            errors: 0,
            warnings: 0
        });
    };
    ProblemContribution.prototype.setStatusBarElement = function (problemStat) {
        this.statusBar.setElement('problem-marker-status', {
            text: "$(times-circle) " + problemStat.errors + " $(exclamation-triangle) " + problemStat.warnings,
            alignment: status_bar_1.StatusBarAlignment.LEFT,
            priority: 10,
            command: ProblemCommands.OPEN.id
        });
    };
    ProblemContribution.prototype.registerKeybindings = function (keybindings) {
        keybindings.registerKeybinding({
            commandId: ProblemCommands.OPEN.id,
            keyCode: common_1.KeyCode.createKeyCode({
                first: common_1.Key.KEY_M, modifiers: [common_1.Modifier.M2, common_1.Modifier.M1]
            })
        });
    };
    ProblemContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(ProblemCommands.OPEN, {
            execute: function () { return _this.openProblemsView(); }
        });
    };
    ProblemContribution.prototype.openProblemsView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markerWidget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widgetFactory.getOrCreateWidget(problem_marker_1.PROBLEM_KIND)];
                    case 1:
                        markerWidget = _a.sent();
                        if (!markerWidget.isAttached) {
                            this.app.shell.addToMainArea(markerWidget);
                        }
                        this.app.shell.activateMain(markerWidget.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProblemContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(browser_1.CommonMenus.VIEW, {
            commandId: ProblemCommands.OPEN.id
        });
    };
    ProblemContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(widget_manager_1.WidgetManager)),
        __param(1, inversify_1.inject(browser_1.FrontendApplication)),
        __param(2, inversify_1.inject(problem_manager_1.ProblemManager)),
        __param(3, inversify_1.inject(status_bar_1.StatusBar)),
        __metadata("design:paramtypes", [widget_manager_1.WidgetManager,
            browser_1.FrontendApplication,
            problem_manager_1.ProblemManager, Object])
    ], ProblemContribution);
    return ProblemContribution;
}());
exports.ProblemContribution = ProblemContribution;
//# sourceMappingURL=problem-contribution.js.map