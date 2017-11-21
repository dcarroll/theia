"use strict";
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
var path = require("path");
var temp = require("temp");
var fs = require("fs-extra");
var chai_1 = require("chai");
var dugite_git_1 = require("./dugite-git");
var git_1 = require("dugite-extra/lib/core/git");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var model_1 = require("../common/model");
var test_helper_1 = require("dugite-extra/lib/command/test-helper");
var track = temp.track();
describe('git', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            this.timeout(10000);
            after(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    track.cleanupSync();
                    return [2 /*return*/];
                });
            }); });
            describe('repositories', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    it('should discover all nested repositories', function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, git, workspace, workspaceRootUri, repositories;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    root = track.mkdirSync('discovery-test-1');
                                    fs.mkdirSync(path.join(root, 'A'));
                                    fs.mkdirSync(path.join(root, 'B'));
                                    fs.mkdirSync(path.join(root, 'C'));
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'A'))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'B'))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'C'))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, createGit()];
                                case 4:
                                    git = _a.sent();
                                    return [4 /*yield*/, createWorkspace(root)];
                                case 5:
                                    workspace = _a.sent();
                                    return [4 /*yield*/, workspace.getRoot()];
                                case 6:
                                    workspaceRootUri = _a.sent();
                                    return [4 /*yield*/, git.repositories(workspaceRootUri)];
                                case 7:
                                    repositories = _a.sent();
                                    chai_1.expect(repositories.map(function (r) { return path.basename(file_uri_1.FileUri.fsPath(r.localUri)); }).sort()).to.deep.equal(['A', 'B', 'C']);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should discover all nested repositories and the root repository which is at the workspace root', function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, git, workspace, workspaceRootUri, repositories;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    root = track.mkdirSync('discovery-test-2');
                                    fs.mkdirSync(path.join(root, 'BASE'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'A'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'B'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'C'));
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE'))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE', 'A'))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE', 'B'))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE', 'C'))];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, createGit()];
                                case 5:
                                    git = _a.sent();
                                    return [4 /*yield*/, createWorkspace(path.join(root, 'BASE'))];
                                case 6:
                                    workspace = _a.sent();
                                    return [4 /*yield*/, workspace.getRoot()];
                                case 7:
                                    workspaceRootUri = _a.sent();
                                    return [4 /*yield*/, git.repositories(workspaceRootUri)];
                                case 8:
                                    repositories = _a.sent();
                                    chai_1.expect(repositories.map(function (r) { return path.basename(file_uri_1.FileUri.fsPath(r.localUri)); }).sort()).to.deep.equal(['A', 'B', 'BASE', 'C']);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should discover all nested repositories and the container repository', function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, git, workspace, workspaceRootUri, repositories, repositoryNames;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    root = track.mkdirSync('discovery-test-3');
                                    fs.mkdirSync(path.join(root, 'BASE'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'WS_ROOT'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'WS_ROOT', 'A'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'WS_ROOT', 'B'));
                                    fs.mkdirSync(path.join(root, 'BASE', 'WS_ROOT', 'C'));
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE'))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE', 'WS_ROOT', 'A'))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE', 'WS_ROOT', 'B'))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, test_helper_1.initRepository(path.join(root, 'BASE', 'WS_ROOT', 'C'))];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, createGit()];
                                case 5:
                                    git = _a.sent();
                                    return [4 /*yield*/, createWorkspace(path.join(root, 'BASE', 'WS_ROOT'))];
                                case 6:
                                    workspace = _a.sent();
                                    return [4 /*yield*/, workspace.getRoot()];
                                case 7:
                                    workspaceRootUri = _a.sent();
                                    return [4 /*yield*/, git.repositories(workspaceRootUri)];
                                case 8:
                                    repositories = _a.sent();
                                    repositoryNames = repositories.map(function (r) { return path.basename(file_uri_1.FileUri.fsPath(r.localUri)); });
                                    chai_1.expect(repositoryNames.shift()).to.equal('BASE'); // The first must be the container repository.
                                    chai_1.expect(repositoryNames.sort()).to.deep.equal(['A', 'B', 'C']);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('status', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    it('modifying a staged file should result in two changes', function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, localUri, repository, git, status, filePath, fileUri;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, test_helper_1.createTestRepository(track.mkdirSync('status-test'))];
                                case 1:
                                    root = _a.sent();
                                    localUri = file_uri_1.FileUri.create(root).toString();
                                    repository = { localUri: localUri };
                                    return [4 /*yield*/, createGit(root)];
                                case 2:
                                    git = _a.sent();
                                    return [4 /*yield*/, git.status(repository)];
                                case 3:
                                    status = _a.sent();
                                    chai_1.expect(status.changes).to.be.empty;
                                    filePath = path.join(root, 'A.txt');
                                    fileUri = file_uri_1.FileUri.create(filePath).toString();
                                    fs.writeFileSync(filePath, 'new content');
                                    chai_1.expect(fs.readFileSync(filePath, { encoding: 'utf8' })).to.be.equal('new content');
                                    return [4 /*yield*/, git.add(repository, fileUri)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, git.status(repository)];
                                case 5:
                                    // Check the status again. Expect one single change.
                                    status = _a.sent();
                                    chai_1.expect(status.changes).to.be.have.lengthOf(1);
                                    chai_1.expect(status.changes[0].uri).to.be.equal(fileUri);
                                    chai_1.expect(status.changes[0].staged).to.be.true;
                                    // Change the same file again.
                                    fs.writeFileSync(filePath, 'yet another new content');
                                    chai_1.expect(fs.readFileSync(filePath, { encoding: 'utf8' })).to.be.equal('yet another new content');
                                    return [4 /*yield*/, git.status(repository)];
                                case 6:
                                    // We expect two changes; one is staged, the other is in the working directory.
                                    status = _a.sent();
                                    chai_1.expect(status.changes).to.be.have.lengthOf(2);
                                    chai_1.expect(status.changes.map(function (f) { return f.uri; })).to.be.deep.equal([fileUri, fileUri]);
                                    chai_1.expect(status.changes.map(function (f) { return f.staged; }).sort()).to.be.deep.equal([false, true]);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('WorkingDirectoryStatus#equals', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    it('staged change should matter', function () { return __awaiter(_this, void 0, void 0, function () {
                        var left, right;
                        return __generator(this, function (_a) {
                            left = JSON.parse("\n            {\n                \"exists\":true,\n                \"branch\":\"GH-165\",\n                \"upstreamBranch\":\"origin/GH-165\",\n                \"aheadBehind\":{\n                   \"ahead\":0,\n                   \"behind\":0\n                },\n                \"changes\":[\n                   {\n                      \"uri\":\"bar.foo\",\n                      \"status\":0,\n                      \"staged\":false\n                   }\n                ],\n                \"currentHead\":\"a274d43dbfba5d1ff9d52db42dc90c6f03071656\"\n             }\n            ");
                            right = JSON.parse("\n            {\n                \"exists\":true,\n                \"branch\":\"GH-165\",\n                \"upstreamBranch\":\"origin/GH-165\",\n                \"aheadBehind\":{\n                   \"ahead\":0,\n                   \"behind\":0\n                },\n                \"changes\":[\n                   {\n                      \"uri\":\"bar.foo\",\n                      \"status\":0,\n                      \"staged\":true\n                   }\n                ],\n                \"currentHead\":\"a274d43dbfba5d1ff9d52db42dc90c6f03071656\"\n             }\n            ");
                            chai_1.expect(model_1.WorkingDirectoryStatus.equals(left, right)).to.be.false;
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('show', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var repository, git;
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, localUri;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, test_helper_1.createTestRepository(track.mkdirSync('status-test'))];
                                case 1:
                                    root = _a.sent();
                                    localUri = file_uri_1.FileUri.create(root).toString();
                                    repository = { localUri: localUri };
                                    return [4 /*yield*/, createGit(root)];
                                case 2:
                                    git = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('modified in working directory', function () { return __awaiter(_this, void 0, void 0, function () {
                        var repositoryPath, content;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    repositoryPath = file_uri_1.FileUri.fsPath(repository.localUri);
                                    fs.writeFileSync(path.join(repositoryPath, 'A.txt'), 'new content');
                                    chai_1.expect(fs.readFileSync(path.join(repositoryPath, 'A.txt'), { encoding: 'utf8' })).to.be.equal('new content');
                                    return [4 /*yield*/, git.show(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'A.txt')).toString(), { commitish: 'HEAD' })];
                                case 1:
                                    content = _a.sent();
                                    chai_1.expect(content).to.be.equal('A');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('modified in working directory (nested)', function () { return __awaiter(_this, void 0, void 0, function () {
                        var repositoryPath, content;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    repositoryPath = file_uri_1.FileUri.fsPath(repository.localUri);
                                    fs.writeFileSync(path.join(repositoryPath, 'folder', 'C.txt'), 'new content');
                                    chai_1.expect(fs.readFileSync(path.join(repositoryPath, 'folder', 'C.txt'), { encoding: 'utf8' })).to.be.equal('new content');
                                    return [4 /*yield*/, git.show(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'folder', 'C.txt')).toString(), { commitish: 'HEAD' })];
                                case 1:
                                    content = _a.sent();
                                    chai_1.expect(content).to.be.equal('C');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('modified in index', function () { return __awaiter(_this, void 0, void 0, function () {
                        var repositoryPath, content;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    repositoryPath = file_uri_1.FileUri.fsPath(repository.localUri);
                                    fs.writeFileSync(path.join(repositoryPath, 'A.txt'), 'new content');
                                    chai_1.expect(fs.readFileSync(path.join(repositoryPath, 'A.txt'), { encoding: 'utf8' })).to.be.equal('new content');
                                    return [4 /*yield*/, git.add(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'A.txt')).toString())];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, git.show(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'A.txt')).toString(), { commitish: 'index' })];
                                case 2:
                                    content = _a.sent();
                                    chai_1.expect(content).to.be.equal('new content');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('modified in index and in working directory', function () { return __awaiter(_this, void 0, void 0, function () {
                        var repositoryPath, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    repositoryPath = file_uri_1.FileUri.fsPath(repository.localUri);
                                    fs.writeFileSync(path.join(repositoryPath, 'A.txt'), 'new content');
                                    chai_1.expect(fs.readFileSync(path.join(repositoryPath, 'A.txt'), { encoding: 'utf8' })).to.be.equal('new content');
                                    return [4 /*yield*/, git.add(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'A.txt')).toString())];
                                case 1:
                                    _c.sent();
                                    _a = chai_1.expect;
                                    return [4 /*yield*/, git.show(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'A.txt')).toString(), { commitish: 'index' })];
                                case 2:
                                    _a.apply(void 0, [_c.sent()]).to.be.equal('new content');
                                    _b = chai_1.expect;
                                    return [4 /*yield*/, git.show(repository, file_uri_1.FileUri.create(path.join(repositoryPath, 'A.txt')).toString(), { commitish: 'HEAD' })];
                                case 3:
                                    _b.apply(void 0, [_c.sent()]).to.be.equal('A');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe('remote', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    it('remotes are not set by default', function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, localUri, git, remotes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    root = track.mkdirSync('remote-with-init');
                                    localUri = file_uri_1.FileUri.create(root).toString();
                                    return [4 /*yield*/, test_helper_1.initRepository(root)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, createGit()];
                                case 2:
                                    git = _a.sent();
                                    return [4 /*yield*/, git.remote({ localUri: localUri })];
                                case 3:
                                    remotes = _a.sent();
                                    chai_1.expect(remotes).to.be.empty;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('origin is the default after a fresh clone', function () { return __awaiter(_this, void 0, void 0, function () {
                        var git, remoteUrl, localUri, options, remotes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createGit()];
                                case 1:
                                    git = _a.sent();
                                    remoteUrl = 'https://github.com/TypeFox/find-git-exec.git';
                                    localUri = file_uri_1.FileUri.create(track.mkdirSync('remote-with-clone')).toString();
                                    options = { localUri: localUri };
                                    return [4 /*yield*/, git.clone(remoteUrl, options)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, git.remote({ localUri: localUri })];
                                case 3:
                                    remotes = _a.sent();
                                    chai_1.expect(remotes).to.be.lengthOf(1);
                                    chai_1.expect(remotes.shift()).to.be.equal('origin');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('remotes can be added and queried', function () { return __awaiter(_this, void 0, void 0, function () {
                        var root, localUri, git, remotes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    root = track.mkdirSync('remote-with-init');
                                    localUri = file_uri_1.FileUri.create(root).toString();
                                    return [4 /*yield*/, test_helper_1.initRepository(root)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, git_1.git(['remote', 'add', 'first', 'some/location'], root, 'addRemote')];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, git_1.git(['remote', 'add', 'second', 'some/location'], root, 'addRemote')];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, createGit()];
                                case 4:
                                    git = _a.sent();
                                    return [4 /*yield*/, git.remote({ localUri: localUri })];
                                case 5:
                                    remotes = _a.sent();
                                    chai_1.expect(remotes).to.be.deep.equal(['first', 'second']);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
});
function createGit(fsRoot) {
    if (fsRoot === void 0) { fsRoot = ''; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new dugite_git_1.DugiteGit()];
        });
    });
}
function createWorkspace(fsRoot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    getRoot: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, file_uri_1.FileUri.create(fsRoot).toString()];
                            });
                        });
                    },
                    setRoot: function (uri) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/];
                            });
                        });
                    }
                }];
        });
    });
}
//# sourceMappingURL=dugite-git.spec.js.map