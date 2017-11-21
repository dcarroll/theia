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
var SymbolKind = monaco.modes.SymbolKind;
var browser_1 = require("@theia/editor/lib/browser");
var DocumentSymbolProviderRegistry = monaco.modes.DocumentSymbolProviderRegistry;
var CancellationTokenSource = monaco.cancellation.CancellationTokenSource;
var core_1 = require("@theia/core");
var outline_view_service_1 = require("@theia/outline-view/lib/browser/outline-view-service");
var outline_view_widget_1 = require("@theia/outline-view/lib/browser/outline-view-widget");
var uri_1 = require("@theia/core/lib/common/uri");
var monaco_editor_1 = require("./monaco-editor");
var MonacoOutlineContribution = /** @class */ (function () {
    function MonacoOutlineContribution(outlineViewService, editorManager) {
        this.outlineViewService = outlineViewService;
        this.editorManager = editorManager;
        this.ids = [];
        this.symbolList = [];
        this.toDispose = new core_1.DisposableCollection();
    }
    MonacoOutlineContribution.prototype.onStart = function (app) {
        var _this = this;
        this.outlineViewService.onDidChangeOpenState(function (isOpen) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.updateOutline();
                return [2 /*return*/];
            });
        }); });
        // let's skip the initial current Editor change event, as on reload it comes before the language sevrers have started,
        // resulting in an empty outline.
        setTimeout(function () {
            _this.editorManager.onCurrentEditorChanged(function (editor) { return __awaiter(_this, void 0, void 0, function () {
                var visibleEditor;
                return __generator(this, function (_a) {
                    visibleEditor = editor || this.editorManager.editors.filter(function (e) { return e.isVisible; })[0];
                    this.updateOutlineForEditor(visibleEditor);
                    return [2 /*return*/];
                });
            }); });
        }, 3000);
        DocumentSymbolProviderRegistry.onDidChange(function (event) {
            _this.updateOutline();
        });
        this.outlineViewService.onDidSelect(function (node) { return __awaiter(_this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(MonacoOutlineSymbolInformationNode.is(node) && node.parent)) return [3 /*break*/, 3];
                        widget = this.editorManager.editors.find(function (editor) { return editor.editor.uri.toString() === node.uri; });
                        if (!!widget) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.editorManager.open(new uri_1.default(node.uri))];
                    case 1:
                        widget = _a.sent();
                        _a.label = 2;
                    case 2:
                        widget.editor.selection = node.range;
                        widget.editor.revealRange(node.range);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.outlineViewService.onDidOpen(function (node) {
            if (MonacoOutlineSymbolInformationNode.is(node)) {
                _this.editorManager.open(new uri_1.default(node.uri), {
                    selection: {
                        start: node.range.start
                    }
                });
            }
        });
    };
    MonacoOutlineContribution.prototype.updateOutline = function () {
        var editor = this.editorManager.currentEditor;
        if (editor) {
            this.updateOutlineForEditor(editor);
        }
    };
    MonacoOutlineContribution.prototype.updateOutlineForEditor = function (editor) {
        return __awaiter(this, void 0, void 0, function () {
            var model, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.outlineViewService.open) return [3 /*break*/, 4];
                        if (!editor) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getModel(editor)];
                    case 1:
                        model = _b.sent();
                        _a = this.publish;
                        return [4 /*yield*/, this.computeSymbolInformations(model)];
                    case 2:
                        _a.apply(this, [_b.sent()]);
                        return [3 /*break*/, 4];
                    case 3:
                        this.publish([]);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MonacoOutlineContribution.prototype.getModel = function (editor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var monacoEditor, model;
            return __generator(this, function (_a) {
                monacoEditor = monaco_editor_1.get(editor);
                model = monacoEditor.getControl().getModel();
                this.toDispose.dispose();
                this.toDispose.push(model.onDidChangeContent(function (ev) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.publish;
                                return [4 /*yield*/, this.computeSymbolInformations(model)];
                            case 1:
                                _a.apply(this, [_b.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); }));
                return [2 /*return*/, model];
            });
        });
    };
    MonacoOutlineContribution.prototype.computeSymbolInformations = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, documentSymbolProviders, token, documentSymbolProviders_1, documentSymbolProviders_1_1, documentSymbolProvider, symbolInformation, e_1_1, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        entries = [];
                        return [4 /*yield*/, DocumentSymbolProviderRegistry.all(model)];
                    case 1:
                        documentSymbolProviders = _b.sent();
                        if (this.cancellationSource) {
                            this.cancellationSource.cancel();
                        }
                        this.cancellationSource = new CancellationTokenSource();
                        token = this.cancellationSource.token;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        documentSymbolProviders_1 = __values(documentSymbolProviders), documentSymbolProviders_1_1 = documentSymbolProviders_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!documentSymbolProviders_1_1.done) return [3 /*break*/, 6];
                        documentSymbolProvider = documentSymbolProviders_1_1.value;
                        return [4 /*yield*/, documentSymbolProvider.provideDocumentSymbols(model, token)];
                    case 4:
                        symbolInformation = _b.sent();
                        if (token.isCancellationRequested) {
                            return [2 /*return*/, []];
                        }
                        entries.push.apply(entries, __spread(symbolInformation));
                        _b.label = 5;
                    case 5:
                        documentSymbolProviders_1_1 = documentSymbolProviders_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (documentSymbolProviders_1_1 && !documentSymbolProviders_1_1.done && (_a = documentSymbolProviders_1.return)) _a.call(documentSymbolProviders_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, entries];
                }
            });
        });
    };
    MonacoOutlineContribution.prototype.publish = function (entries) {
        var outlineSymbolInformations = [];
        this.ids = [];
        this.symbolList = [];
        outlineSymbolInformations = this.createTree(undefined, entries.sort(this.orderByPosition));
        this.outlineViewService.publish(outlineSymbolInformations);
    };
    MonacoOutlineContribution.prototype.getRangeFromSymbolInformation = function (symbolInformation) {
        return {
            end: {
                character: symbolInformation.location.range.endColumn - 1,
                line: symbolInformation.location.range.endLineNumber - 1
            },
            start: {
                character: symbolInformation.location.range.startColumn - 1,
                line: symbolInformation.location.range.startLineNumber - 1
            }
        };
    };
    MonacoOutlineContribution.prototype.getId = function (name, counter) {
        var uniqueId = name + counter;
        if (this.ids.find(function (id) { return id === uniqueId; })) {
            uniqueId = this.getId(name, ++counter);
        }
        return uniqueId;
    };
    MonacoOutlineContribution.prototype.convertToNode = function (symbol, parent) {
        var id = this.getId(symbol.name, 0);
        this.ids.push(id);
        var node = {
            children: [],
            id: id,
            iconClass: SymbolKind[symbol.kind].toString().toLowerCase(),
            name: symbol.name,
            parent: parent ? parent.node : undefined,
            uri: symbol.location.uri.toString(),
            range: this.getRangeFromSymbolInformation(symbol),
            selected: false,
            expanded: this.shouldExpand(symbol)
        };
        var symbolAndNode = { node: node, symbol: symbol };
        this.symbolList.push(symbolAndNode);
        return symbolAndNode;
    };
    MonacoOutlineContribution.prototype.shouldExpand = function (symbol) {
        return [SymbolKind.Class,
            SymbolKind.Enum, SymbolKind.File,
            SymbolKind.Interface, SymbolKind.Module,
            SymbolKind.Namespace, SymbolKind.Object,
            SymbolKind.Package, SymbolKind.Struct].indexOf(symbol.kind) !== -1;
    };
    MonacoOutlineContribution.prototype.orderByPosition = function (symbol1, symbol2) {
        var startLineComparison = symbol1.location.range.startLineNumber - symbol2.location.range.startLineNumber;
        if (startLineComparison !== 0) {
            return startLineComparison;
        }
        var startOffsetComparison = symbol1.location.range.startColumn - symbol2.location.range.startColumn;
        if (startOffsetComparison !== 0) {
            return startOffsetComparison;
        }
        var endLineComparison = symbol1.location.range.endLineNumber - symbol2.location.range.endLineNumber;
        if (endLineComparison !== 0) {
            return endLineComparison;
        }
        return symbol1.location.range.endColumn - symbol2.location.range.endColumn;
    };
    MonacoOutlineContribution.prototype.createTree = function (parentNode, symbolInformationList) {
        var _this = this;
        var childNodes = symbolInformationList
            .filter(function (sym) {
            if (parentNode) {
                var symRange = _this.getRangeFromSymbolInformation(sym);
                var nodeRange = _this.getRangeFromSymbolInformation(parentNode.symbol);
                var nodeIsContainer = sym.containerName === parentNode.symbol.name;
                var sameStartLine = symRange.start.line === nodeRange.start.line;
                var startColGreaterOrEqual = symRange.start.character >= nodeRange.start.character;
                var startLineGreater = symRange.start.line > nodeRange.start.line;
                var sameEndLine = symRange.end.line === nodeRange.end.line;
                var endColSmallerOrEqual = symRange.end.character <= nodeRange.end.character;
                var endLineSmaller = symRange.end.line < nodeRange.end.line;
                return nodeIsContainer &&
                    ((sameStartLine && startColGreaterOrEqual) || (startLineGreater)) &&
                    ((sameEndLine && endColSmallerOrEqual) || (endLineSmaller));
            }
            else {
                return !sym.containerName;
            }
        })
            .map(function (sym) { return _this.convertToNode(sym, parentNode); });
        childNodes.forEach(function (childNode) {
            return childNode.node.children = _this.createTree(childNode, symbolInformationList.filter(function (s) { return childNode.symbol !== s; }));
        });
        return childNodes.map(function (n) { return n.node; });
    };
    MonacoOutlineContribution.prototype.getSymbolInformationByNode = function (node) {
        var nodeAndSymbol = this.symbolList.find(function (s) { return s.node.id === node.id; });
        if (nodeAndSymbol) {
            return nodeAndSymbol.symbol;
        }
        return undefined;
    };
    MonacoOutlineContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(outline_view_service_1.OutlineViewService)),
        __param(1, inversify_1.inject(browser_1.EditorManager)),
        __metadata("design:paramtypes", [outline_view_service_1.OutlineViewService, Object])
    ], MonacoOutlineContribution);
    return MonacoOutlineContribution;
}());
exports.MonacoOutlineContribution = MonacoOutlineContribution;
var MonacoOutlineSymbolInformationNode;
(function (MonacoOutlineSymbolInformationNode) {
    function is(node) {
        return outline_view_widget_1.OutlineSymbolInformationNode.is(node) && 'uri' in node && 'range' in node;
    }
    MonacoOutlineSymbolInformationNode.is = is;
})(MonacoOutlineSymbolInformationNode = exports.MonacoOutlineSymbolInformationNode || (exports.MonacoOutlineSymbolInformationNode = {}));
//# sourceMappingURL=monaco-outline-contribution.js.map