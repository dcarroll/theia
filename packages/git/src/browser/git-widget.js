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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var git_1 = require("../common/git");
var git_context_menu_1 = require("./git-context-menu");
var model_1 = require("../common/model");
var git_watcher_1 = require("../common/git-watcher");
var git_resource_1 = require("./git-resource");
var git_repository_provider_1 = require("./git-repository-provider");
var core_1 = require("@theia/core");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_1 = require("@theia/core/lib/browser");
var lib_1 = require("@phosphor/virtualdom/lib");
var diff_uris_1 = require("@theia/editor/lib/browser/diff-uris");
var file_icons_1 = require("@theia/filesystem/lib/browser/icons/file-icons");
var workspace_commands_1 = require("@theia/workspace/lib/browser/workspace-commands");
var workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
var GitWidget = /** @class */ (function (_super) {
    __extends(GitWidget, _super);
    function GitWidget(git, repositoryProvider, gitWatcher, openerService, contextMenuRenderer, resourceProvider, messageService, iconProvider, commandService, workspaceService) {
        var _this = _super.call(this) || this;
        _this.git = git;
        _this.repositoryProvider = repositoryProvider;
        _this.gitWatcher = gitWatcher;
        _this.openerService = openerService;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.resourceProvider = resourceProvider;
        _this.messageService = messageService;
        _this.iconProvider = iconProvider;
        _this.commandService = commandService;
        _this.workspaceService = workspaceService;
        _this.stagedChanges = [];
        _this.unstagedChanges = [];
        _this.mergeChanges = [];
        _this.message = '';
        _this.messageInputHighlighted = false;
        _this.additionalMessage = '';
        _this.toDispose = new core_1.DisposableCollection();
        _this.id = 'theia-gitContainer';
        _this.title.label = 'Git';
        _this.addClass('theia-git');
        _this.update();
        _this.repositoryProvider.onDidChangeRepository(function (repo) {
            _this.initialize(repo);
        });
        return _this;
    }
    GitWidget.prototype.initialize = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!repository) return [3 /*break*/, 2];
                        this.toDispose.dispose();
                        _b = (_a = this.toDispose).push;
                        return [4 /*yield*/, this.gitWatcher.watchGitChanges(repository)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        this.toDispose.push(this.gitWatcher.onGitEvent(function (gitEvent) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (git_watcher_1.GitStatusChangeEvent.is(gitEvent)) {
                                    this.status = gitEvent.status;
                                    this.updateView(gitEvent.status);
                                }
                                return [2 /*return*/];
                            });
                        }); }));
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GitWidget.prototype.updateView = function (status) {
        var _this = this;
        this.stagedChanges = [];
        this.unstagedChanges = [];
        this.mergeChanges = [];
        if (status) {
            status.changes.forEach(function (change) {
                if (model_1.GitFileStatus[model_1.GitFileStatus.Conflicted.valueOf()] !== model_1.GitFileStatus[change.status]) {
                    if (change.staged) {
                        _this.stagedChanges.push(change);
                    }
                    else {
                        _this.unstagedChanges.push(change);
                    }
                }
                else {
                    if (!change.staged) {
                        _this.mergeChanges.push(change);
                    }
                }
            });
        }
        this.update();
    };
    GitWidget.prototype.render = function () {
        var repository = this.repositoryProvider.selectedRepository;
        var commandBar = this.renderCommandBar(repository);
        var messageInput = this.renderMessageInput();
        var messageTextarea = this.renderMessageTextarea();
        var headerContainer = lib_1.h.div({ className: 'headerContainer' }, commandBar, messageInput, messageTextarea);
        var mergeChanges = this.renderMergeChanges(repository) || '';
        var stagedChanges = this.renderStagedChanges(repository) || '';
        var unstagedChanges = this.renderUnstagedChanges(repository) || '';
        var changesContainer = lib_1.h.div({ className: "changesOuterContainer" }, mergeChanges, stagedChanges, unstagedChanges);
        return [headerContainer, changesContainer];
    };
    /**
     * After rendering the DOM elements, it makes sure that the selection (`selectionIndex`) is correct in the repositories
     * drop-down even if one adds/removes local Git clones to/from the workspace.
     *
     * By default the `selectionIndex` is `0`, so we need to set it based on the user's repository selection.
     */
    GitWidget.prototype.onUpdateRequest = function (message) {
        _super.prototype.onUpdateRequest.call(this, message);
        var repositories = this.repositoryProvider.allRepositories;
        // Set the selected repository.
        var combo = document.getElementById('repositoryList');
        if (combo && combo.selectedIndex !== undefined && this.repositoryProvider.selectedRepository) {
            var selectedUri_1 = this.repositoryProvider.selectedRepository.localUri.toString();
            var index = repositories.map(function (repository) { return repository.localUri.toString(); }).findIndex(function (uri) { return uri === selectedUri_1; });
            if (index !== -1) {
                combo.selectedIndex = index;
            }
        }
    };
    GitWidget.prototype.renderRepositoryList = function () {
        var _this = this;
        var repositoryOptionElements = [];
        this.repositoryProvider.allRepositories.forEach(function (repository) {
            var uri = new uri_1.default(repository.localUri);
            repositoryOptionElements.push(lib_1.h.option({ value: uri.toString() }, uri.displayName));
        });
        return lib_1.h.select({
            id: 'repositoryList',
            onchange: function (event) { return __awaiter(_this, void 0, void 0, function () {
                var repository, status, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            repository = { localUri: event.target.value };
                            this.repositoryProvider.selectedRepository = repository;
                            if (!repository) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.git.status(repository)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = undefined;
                            _b.label = 3;
                        case 3:
                            status = _a;
                            this.updateView(status);
                            return [2 /*return*/];
                    }
                });
            }); }
        }, browser_1.VirtualRenderer.flatten(repositoryOptionElements));
    };
    GitWidget.prototype.renderCommandBar = function (repository) {
        var _this = this;
        var commit = repository ? lib_1.h.a({
            className: 'button',
            title: 'Commit',
            onclick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var messageInput, extendedMessageInput_1;
                return __generator(this, function (_a) {
                    messageInput = document.getElementById('git-messageInput');
                    if (this.message !== '') {
                        extendedMessageInput_1 = document.getElementById('git-extendedMessageInput');
                        // We can make sure, repository exists, otherwise we would not have this button.
                        this.git.commit(repository, this.message + "\n\n" + this.additionalMessage)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var status;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        messageInput.value = '';
                                        extendedMessageInput_1.value = '';
                                        return [4 /*yield*/, this.git.status(repository)];
                                    case 1:
                                        status = _a.sent();
                                        this.updateView(status);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else {
                        if (messageInput) {
                            this.messageInputHighlighted = true;
                            this.update();
                            messageInput.focus();
                        }
                        this.messageService.error('Please provide a commit message!');
                    }
                    return [2 /*return*/];
                });
            }); }
        }, lib_1.h.i({ className: 'fa fa-check' })) : '';
        var refresh = lib_1.h.a({
            className: 'button',
            title: 'Refresh',
            onclick: function (e) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repositoryProvider.refresh()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        }, lib_1.h.i({ className: 'fa fa-refresh' }));
        var commands = repository ? lib_1.h.a({
            className: 'button',
            title: 'More...',
            onclick: function (event) {
                var el = event.target.parentElement;
                if (el) {
                    _this.contextMenuRenderer.render(git_context_menu_1.GIT_CONTEXT_MENU, {
                        x: el.getBoundingClientRect().left,
                        y: el.getBoundingClientRect().top + el.offsetHeight
                    });
                }
            }
        }, lib_1.h.i({ className: 'fa fa-ellipsis-h' })) : '';
        var btnContainer = lib_1.h.div({ className: 'flexcontainer buttons' }, commit, refresh, commands);
        var repositoryListContainer = lib_1.h.div({ id: 'repositoryListContainer' }, this.renderRepositoryList());
        return lib_1.h.div({ id: 'commandBar', className: 'flexcontainer evenlySpreaded' }, repositoryListContainer, btnContainer);
    };
    GitWidget.prototype.renderMessageInput = function () {
        var _this = this;
        var input = lib_1.h.input({
            id: 'git-messageInput',
            oninput: function (event) {
                var inputElement = event.target;
                if (inputElement.value !== '') {
                    _this.messageInputHighlighted = false;
                }
                _this.message = event.target.value;
            },
            className: this.messageInputHighlighted ? 'warn' : '',
            placeholder: 'Commit message',
            value: this.message
        });
        return lib_1.h.div({ id: 'messageInputContainer', className: 'flexcontainer row' }, input);
    };
    GitWidget.prototype.renderMessageTextarea = function () {
        var _this = this;
        var textarea = lib_1.h.textarea({
            id: 'git-extendedMessageInput',
            placeholder: 'Extended commit text',
            oninput: function (event) {
                _this.additionalMessage = event.target.value;
            },
            value: this.additionalMessage
        });
        return lib_1.h.div({ id: 'messageTextareaContainer', className: 'flexcontainer row' }, textarea);
    };
    GitWidget.prototype.renderGitItemButtons = function (repository, change) {
        var _this = this;
        var buttons = [];
        if (change.staged) {
            buttons.push(lib_1.h.a({
                className: 'button',
                title: 'Unstage Changes',
                onclick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.git.unstage(repository, change.uri);
                        return [2 /*return*/];
                    });
                }); }
            }, lib_1.h.i({ className: 'fa fa-minus' })));
        }
        else {
            buttons.push(lib_1.h.a({
                className: 'button',
                title: 'Discard Changes',
                onclick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var options;
                    return __generator(this, function (_a) {
                        options = { paths: change.uri };
                        if (change.status === model_1.GitFileStatus.New) {
                            this.commandService.executeCommand(workspace_commands_1.WorkspaceCommands.FILE_DELETE.id, new uri_1.default(change.uri));
                        }
                        else {
                            this.git.checkout(repository, options);
                        }
                        return [2 /*return*/];
                    });
                }); }
            }, lib_1.h.i({ className: 'fa fa-undo' })));
            buttons.push(lib_1.h.a({
                className: 'button',
                title: 'Stage Changes',
                onclick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.git.add(repository, change.uri);
                        return [2 /*return*/];
                    });
                }); }
            }, lib_1.h.i({ className: 'fa fa-plus' })));
        }
        return lib_1.h.div({ className: 'buttons' }, browser_1.VirtualRenderer.flatten(buttons));
    };
    GitWidget.prototype.getStatusChar = function (status, staged) {
        switch (status) {
            case model_1.GitFileStatus.New:
            case model_1.GitFileStatus.Renamed:
            case model_1.GitFileStatus.Copied: return staged ? 'A' : 'U';
            case model_1.GitFileStatus.Modified: return 'M';
            case model_1.GitFileStatus.Deleted: return 'D';
            case model_1.GitFileStatus.Conflicted: return 'C';
        }
        return '';
    };
    GitWidget.prototype.getRepositoryRelativePath = function (repository, absPath) {
        var repositoryPath = new uri_1.default(repository.localUri).path.toString();
        return absPath.replace(repositoryPath, '').replace(/^\//, '');
    };
    GitWidget.prototype.renderGitItem = function (repository, change) {
        var _this = this;
        if (!repository) {
            return '';
        }
        var changeUri = new uri_1.default(change.uri);
        var fileIcon = this.iconProvider.getFileIconForURI(changeUri);
        var iconSpan = lib_1.h.span({ className: fileIcon });
        var nameSpan = lib_1.h.span({ className: 'name' }, changeUri.displayName + ' ');
        var pathSpan = lib_1.h.span({ className: 'path' }, this.getRepositoryRelativePath(repository, changeUri.path.dir.toString()));
        var nameAndPathDiv = lib_1.h.div({
            className: 'noWrapInfo',
            onclick: function () {
                var uri;
                if (change.status !== model_1.GitFileStatus.New) {
                    if (change.staged) {
                        uri = diff_uris_1.DiffUris.encode(changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery('HEAD'), changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME), changeUri.displayName + ' (Index)');
                    }
                    else if (_this.stagedChanges.find(function (c) { return c.uri === change.uri; })) {
                        uri = diff_uris_1.DiffUris.encode(changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME), changeUri, changeUri.displayName + ' (Working tree)');
                    }
                    else {
                        uri = diff_uris_1.DiffUris.encode(changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME).withQuery('HEAD'), changeUri, changeUri.displayName + ' (Working tree)');
                    }
                }
                else if (change.staged) {
                    uri = changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME);
                }
                else if (_this.stagedChanges.find(function (c) { return c.uri === change.uri; })) {
                    uri = diff_uris_1.DiffUris.encode(changeUri.withScheme(git_resource_1.GIT_RESOURCE_SCHEME), changeUri, changeUri.displayName + ' (Working tree)');
                }
                else {
                    uri = changeUri;
                }
                browser_1.open(_this.openerService, uri);
            }
        }, iconSpan, nameSpan, pathSpan);
        var buttonsDiv = this.renderGitItemButtons(repository, change);
        var staged = change.staged ? 'staged ' : '';
        var statusDiv = lib_1.h.div({ className: 'status ' + staged + model_1.GitFileStatus[change.status].toLowerCase() }, this.getStatusChar(change.status, change.staged));
        var itemBtnsAndStatusDiv = lib_1.h.div({ className: 'itemButtonsContainer' }, buttonsDiv, statusDiv);
        return lib_1.h.div({ className: 'gitItem noselect' }, nameAndPathDiv, itemBtnsAndStatusDiv);
    };
    GitWidget.prototype.renderChangesHeader = function (title) {
        var stagedChangesHeaderDiv = lib_1.h.div({ className: 'header' }, title);
        return stagedChangesHeaderDiv;
    };
    GitWidget.prototype.renderMergeChanges = function (repository) {
        var _this = this;
        var mergeChangeDivs = [];
        if (this.mergeChanges.length > 0) {
            this.mergeChanges.forEach(function (change) {
                mergeChangeDivs.push(_this.renderGitItem(repository, change));
            });
            return lib_1.h.div({
                id: 'mergeChanges',
                className: 'changesContainer'
            }, lib_1.h.div({ className: 'theia-header' }, 'Merge Changes'), browser_1.VirtualRenderer.flatten(mergeChangeDivs));
        }
        else {
            return undefined;
        }
    };
    GitWidget.prototype.renderStagedChanges = function (repository) {
        var _this = this;
        var stagedChangeDivs = [];
        if (this.stagedChanges.length > 0) {
            this.stagedChanges.forEach(function (change) {
                stagedChangeDivs.push(_this.renderGitItem(repository, change));
            });
            return lib_1.h.div({
                id: 'stagedChanges',
                className: 'changesContainer'
            }, lib_1.h.div({ className: 'theia-header' }, 'Staged Changes'), browser_1.VirtualRenderer.flatten(stagedChangeDivs));
        }
        else {
            return undefined;
        }
    };
    GitWidget.prototype.renderUnstagedChanges = function (repository) {
        var _this = this;
        var unstagedChangeDivs = [];
        if (this.unstagedChanges.length > 0) {
            this.unstagedChanges.forEach(function (change) {
                unstagedChangeDivs.push(_this.renderGitItem(repository, change));
            });
            return lib_1.h.div({
                id: 'unstagedChanges',
                className: 'changesContainer'
            }, lib_1.h.div({ className: 'theia-header' }, 'Changed'), browser_1.VirtualRenderer.flatten(unstagedChangeDivs));
        }
        return undefined;
    };
    GitWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(git_1.Git)),
        __param(1, inversify_1.inject(git_repository_provider_1.GitRepositoryProvider)),
        __param(2, inversify_1.inject(git_watcher_1.GitWatcher)),
        __param(3, inversify_1.inject(browser_1.OpenerService)),
        __param(4, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __param(5, inversify_1.inject(core_1.ResourceProvider)),
        __param(6, inversify_1.inject(core_1.MessageService)),
        __param(7, inversify_1.inject(file_icons_1.FileIconProvider)),
        __param(8, inversify_1.inject(core_1.CommandService)),
        __param(9, inversify_1.inject(workspace_service_1.WorkspaceService)),
        __metadata("design:paramtypes", [Object, git_repository_provider_1.GitRepositoryProvider,
            git_watcher_1.GitWatcher, Object, Object, Function, core_1.MessageService,
            file_icons_1.FileIconProvider, Object, workspace_service_1.WorkspaceService])
    ], GitWidget);
    return GitWidget;
}(browser_1.VirtualWidget));
exports.GitWidget = GitWidget;
//# sourceMappingURL=git-widget.js.map