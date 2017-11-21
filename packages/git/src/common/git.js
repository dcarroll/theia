"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The WS endpoint path to the Git service.
 */
exports.GitPath = '/services/git';
/**
 * Git symbol for DI.
 */
exports.Git = Symbol('Git');
/**
 * Contains a set of utility functions for [Git](#Git).
 */
var GitUtils;
(function (GitUtils) {
    /**
     * `true` if the argument is an option for renaming an existing branch in the repository.
     */
    // tslint:disable-next-line:no-any
    function isBranchRename(arg) {
        return !!arg && ('newName' in arg);
    }
    GitUtils.isBranchRename = isBranchRename;
    /**
     * `true` if the argument is an option for deleting an existing branch in the repository.
     */
    // tslint:disable-next-line:no-any
    function isBranchDelete(arg) {
        return !!arg && ('toDelete' in arg);
    }
    GitUtils.isBranchDelete = isBranchDelete;
    /**
     * `true` if the argument is an option for creating a new branch in the repository.
     */
    // tslint:disable-next-line:no-any
    function isBranchCreate(arg) {
        return !!arg && ('toCreate' in arg);
    }
    GitUtils.isBranchCreate = isBranchCreate;
    /**
     * `true` if the argument is an option for listing the branches in a repository.
     */
    // tslint:disable-next-line:no-any
    function isBranchList(arg) {
        return !!arg && ('type' in arg);
    }
    GitUtils.isBranchList = isBranchList;
    /**
     * `true` if the argument is an option for checking out a new local branch.
     */
    // tslint:disable-next-line:no-any
    function isBranchCheckout(arg) {
        return !!arg && ('branch' in arg);
    }
    GitUtils.isBranchCheckout = isBranchCheckout;
    /**
     * `true` if the argument is an option for checking out a working tree file.
     */
    // tslint:disable-next-line:no-any
    function isWorkingTreeFileCheckout(arg) {
        return !!arg && ('paths' in arg);
    }
    GitUtils.isWorkingTreeFileCheckout = isWorkingTreeFileCheckout;
})(GitUtils = exports.GitUtils || (exports.GitUtils = {}));
//# sourceMappingURL=git.js.map