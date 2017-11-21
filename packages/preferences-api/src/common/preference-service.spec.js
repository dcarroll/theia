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
var preference_service_1 = require("./preference-service");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var prefJson = {
    "prefExists": true,
    "testString1": "1",
    "testNumber0": 0,
    "testStringEmpty": "",
    "testStringTrue": true,
    "testString": "string",
    "testBooleanTrue": true,
    "testNumber1": 1,
};
var PreferenceServerStub = /** @class */ (function () {
    function PreferenceServerStub() {
    }
    PreferenceServerStub.prototype.has = function (preferenceName) {
        switch (preferenceName) {
            case ("prefExists"): {
                return Promise.resolve(true);
            }
            default: {
                return Promise.resolve(false);
            }
        }
    };
    PreferenceServerStub.prototype.get = function (preferenceName) {
        switch (preferenceName) {
            case ("testString1"): {
                return Promise.resolve("1");
            }
            case ("testNumber0"): {
                return Promise.resolve(0);
            }
            case ("testStringEmpty"): {
                return Promise.resolve("");
            }
            case ("testStringTrue"): {
                return Promise.resolve("true");
            }
            case ("testString"): {
                return Promise.resolve("string");
            }
            case ("testBooleanTrue"): {
                return Promise.resolve(true);
            }
            case ("testNumber1"): {
                return Promise.resolve(1);
            }
            default:
                return Promise.resolve(undefined);
        }
    };
    PreferenceServerStub.prototype.setClient = function (client) {
        this.client = client;
    };
    PreferenceServerStub.prototype.ready = function () {
        return Promise.resolve(undefined);
    };
    PreferenceServerStub.prototype.onDidChangePreference = function (event) {
        if (this.client) {
            this.client.onDidChangePreference(event);
        }
    };
    PreferenceServerStub.prototype.dispose = function () { };
    PreferenceServerStub.prototype.fireEvents = function () {
        try {
            for (var _a = __values(Object.keys(prefJson)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var field = _b.value;
                var event_1 = { preferenceName: field, newValue: prefJson[field] };
                var changes = [];
                changes.push(event_1);
                this.onDidChangePreference({ changes: changes });
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
    };
    return PreferenceServerStub;
}());
var expect = chai.expect;
var prefService;
var prefStub;
before(function () {
    chai.config.showDiff = true;
    chai.config.includeStack = true;
    chai.should();
    chai.use(chaiAsPromised);
    prefStub = new PreferenceServerStub();
    prefService = new preference_service_1.PreferenceService(prefStub);
    prefStub.fireEvents();
});
describe('preference-service  (simplified api)', function () {
    var valNumber, valBoolean, valString;
    it('should get the has() from the server', function () {
        var hasValue = prefService.has("prefExists");
        expect(hasValue).to.be.true;
        hasValue = prefService.has("doesNotExist");
        expect(hasValue).to.be.false;
    });
    it('should return the correct values without casting', function () {
        valBoolean = prefService.getBoolean("testBooleanTrue");
        expect(valBoolean).to.be.true;
        valString = prefService.getString("testString");
        expect(valString).to.be.equal("string");
        valNumber = prefService.getNumber("testNumber1");
        expect(valNumber).to.be.equal(1);
    });
    it('should return correct values when casting to other types', function () {
        // should return true for a non-empty string
        valBoolean = prefService.getBoolean("testString");
        expect(valBoolean).to.be.true;
        // should return false for an empty string
        valBoolean = prefService.getBoolean("testStringEmpty");
        expect(valBoolean).to.be.false;
        // should return true for an non-zero number
        valBoolean = prefService.getBoolean("testString1");
        expect(valBoolean).to.be.true;
        // should return false for an zero number
        valBoolean = prefService.getBoolean("testNumber0");
        expect(valBoolean).to.be.false;
        // should return true value as a "true" string
        valString = prefService.getString("testBooleanTrue");
        expect(valString).to.be.equal("true");
        // should return NaN for a NaN
        valNumber = prefService.getNumber("testString");
        expect(isNaN(valNumber)).to.be.true;
    });
    it('should return undefined when wrong value and no default value supplied', function () {
        // should return undefined for a non-existing boolean key
        valBoolean = prefService.getBoolean("doesntExist");
        expect(valBoolean).to.be.undefined;
        // should return undefined for a non-existing string key
        valString = prefService.getString("doesntExist");
        expect(valBoolean).to.be.undefined;
        // should return undefined for a non-existing number key
        valNumber = prefService.getNumber("doesntExist");
        expect(valNumber).to.be.undefined;
    });
    it('should return the default values', function () {
        // should return the default value for a boolean
        valBoolean = prefService.getBoolean("doesntExist", true);
        expect(valBoolean).to.be.true;
        // should return the default value for a string
        valString = prefService.getString("doesntExist", "true");
        expect(valString).to.be.equal("true");
        // should return the default value for a number
        valNumber = prefService.getNumber("doesntExist", 57);
        expect(valNumber).to.be.equal(57);
    });
    it('register for preference change and receive event', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var prefChangedEvent;
        return __generator(this, function (_a) {
            prefChangedEvent = {
                changes: [
                    { preferenceName: "test" },
                    { preferenceName: "test2", newValue: true },
                    { preferenceName: "test3", newValue: true, oldValue: false }
                ]
            };
            prefService.onPreferenceChanged(function (event) {
                switch (event.preferenceName) {
                    case ("test"): {
                        expect(event.newValue).to.be.undefined;
                        break;
                    }
                    case ("test2"): {
                        expect(event.newValue).to.be.true;
                        expect(event.oldValue).to.be.undefined;
                        break;
                    }
                    case ("test3"): {
                        expect(event.newValue).to.be.true;
                        expect(event.oldValue).to.be.false;
                        done();
                        break;
                    }
                }
            });
            prefStub.onDidChangePreference(prefChangedEvent);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=preference-service.spec.js.map