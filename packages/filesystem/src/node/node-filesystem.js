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
Object.defineProperty(exports, "__esModule", { value: true });
var mv = require("mv");
var trash = require("trash");
var paths = require("path");
var fs = require("fs-extra");
var os = require("os");
var touch = require("touch");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var FileSystemNodeOptions = /** @class */ (function () {
    function FileSystemNodeOptions() {
    }
    FileSystemNodeOptions.DEFAULT = {
        encoding: 'utf8',
        overwrite: false,
        recursive: true,
        moveToTrash: true
    };
    FileSystemNodeOptions = __decorate([
        inversify_1.injectable()
    ], FileSystemNodeOptions);
    return FileSystemNodeOptions;
}());
exports.FileSystemNodeOptions = FileSystemNodeOptions;
var FileSystemNode = /** @class */ (function () {
    function FileSystemNode(options) {
        if (options === void 0) { options = FileSystemNodeOptions.DEFAULT; }
        this.options = options;
    }
    FileSystemNode.prototype.setClient = function (client) {
        this.client = client;
    };
    FileSystemNode.prototype.getFileStat = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var uri_, stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri_ = new uri_1.default(uri);
                        return [4 /*yield*/, this.doGetStat(uri_, 1)];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            throw new Error("Cannot find file under the given URI. URI: " + uri + ".");
                        }
                        return [2 /*return*/, stat];
                }
            });
        });
    };
    FileSystemNode.prototype.exists = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fs.pathExists(file_uri_1.FileUri.fsPath(new uri_1.default(uri)))];
            });
        });
    };
    FileSystemNode.prototype.resolveContent = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _uri, stat, encoding, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _uri = new uri_1.default(uri);
                        return [4 /*yield*/, this.doGetStat(_uri, 0)];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            throw new Error("Cannot find file under the given URI. URI: " + uri + ".");
                        }
                        if (stat.isDirectory) {
                            throw new Error("Cannot resolve the content of a directory. URI: " + uri + ".");
                        }
                        return [4 /*yield*/, this.doGetEncoding(options)];
                    case 2:
                        encoding = _a.sent();
                        return [4 /*yield*/, fs.readFile(file_uri_1.FileUri.fsPath(_uri), { encoding: encoding })];
                    case 3:
                        content = _a.sent();
                        return [2 /*return*/, { stat: stat, content: content }];
                }
            });
        });
    };
    FileSystemNode.prototype.setContent = function (file, content, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _uri, stat, encoding, newStat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _uri = new uri_1.default(file.uri);
                        return [4 /*yield*/, this.doGetStat(_uri, 0)];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            throw new Error("Cannot find file under the given URI. URI: " + file.uri + ".");
                        }
                        if (stat.isDirectory) {
                            throw new Error("Cannot set the content of a directory. URI: " + file.uri + ".");
                        }
                        return [4 /*yield*/, this.isInSync(file, stat)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("File is out of sync. URI: " + file.uri + ".\nExpected: " + JSON.stringify(stat) + ".\nActual: " + JSON.stringify(file) + ".");
                        }
                        return [4 /*yield*/, this.doGetEncoding(options)];
                    case 3:
                        encoding = _a.sent();
                        return [4 /*yield*/, fs.writeFile(file_uri_1.FileUri.fsPath(_uri), content, { encoding: encoding })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.doGetStat(_uri, 1)];
                    case 5:
                        newStat = _a.sent();
                        if (newStat) {
                            return [2 /*return*/, newStat];
                        }
                        throw new Error("Error occurred while writing file content. The file does not exist under " + file.uri + ".");
                }
            });
        });
    };
    FileSystemNode.prototype.isInSync = function (file, stat) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (stat.lastModification === file.lastModification && stat.size === file.size) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, this.client ? this.client.shouldOverwrite(file, stat) : false];
            });
        });
    };
    FileSystemNode.prototype.move = function (sourceUri, targetUri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _sourceUri, _targetUri, _a, sourceStat, targetStat, overwrite, label, message, _b, sourceMightHaveChildren, targetMightHaveChildren, now, newStat, newStat;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _sourceUri = new uri_1.default(sourceUri);
                        _targetUri = new uri_1.default(targetUri);
                        return [4 /*yield*/, Promise.all([this.doGetStat(_sourceUri, 1), this.doGetStat(_targetUri, 1), this.doGetOverwrite(options)])];
                    case 1:
                        _a = __read.apply(void 0, [_c.sent(), 3]), sourceStat = _a[0], targetStat = _a[1], overwrite = _a[2];
                        if (!sourceStat) {
                            throw new Error("File does not exist under " + sourceUri + ".");
                        }
                        if (targetStat && !overwrite) {
                            throw new Error("File already exists under the '" + targetUri + "' target location. Did you set the 'overwrite' flag to true?");
                        }
                        // Different types. Files <-> Directory.
                        if (targetStat && sourceStat.isDirectory !== targetStat.isDirectory) {
                            label = function (stat) { return stat.isDirectory ? 'directory' : 'file'; };
                            message = "Cannot move a " + label(sourceStat) + " to an existing " + label(targetStat) + " location. Source URI: " + sourceUri + ". Target URI: " + targetUri + ".";
                            throw new Error(message);
                        }
                        return [4 /*yield*/, Promise.all([this.mayHaveChildren(_sourceUri), this.mayHaveChildren(_targetUri)])];
                    case 2:
                        _b = __read.apply(void 0, [_c.sent(), 2]), sourceMightHaveChildren = _b[0], targetMightHaveChildren = _b[1];
                        if (!(overwrite && targetStat && targetStat.isDirectory && sourceStat.isDirectory && !sourceMightHaveChildren && !targetMightHaveChildren)) return [3 /*break*/, 6];
                        now = Date.now() / 1000;
                        return [4 /*yield*/, fs.utimes(file_uri_1.FileUri.fsPath(_targetUri), now, now)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, fs.rmdir(file_uri_1.FileUri.fsPath(_sourceUri))];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.doGetStat(_targetUri, 1)];
                    case 5:
                        newStat = _c.sent();
                        if (newStat) {
                            return [2 /*return*/, newStat];
                        }
                        throw new Error("Error occurred when moving resource from " + sourceUri + " to " + targetUri + ". Resource does not exist at " + targetUri + ".");
                    case 6:
                        if (!(overwrite && targetStat && targetStat.isDirectory && sourceStat.isDirectory && !targetMightHaveChildren && sourceMightHaveChildren)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.copy(sourceUri, targetUri, { overwrite: overwrite })];
                    case 7:
                        newStat = _c.sent();
                        return [4 /*yield*/, this.delete(sourceUri)];
                    case 8:
                        _c.sent();
                        return [2 /*return*/, newStat];
                    case 9: return [2 /*return*/, new Promise(function (resolve, reject) {
                            mv(file_uri_1.FileUri.fsPath(_sourceUri), file_uri_1.FileUri.fsPath(_targetUri), { mkdirp: true, clobber: overwrite }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (error) {
                                                return [2 /*return*/, reject(error)];
                                            }
                                            _a = resolve;
                                            return [4 /*yield*/, this.doGetStat(_targetUri, 1)];
                                        case 1:
                                            _a.apply(void 0, [_b.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        })];
                }
            });
        });
    };
    FileSystemNode.prototype.copy = function (sourceUri, targetUri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _sourceUri, _targetUri, _a, sourceStat, targetStat, overwrite, recursive, newStat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _sourceUri = new uri_1.default(sourceUri);
                        _targetUri = new uri_1.default(targetUri);
                        return [4 /*yield*/, Promise.all([
                                this.doGetStat(_sourceUri, 0),
                                this.doGetStat(_targetUri, 0),
                                this.doGetOverwrite(options),
                                this.doGetRecursive(options)
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 4]), sourceStat = _a[0], targetStat = _a[1], overwrite = _a[2], recursive = _a[3];
                        if (!sourceStat) {
                            throw new Error("File does not exist under " + sourceUri + ".");
                        }
                        if (targetStat && !overwrite) {
                            throw new Error("File already exist under the '" + targetUri + "' target location. Did you set the 'overwrite' flag to true?");
                        }
                        return [4 /*yield*/, fs.copy(file_uri_1.FileUri.fsPath(_sourceUri), file_uri_1.FileUri.fsPath(_targetUri), { overwrite: overwrite, recursive: recursive })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.doGetStat(_targetUri, 1)];
                    case 3:
                        newStat = _b.sent();
                        if (newStat) {
                            return [2 /*return*/, newStat];
                        }
                        throw new Error("Error occurred while copying " + sourceUri + " to " + targetUri + ". The file does not exist at " + targetUri + ".");
                }
            });
        });
    };
    FileSystemNode.prototype.createFile = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _uri, parentUri, _a, stat, parentStat, content, encoding, newStat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _uri = new uri_1.default(uri);
                        parentUri = _uri.parent;
                        return [4 /*yield*/, Promise.all([this.doGetStat(_uri, 0), this.doGetStat(parentUri, 0)])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), stat = _a[0], parentStat = _a[1];
                        if (stat) {
                            throw new Error("Error occurred while creating the file. File already exists at " + uri + ".");
                        }
                        if (!!parentStat) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.mkdirs(file_uri_1.FileUri.fsPath(parentUri))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.doGetContent(options)];
                    case 4:
                        content = _b.sent();
                        return [4 /*yield*/, this.doGetEncoding(options)];
                    case 5:
                        encoding = _b.sent();
                        return [4 /*yield*/, fs.writeFile(file_uri_1.FileUri.fsPath(_uri), content, { encoding: encoding })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.doGetStat(_uri, 1)];
                    case 7:
                        newStat = _b.sent();
                        if (newStat) {
                            return [2 /*return*/, newStat];
                        }
                        throw new Error("Error occurred while creating new file. The file does not exist at " + uri + ".");
                }
            });
        });
    };
    FileSystemNode.prototype.createFolder = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _uri, stat, newStat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _uri = new uri_1.default(uri);
                        return [4 /*yield*/, this.doGetStat(_uri, 0)];
                    case 1:
                        stat = _a.sent();
                        if (stat) {
                            throw new Error("Error occurred while creating the directory. File already exists at " + uri + ".");
                        }
                        return [4 /*yield*/, fs.mkdirs(file_uri_1.FileUri.fsPath(_uri))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.doGetStat(_uri, 1)];
                    case 3:
                        newStat = _a.sent();
                        if (newStat) {
                            return [2 /*return*/, newStat];
                        }
                        throw new Error("Error occurred while creating the directory. The directory does not exist at " + uri + ".");
                }
            });
        });
    };
    FileSystemNode.prototype.touchFile = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _uri, stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _uri = new uri_1.default(uri);
                        return [4 /*yield*/, this.doGetStat(_uri, 0)];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            return [2 /*return*/, this.createFile(uri)];
                        }
                        else {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    // tslint:disable-next-line:no-any
                                    touch(file_uri_1.FileUri.fsPath(_uri), function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (error) {
                                                        return [2 /*return*/, reject(error)];
                                                    }
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.doGetStat(_uri, 1)];
                                                case 1:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemNode.prototype.delete = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _uri, stat, moveToTrash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _uri = new uri_1.default(uri);
                        return [4 /*yield*/, this.doGetStat(_uri, 0)];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            throw new Error("File does not exist under " + uri + ".");
                        }
                        return [4 /*yield*/, this.doGetMoveToTrash(options)];
                    case 2:
                        moveToTrash = _a.sent();
                        if (moveToTrash) {
                            return [2 /*return*/, trash([file_uri_1.FileUri.fsPath(_uri)])];
                        }
                        else {
                            return [2 /*return*/, fs.remove(file_uri_1.FileUri.fsPath(_uri))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemNode.prototype.getEncoding = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _uri, stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _uri = new uri_1.default(uri);
                        return [4 /*yield*/, this.doGetStat(_uri, 0)];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            throw new Error("File does not exist under " + uri + ".");
                        }
                        if (stat.isDirectory) {
                            throw new Error("Cannot get the encoding of a director. URI: " + uri + ".");
                        }
                        return [2 /*return*/, this.options.encoding];
                }
            });
        });
    };
    FileSystemNode.prototype.getRoots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cwdRoot, rootUri, root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cwdRoot = paths.parse(process.cwd()).root;
                        rootUri = file_uri_1.FileUri.create(cwdRoot);
                        return [4 /*yield*/, this.doGetStat(rootUri, 1)];
                    case 1:
                        root = _a.sent();
                        if (root) {
                            return [2 /*return*/, [root]];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    FileSystemNode.prototype.getCurrentUserHome = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getFileStat(file_uri_1.FileUri.create(os.homedir()).toString())];
            });
        });
    };
    FileSystemNode.prototype.dispose = function () {
        // NOOP
    };
    FileSystemNode.prototype.doGetStat = function (uri, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.stat(file_uri_1.FileUri.fsPath(uri))];
                    case 1:
                        stats = _a.sent();
                        if (stats.isDirectory()) {
                            return [2 /*return*/, this.doCreateDirectoryStat(uri, stats, depth)];
                        }
                        return [2 /*return*/, this.doCreateFileStat(uri, stats)];
                    case 2:
                        error_1 = _a.sent();
                        if (isErrnoException(error_1)) {
                            if (error_1.code === 'ENOENT' || error_1.code === 'EACCES' || error_1.code === 'EBUSY' || error_1.code === 'EPERM') {
                                return [2 /*return*/, undefined];
                            }
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemNode.prototype.doCreateFileStat = function (uri, stat) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        uri: uri.toString(),
                        lastModification: stat.mtime.getTime(),
                        isDirectory: false,
                        size: stat.size
                    }];
            });
        });
    };
    FileSystemNode.prototype.doCreateDirectoryStat = function (uri, stat, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var children, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(depth > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doGetChildren(uri, depth)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = [];
                        _b.label = 3;
                    case 3:
                        children = _a;
                        return [2 /*return*/, {
                                uri: uri.toString(),
                                lastModification: stat.mtime.getTime(),
                                isDirectory: true,
                                children: children
                            }];
                }
            });
        });
    };
    FileSystemNode.prototype.doGetChildren = function (uri, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var files, children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.readdir(file_uri_1.FileUri.fsPath(uri))];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (fileName) { return uri.resolve(fileName); }).map(function (childUri) { return _this.doGetStat(childUri, depth - 1); }))];
                    case 2:
                        children = _a.sent();
                        return [2 /*return*/, children.filter(notEmpty)];
                }
            });
        });
    };
    /**
     * Return `true` if it's possible for this URI to have children.
     * It might not be possible to be certain because of permission problems or other filesystem errors.
     */
    FileSystemNode.prototype.mayHaveChildren = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var rootStat, _a, stat, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doGetStat(uri, 0)];
                    case 1:
                        rootStat = _c.sent();
                        if (rootStat === undefined) {
                            return [2 /*return*/, true];
                        }
                        /* Not a directory.  */
                        if (rootStat !== undefined && rootStat.isDirectory === false) {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _c.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.doGetStat(uri, 1)];
                    case 4:
                        stat = _c.sent();
                        if (stat !== undefined && stat.children !== undefined) {
                            return [2 /*return*/, stat.children.length > 0];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _b = _c.sent();
                        return [2 /*return*/, true];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemNode.prototype.doGetEncoding = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, option && typeof (option.encoding) !== 'undefined'
                        ? option.encoding
                        : this.options.encoding];
            });
        });
    };
    FileSystemNode.prototype.doGetOverwrite = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, option && typeof (option.overwrite) !== 'undefined'
                        ? option.overwrite
                        : this.options.overwrite];
            });
        });
    };
    FileSystemNode.prototype.doGetRecursive = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, option && typeof (option.recursive) !== 'undefined'
                        ? option.recursive
                        : this.options.recursive];
            });
        });
    };
    FileSystemNode.prototype.doGetMoveToTrash = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, option && typeof (option.moveToTrash) !== 'undefined'
                        ? option.moveToTrash
                        : this.options.moveToTrash];
            });
        });
    };
    FileSystemNode.prototype.doGetContent = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (option && option.content) || ''];
            });
        });
    };
    FileSystemNode = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(FileSystemNodeOptions)), __param(0, inversify_1.optional()),
        __metadata("design:paramtypes", [FileSystemNodeOptions])
    ], FileSystemNode);
    return FileSystemNode;
}());
exports.FileSystemNode = FileSystemNode;
// tslint:disable-next-line:no-any
function isErrnoException(error) {
    return error.code !== undefined && error.errno !== undefined;
}
function notEmpty(value) {
    return value !== undefined;
}
//# sourceMappingURL=node-filesystem.js.map