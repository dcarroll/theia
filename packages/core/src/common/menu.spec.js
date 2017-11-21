"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var command_1 = require("./command");
var menu_1 = require("./menu");
require("mocha");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
before(function () {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
    chai.should();
    chai.use(chaiAsPromised);
});
beforeEach(function () {
});
describe('menu-model-registry', function () {
    describe('01 #register', function () {
        it('Should allow to register menu actions.', function () {
            var fileMenu = ["main", "File"];
            var fileOpenMenu = __spread(fileMenu, ["0_open"]);
            var service = createMenuRegistry({
                registerMenus: function (menuRegistry) {
                    menuRegistry.registerSubmenu(fileMenu, "File");
                    menuRegistry.registerMenuAction(fileOpenMenu, {
                        commandId: 'open'
                    });
                    menuRegistry.registerMenuAction(fileOpenMenu, {
                        commandId: 'open.with'
                    });
                }
            }, {
                registerCommands: function (reg) {
                    reg.registerCommand({
                        id: 'open',
                        label: "A"
                    });
                    reg.registerCommand({
                        id: 'open.with',
                        label: "B"
                    });
                }
            });
            var all = service.getMenu();
            var main = all.children[0];
            expect(main.children.length).equals(1);
            expect(main.id, "main");
            expect(all.children.length).equals(1);
            var file = main.children[0];
            expect(file.children.length).equals(1);
            expect(file.label, "File");
            var openGroup = file.children[0];
            expect(openGroup.children.length).equals(2);
            // tslint:disable-next-line:no-unused-expression
            expect(openGroup.label).undefined;
        });
    });
});
function createMenuRegistry(menuContrib, commandContrib) {
    var cmdReg = new command_1.CommandRegistry({ getContributions: function () { return [commandContrib]; } });
    cmdReg.onStart();
    var menuReg = new menu_1.MenuModelRegistry({ getContributions: function () { return [menuContrib]; } }, cmdReg);
    menuReg.onStart();
    return menuReg;
}
//# sourceMappingURL=menu.spec.js.map