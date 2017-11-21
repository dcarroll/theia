"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionProvider = Symbol("ContributionProvider");
var ContainerBasedContributionProvider = /** @class */ (function () {
    function ContainerBasedContributionProvider(serviceIdentifier, container) {
        this.serviceIdentifier = serviceIdentifier;
        this.container = container;
    }
    ContainerBasedContributionProvider.prototype.getContributions = function () {
        if (this.services === undefined) {
            if (this.container.isBound(this.serviceIdentifier)) {
                try {
                    this.services = this.container.getAll(this.serviceIdentifier);
                }
                catch (error) {
                    console.error(error);
                    this.services = [];
                }
            }
            else {
                this.services = [];
            }
        }
        return this.services;
    };
    return ContainerBasedContributionProvider;
}());
function bindContributionProvider(bind, id) {
    bind(exports.ContributionProvider)
        .toDynamicValue(function (ctx) { return new ContainerBasedContributionProvider(id, ctx.container); })
        .inSingletonScope().whenTargetNamed(id);
}
exports.bindContributionProvider = bindContributionProvider;
//# sourceMappingURL=contribution-provider.js.map