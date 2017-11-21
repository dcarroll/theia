"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var json_file_1 = require("./json-file");
var extension_package_1 = require("./extension-package");
var ExtensionPackageCollector = /** @class */ (function () {
    function ExtensionPackageCollector(extensionPackageFactory, resolveModule) {
        this.extensionPackageFactory = extensionPackageFactory;
        this.resolveModule = resolveModule;
        this.sorted = [];
        this.visited = new Map();
    }
    ExtensionPackageCollector.prototype.collect = function (pck) {
        this.root = pck;
        this.collectPackages(pck);
        return this.sorted;
    };
    ExtensionPackageCollector.prototype.collectPackages = function (pck) {
        if (!pck.dependencies) {
            return;
        }
        // tslint:disable-next-line:forin
        for (var dependency in pck.dependencies) {
            var versionRange = pck.dependencies[dependency];
            this.collectPackage(dependency, versionRange);
        }
    };
    ExtensionPackageCollector.prototype.collectPackagesWithParent = function (pck, parent) {
        var current = this.parent;
        this.parent = parent;
        this.collectPackages(pck);
        this.parent = current;
    };
    ExtensionPackageCollector.prototype.collectPackage = function (name, versionRange) {
        if (this.visited.has(name)) {
            return;
        }
        this.visited.set(name, true);
        var packagePath = this.resolveModule(name + '/package.json');
        var pck = json_file_1.readJsonFile(packagePath);
        if (extension_package_1.RawExtensionPackage.is(pck)) {
            var parent_1 = this.parent;
            var version = pck.version;
            var transitive = !(name in this.root.dependencies);
            pck.installed = { packagePath: packagePath, version: version, parent: parent_1, transitive: transitive };
            pck.version = versionRange;
            var extensionPackage = this.extensionPackageFactory(pck);
            this.collectPackagesWithParent(pck, extensionPackage);
            this.sorted.push(extensionPackage);
        }
    };
    return ExtensionPackageCollector;
}());
exports.ExtensionPackageCollector = ExtensionPackageCollector;
//# sourceMappingURL=extension-package-collector.js.map