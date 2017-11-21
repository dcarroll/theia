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
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var common_frontend_contribution_1 = require("@theia/core/lib/browser/common-frontend-contribution");
var filesystem_1 = require("@theia/filesystem/lib/common/filesystem");
var filesystem_selection_1 = require("@theia/filesystem/lib/common/filesystem-selection");
var dialogs_1 = require("@theia/core/lib/browser/dialogs");
var browser_1 = require("@theia/core/lib/browser");
var workspace_service_1 = require("./workspace-service");
var WorkspaceCommands;
(function (WorkspaceCommands) {
    WorkspaceCommands.NEW_FILE = {
        id: 'file.newFile',
        label: 'New File'
    };
    WorkspaceCommands.NEW_FOLDER = {
        id: 'file.newFolder',
        label: 'New Folder'
    };
    WorkspaceCommands.FILE_OPEN = {
        id: 'file.open',
        label: 'Open'
    };
    WorkspaceCommands.FILE_OPEN_WITH = function (opener) { return ({
        id: "file.openWith." + opener.id,
        label: opener.label,
        iconClass: opener.iconClass
    }); };
    WorkspaceCommands.FILE_RENAME = {
        id: 'file.rename',
        label: 'Rename'
    };
    WorkspaceCommands.FILE_DELETE = {
        id: 'file.delete',
        label: 'Delete'
    };
})(WorkspaceCommands = exports.WorkspaceCommands || (exports.WorkspaceCommands = {}));
var FileMenuContribution = /** @class */ (function () {
    function FileMenuContribution() {
    }
    FileMenuContribution.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(common_frontend_contribution_1.CommonMenus.FILE_NEW, {
            commandId: WorkspaceCommands.NEW_FILE.id
        });
        registry.registerMenuAction(common_frontend_contribution_1.CommonMenus.FILE_NEW, {
            commandId: WorkspaceCommands.NEW_FOLDER.id
        });
    };
    FileMenuContribution = __decorate([
        inversify_1.injectable()
    ], FileMenuContribution);
    return FileMenuContribution;
}());
exports.FileMenuContribution = FileMenuContribution;
var WorkspaceCommandContribution = /** @class */ (function () {
    function WorkspaceCommandContribution(fileSystem, workspaceService, selectionService, openerService, app) {
        this.fileSystem = fileSystem;
        this.workspaceService = workspaceService;
        this.selectionService = selectionService;
        this.openerService = openerService;
        this.app = app;
    }
    WorkspaceCommandContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(WorkspaceCommands.FILE_OPEN, this.newFileHandler({
            execute: function (uri) { return browser_1.open(_this.openerService, uri); }
        }));
        this.openerService.getOpeners().then(function (openers) {
            var _loop_1 = function (opener_1) {
                var openWithCommand = WorkspaceCommands.FILE_OPEN_WITH(opener_1);
                registry.registerCommand(openWithCommand, _this.newFileHandler({
                    execute: function (uri) { return opener_1.open(uri); },
                    isEnabled: function (uri) { return opener_1.canHandle(uri) !== 0; },
                    isVisible: function (uri) { return opener_1.canHandle(uri) !== 0; }
                }));
            };
            try {
                for (var openers_1 = __values(openers), openers_1_1 = openers_1.next(); !openers_1_1.done; openers_1_1 = openers_1.next()) {
                    var opener_1 = openers_1_1.value;
                    _loop_1(opener_1);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (openers_1_1 && !openers_1_1.done && (_a = openers_1.return)) _a.call(openers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        });
        registry.registerCommand(WorkspaceCommands.NEW_FILE, this.newWorkspaceHandler({
            execute: function (uri) { return _this.getDirectory(uri).then(function (parent) {
                var parentUri = new uri_1.default(parent.uri);
                var vacantChildUri = _this.findVacantChildUri(parentUri, parent, 'Untitled', '.txt');
                var dialog = new dialogs_1.SingleTextInputDialog({
                    title: "New File",
                    initialValue: vacantChildUri.path.base,
                    validate: function (name) { return _this.validateFileName(name, parent); }
                });
                dialog.open().then(function (name) {
                    var fileUri = parentUri.resolve(name);
                    _this.fileSystem.createFile(fileUri.toString()).then(function () {
                        browser_1.open(_this.openerService, fileUri);
                    });
                });
            }); }
        }));
        registry.registerCommand(WorkspaceCommands.NEW_FOLDER, this.newWorkspaceHandler({
            execute: function (uri) { return _this.getDirectory(uri).then(function (parent) {
                var parentUri = new uri_1.default(parent.uri);
                var vacantChildUri = _this.findVacantChildUri(parentUri, parent, 'Untitled');
                var dialog = new dialogs_1.SingleTextInputDialog({
                    title: "New Folder",
                    initialValue: vacantChildUri.path.base,
                    validate: function (name) { return _this.validateFileName(name, parent); }
                });
                dialog.open().then(function (name) {
                    return _this.fileSystem.createFolder(parentUri.resolve(name).toString());
                });
            }); }
        }));
        registry.registerCommand(WorkspaceCommands.FILE_RENAME, this.newFileHandler({
            execute: function (uri) { return _this.getParent(uri).then(function (parent) {
                var dialog = new dialogs_1.SingleTextInputDialog({
                    title: 'Rename File',
                    initialValue: uri.path.base,
                    validate: function (name) { return _this.validateFileName(name, parent); }
                });
                dialog.open().then(function (name) {
                    return _this.fileSystem.move(uri.toString(), uri.parent.resolve(name).toString());
                });
            }); }
        }));
        registry.registerCommand(WorkspaceCommands.FILE_DELETE, this.newFileHandler({
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () {
                var dialog;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dialog = new dialogs_1.ConfirmDialog({
                                title: 'Delete File',
                                msg: "Do you really want to delete '" + uri.path.base + "'?"
                            });
                            return [4 /*yield*/, dialog.open()];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.fileSystem.delete(uri.toString())];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }
        }));
    };
    WorkspaceCommandContribution.prototype.newFileHandler = function (handler) {
        return new FileSystemCommandHandler(this.selectionService, handler);
    };
    WorkspaceCommandContribution.prototype.newWorkspaceHandler = function (handler) {
        return new WorkspaceRootAwareCommandHandler(this.workspaceService, this.selectionService, handler);
    };
    /**
     * returns an error message or an empty string if the file name is valid
     * @param name the simple file name to validate
     * @param parent the parent directory's file stat
     */
    WorkspaceCommandContribution.prototype.validateFileName = function (name, parent) {
        if (!name || !name.match(/^[\w\-. ]+$/)) {
            return "Invalid name, try other";
        }
        if (parent.children) {
            try {
                for (var _a = __values(parent.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    if (new uri_1.default(child.uri).path.base === name) {
                        return 'A file with this name already exists.';
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return '';
        var e_2, _c;
    };
    WorkspaceCommandContribution.prototype.getDirectory = function (candidate) {
        return __awaiter(this, void 0, void 0, function () {
            var stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileSystem.getFileStat(candidate.toString())];
                    case 1:
                        stat = _a.sent();
                        if (stat.isDirectory) {
                            return [2 /*return*/, stat];
                        }
                        return [2 /*return*/, this.getParent(candidate)];
                }
            });
        });
    };
    WorkspaceCommandContribution.prototype.getParent = function (candidate) {
        return this.fileSystem.getFileStat(candidate.parent.toString());
    };
    WorkspaceCommandContribution.prototype.findVacantChildUri = function (parentUri, parent, name, ext) {
        if (ext === void 0) { ext = ''; }
        var children = !parent.children ? [] : parent.children.map(function (child) { return new uri_1.default(child.uri); });
        var index = 1;
        var base = name + ext;
        while (children.some(function (child) { return child.path.base === base; })) {
            index = index + 1;
            base = name + '_' + index + ext;
        }
        return parentUri.resolve(base);
    };
    WorkspaceCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(filesystem_1.FileSystem)),
        __param(1, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __param(2, inversify_1.inject(common_1.SelectionService)),
        __param(3, inversify_1.inject(browser_1.OpenerService)),
        __param(4, inversify_1.inject(browser_1.FrontendApplication)),
        __metadata("design:paramtypes", [Object, workspace_service_1.WorkspaceService,
            common_1.SelectionService, Object, browser_1.FrontendApplication])
    ], WorkspaceCommandContribution);
    return WorkspaceCommandContribution;
}());
exports.WorkspaceCommandContribution = WorkspaceCommandContribution;
var FileSystemCommandHandler = /** @class */ (function () {
    function FileSystemCommandHandler(selectionService, handler) {
        this.selectionService = selectionService;
        this.handler = handler;
    }
    FileSystemCommandHandler.prototype.getUri = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args && args[0] instanceof uri_1.default) {
            return args[0];
        }
        return filesystem_selection_1.UriSelection.getUri(this.selectionService.selection);
    };
    FileSystemCommandHandler.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        return uri ? (_a = this.handler).execute.apply(_a, __spread([uri], args)) : undefined;
        var _a;
    };
    FileSystemCommandHandler.prototype.isVisible = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        if (uri) {
            if (this.handler.isVisible) {
                return (_a = this.handler).isVisible.apply(_a, __spread([uri], args));
            }
            return true;
        }
        return false;
        var _a;
    };
    FileSystemCommandHandler.prototype.isEnabled = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        if (uri) {
            if (this.handler.isEnabled) {
                return (_a = this.handler).isEnabled.apply(_a, __spread([uri], args));
            }
            return true;
        }
        return false;
        var _a;
    };
    return FileSystemCommandHandler;
}());
exports.FileSystemCommandHandler = FileSystemCommandHandler;
var WorkspaceRootAwareCommandHandler = /** @class */ (function (_super) {
    __extends(WorkspaceRootAwareCommandHandler, _super);
    function WorkspaceRootAwareCommandHandler(workspaceService, selectionService, handler) {
        var _this = _super.call(this, selectionService, handler) || this;
        _this.workspaceService = workspaceService;
        _this.selectionService = selectionService;
        _this.handler = handler;
        workspaceService.root.then(function (root) {
            if (root) {
                _this.rootUri = new uri_1.default(root.uri);
            }
        });
        return _this;
    }
    WorkspaceRootAwareCommandHandler.prototype.getUri = function () {
        return filesystem_selection_1.UriSelection.getUri(this.selectionService.selection) || this.rootUri;
    };
    return WorkspaceRootAwareCommandHandler;
}(FileSystemCommandHandler));
exports.WorkspaceRootAwareCommandHandler = WorkspaceRootAwareCommandHandler;
//# sourceMappingURL=workspace-commands.js.map