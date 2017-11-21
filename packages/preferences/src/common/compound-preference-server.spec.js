"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var temp = require("temp");
var fs = require("fs-extra");
var preferences_api_1 = require("@theia/preferences-api");
var preference_stubs_1 = require("../node/test/preference-stubs");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var expect = chai.expect;
var track = temp.track();
var preferencePath = '.theia/prefs.json';
var compoundPrefServer;
var preferenceFileUri;
var helper = new preference_stubs_1.JsonPrefHelper();
before(function () {
    chai.should();
    chai.use(chaiAsPromised);
    chai.config.showDiff = true;
    chai.config.includeStack = true;
    var rootUri = file_uri_1.FileUri.create(track.mkdirSync());
    preferenceFileUri = rootUri.resolve(preferencePath);
    fs.mkdirSync(file_uri_1.FileUri.fsPath(rootUri.resolve('.theia')));
    fs.writeFileSync(file_uri_1.FileUri.fsPath(preferenceFileUri), '');
    var jsonPrefServer = helper.createJsonPrefServer(preferenceFileUri);
    compoundPrefServer = new preferences_api_1.CompoundPreferenceServer(jsonPrefServer);
});
after(function () {
    compoundPrefServer.dispose();
    track.cleanupSync();
});
describe('compound-preference-server', function () {
    it('register a client', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise, fileContent, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = new Promise(function (done) {
                        compoundPrefServer.setClient({
                            onDidChangePreference: function (event) {
                                try {
                                    for (var _a = __values(event.changes), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        var change = _b.value;
                                        switch (change.preferenceName) {
                                            case "showLineNumbers":
                                                expect(change.newValue).to.be.true;
                                                done();
                                                break;
                                        }
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                var e_1, _c;
                            }
                        });
                    });
                    fileContent = '{ "showLineNumbers": true }';
                    // Modify the content.
                    fs.writeFileSync(file_uri_1.FileUri.fsPath(preferenceFileUri), fileContent);
                    return [4 /*yield*/, helper.getFS().resolveContent(file_uri_1.FileUri.fsPath(preferenceFileUri))];
                case 1:
                    content = (_a.sent()).content;
                    expect(content).to.be.equal(fileContent);
                    helper.getWatcher().fireEvents({
                        changes: [{
                                uri: preferenceFileUri.toString(),
                                type: 0
                            }]
                    });
                    return [2 /*return*/, promise];
            }
        });
    }); });
});
//# sourceMappingURL=compound-preference-server.spec.js.map