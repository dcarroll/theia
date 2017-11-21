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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var git_quick_open_service_1 = require("./git-quick-open-service");
var git_repository_provider_1 = require("./git-repository-provider");
var GIT_COMMANDS;
(function (GIT_COMMANDS) {
    GIT_COMMANDS.FETCH = {
        id: 'git.fetch',
        label: 'Git Fetch'
    };
    GIT_COMMANDS.PULL = {
        id: 'git.pull',
        label: 'Git Pull'
    };
    GIT_COMMANDS.PUSH = {
        id: 'git.push',
        label: 'Git Push'
    };
    GIT_COMMANDS.MERGE = {
        id: 'git.merge',
        label: 'Git Merge'
    };
})(GIT_COMMANDS = exports.GIT_COMMANDS || (exports.GIT_COMMANDS = {}));
var GitCommandHandlers = /** @class */ (function () {
    function GitCommandHandlers(quickOpenService, repositoryProvider) {
        this.quickOpenService = quickOpenService;
        this.repositoryProvider = repositoryProvider;
    }
    GitCommandHandlers.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(GIT_COMMANDS.FETCH);
        registry.registerHandler(GIT_COMMANDS.FETCH.id, {
            execute: function () { return _this.quickOpenService.fetch(); },
            isEnabled: function () { return _this.repositorySelected; }
        });
        registry.registerCommand(GIT_COMMANDS.PULL);
        registry.registerHandler(GIT_COMMANDS.PULL.id, {
            execute: function () { return _this.quickOpenService.pull(); },
            isEnabled: function () { return _this.repositorySelected; }
        });
        registry.registerCommand(GIT_COMMANDS.PUSH);
        registry.registerHandler(GIT_COMMANDS.PUSH.id, {
            execute: function () { return _this.quickOpenService.push(); },
            isEnabled: function () { return _this.repositorySelected; }
        });
        registry.registerCommand(GIT_COMMANDS.MERGE);
        registry.registerHandler(GIT_COMMANDS.MERGE.id, {
            execute: function () { return _this.quickOpenService.merge(); },
            isEnabled: function () { return _this.repositorySelected; }
        });
    };
    Object.defineProperty(GitCommandHandlers.prototype, "repositorySelected", {
        get: function () {
            return this.repositoryProvider.selectedRepository !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    GitCommandHandlers = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(git_quick_open_service_1.GitQuickOpenService)),
        __param(1, inversify_1.inject(git_repository_provider_1.GitRepositoryProvider)),
        __metadata("design:paramtypes", [git_quick_open_service_1.GitQuickOpenService,
            git_repository_provider_1.GitRepositoryProvider])
    ], GitCommandHandlers);
    return GitCommandHandlers;
}());
exports.GitCommandHandlers = GitCommandHandlers;
//# sourceMappingURL=git-command.js.map