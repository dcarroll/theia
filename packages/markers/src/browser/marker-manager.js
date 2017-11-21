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
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var storage_service_1 = require("@theia/core/lib/browser/storage-service");
var common_2 = require("@theia/filesystem/lib/common");
var MarkerCollection = /** @class */ (function () {
    function MarkerCollection(uri, kind) {
        this.uri = uri;
        this.kind = kind;
        this.owner2Markers = new Map();
    }
    MarkerCollection.prototype.getOwners = function () {
        return Array.from(this.owner2Markers.keys());
    };
    MarkerCollection.prototype.getMarkers = function (owner) {
        return this.owner2Markers.get(owner) || [];
    };
    MarkerCollection.prototype.setMarkers = function (owner, markerData) {
        var _this = this;
        var before = this.owner2Markers.get(owner);
        if (markerData.length > 0) {
            this.owner2Markers.set(owner, markerData.map(function (data) { return _this.createMarker(owner, data); }));
        }
        else {
            this.owner2Markers.delete(owner);
        }
        return before || [];
    };
    MarkerCollection.prototype.createMarker = function (owner, data) {
        return Object.freeze({
            uri: this.uri.toString(),
            kind: this.kind,
            owner: owner,
            data: data
        });
    };
    MarkerCollection.prototype.findMarkers = function (filter) {
        if (filter.owner) {
            if (this.owner2Markers.has(filter.owner)) {
                return this.filterMarkers(filter, this.owner2Markers.get(filter.owner));
            }
            return [];
        }
        else {
            var result = [];
            try {
                for (var _a = __values(this.owner2Markers.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var markers = _b.value;
                    result.push.apply(result, __spread(this.filterMarkers(filter, markers)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        }
        var e_1, _c;
    };
    MarkerCollection.prototype.filterMarkers = function (filter, toFilter) {
        if (!toFilter) {
            return [];
        }
        if (filter.dataFilter) {
            return toFilter.filter(function (d) { return filter.dataFilter(d.data); });
        }
        else {
            return toFilter;
        }
    };
    return MarkerCollection;
}());
exports.MarkerCollection = MarkerCollection;
var MarkerManager = /** @class */ (function () {
    function MarkerManager(storageService, fileWatcher) {
        var _this = this;
        this.storageService = storageService;
        this.fileWatcher = fileWatcher;
        this.uri2MarkerCollection = new Map();
        this.onDidChangeMarkersEmitter = new common_1.Emitter();
        this.initialized = this.loadMarkersFromStorage();
        if (fileWatcher) {
            fileWatcher.onFilesChanged(function (changes) {
                try {
                    for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                        var change = changes_1_1.value;
                        if (change.type === common_2.FileChangeType.DELETED) {
                            var uriString = change.uri.toString();
                            var collection = _this.uri2MarkerCollection.get(uriString);
                            if (collection !== undefined) {
                                _this.uri2MarkerCollection.delete(uriString);
                                _this.fireOnDidChangeMarkers();
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                var e_2, _a;
            });
        }
    }
    MarkerManager.prototype.getStorageKey = function () {
        return 'marker-' + this.getKind();
    };
    MarkerManager.prototype.loadMarkersFromStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, entries, entries_1, entries_1_1, entry, _a, _b, ownerEntry, e_3, _c, e_4, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        key = this.getStorageKey();
                        if (!key) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storageService.getData(key, [])];
                    case 1:
                        entries = _e.sent();
                        try {
                            for (entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                                entry = entries_1_1.value;
                                try {
                                    for (_a = __values(entry.markers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        ownerEntry = _b.value;
                                        this.internalSetMarkers(new uri_1.default(entry.uri), ownerEntry.owner, ownerEntry.markerData);
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (entries_1_1 && !entries_1_1.done && (_c = entries_1.return)) _c.call(entries_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        this.onDidChangeMarkers(function () { return _this.saveMarkersToStorage(); });
                        _e.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MarkerManager.prototype.saveMarkersToStorage = function () {
        var key = this.getStorageKey();
        if (key) {
            var result = [];
            try {
                for (var _a = __values(this.uri2MarkerCollection.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var _c = __read(_b.value, 2), uri = _c[0], collection = _c[1];
                    var ownerEntries = [];
                    try {
                        for (var _d = __values(collection.getOwners()), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var owner = _e.value;
                            var marker = collection.getMarkers(owner);
                            if (marker) {
                                ownerEntries.push({
                                    owner: owner,
                                    markerData: Array.from(marker.map(function (m) { return m.data; }))
                                });
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    result.push({
                        uri: uri,
                        markers: ownerEntries
                    });
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                }
                finally { if (e_6) throw e_6.error; }
            }
            this.storageService.setData(key, result);
        }
        var e_6, _g, e_5, _f;
    };
    Object.defineProperty(MarkerManager.prototype, "onDidChangeMarkers", {
        get: function () {
            return this.onDidChangeMarkersEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MarkerManager.prototype.fireOnDidChangeMarkers = function () {
        this.onDidChangeMarkersEmitter.fire(undefined);
    };
    /*
     * replaces the current markers for the given uri and owner with the given data.
     */
    MarkerManager.prototype.setMarkers = function (uri, owner, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialized];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internalSetMarkers(uri, owner, data)];
                }
            });
        });
    };
    MarkerManager.prototype.internalSetMarkers = function (uri, owner, data) {
        var collection = this.getCollection(uri);
        var result = collection.setMarkers(owner, data);
        this.fireOnDidChangeMarkers();
        return result;
    };
    MarkerManager.prototype.getCollection = function (uri) {
        var collection;
        var uriString = uri.toString();
        if (this.uri2MarkerCollection.has(uriString)) {
            collection = this.uri2MarkerCollection.get(uriString);
        }
        else {
            collection = new MarkerCollection(uri, this.getKind());
            this.uri2MarkerCollection.set(uriString, collection);
        }
        return collection;
    };
    /*
     * returns all markers that satisfy the given filter.
     */
    MarkerManager.prototype.findMarkers = function (filter) {
        if (filter === void 0) { filter = {}; }
        if (filter.uri) {
            return this.getCollection(filter.uri).findMarkers(filter);
        }
        else {
            var result = [];
            try {
                for (var _a = __values(this.getUris()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var uri = _b.value;
                    result.push.apply(result, __spread(this.getCollection(new uri_1.default(uri)).findMarkers(filter)));
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return result;
        }
        var e_7, _c;
    };
    MarkerManager.prototype.getUris = function () {
        return this.uri2MarkerCollection.keys();
    };
    MarkerManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(storage_service_1.StorageService)),
        __param(1, inversify_1.inject(common_2.FileSystemWatcher)),
        __metadata("design:paramtypes", [Object, common_2.FileSystemWatcher])
    ], MarkerManager);
    return MarkerManager;
}());
exports.MarkerManager = MarkerManager;
//# sourceMappingURL=marker-manager.js.map