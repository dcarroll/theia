"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/workspace/lib/browser");
var shell_terminal_protocol_1 = require("../common/shell-terminal-protocol");
var terminal_protocol_1 = require("../common/terminal-protocol");
var terminal_watcher_1 = require("../common/terminal-watcher");
var Xterm = require("xterm");
require("xterm/lib/addons/fit/fit");
require("xterm/lib/addons/attach/attach");
exports.TERMINAL_WIDGET_FACTORY_ID = 'terminal';
exports.TerminalWidgetOptions = Symbol("TerminalWidgetOptions");
var TerminalWidget = /** @class */ (function (_super) {
    __extends(TerminalWidget, _super);
    function TerminalWidget(workspaceService, webSocketConnectionProvider, options, shellTerminalServer, terminalWatcher, logger) {
        var _this = _super.call(this) || this;
        _this.workspaceService = workspaceService;
        _this.webSocketConnectionProvider = webSocketConnectionProvider;
        _this.shellTerminalServer = shellTerminalServer;
        _this.terminalWatcher = terminalWatcher;
        _this.logger = logger;
        _this.cols = 80;
        _this.rows = 40;
        _this.endpoint = new browser_1.Endpoint(options.endpoint);
        _this.id = options.id;
        _this.title.caption = options.caption;
        _this.title.label = options.label;
        _this.title.iconClass = "fa fa-terminal";
        if (options.destroyTermOnClose === true) {
            _this.toDispose.push(common_1.Disposable.create(function () {
                return _this.term.destroy();
            }));
        }
        _this.title.closable = true;
        _this.addClass("terminal-container");
        /* Read CSS properties from the page and apply them to the terminal.  */
        var cssProps = _this.getCSSPropertiesFromPage();
        _this.term = new Xterm.Terminal({
            cursorBlink: true,
            fontFamily: cssProps.fontFamily,
            fontSize: cssProps.fontSize,
            theme: {
                foreground: cssProps.foreground,
                background: cssProps.background,
            },
        });
        _this.term.open(_this.node);
        _this.term.on('title', function (title) {
            _this.title.label = title;
        });
        return _this;
    }
    /* Get the font family and size from the CSS custom properties defined in
       the root element.  */
    TerminalWidget.prototype.getCSSPropertiesFromPage = function () {
        /* Helper to look up a CSS property value and throw an error if it's
           not defined.  */
        function lookup(props, name) {
            /* There is sometimes an extra space in the front, remove it.  */
            var value = htmlElementProps.getPropertyValue(name).trim();
            if (!value) {
                throw new Error("Couldn't find value of " + name);
            }
            return value;
        }
        /* Get the CSS properties of <html> (aka :root in css).  */
        var htmlElementProps = getComputedStyle(document.documentElement);
        var fontFamily = lookup(htmlElementProps, '--theia-code-font-family');
        var fontSizeStr = lookup(htmlElementProps, '--theia-code-font-size');
        var foreground = lookup(htmlElementProps, '--theia-ui-font-color0');
        var background = lookup(htmlElementProps, '--theia-layout-color3');
        /* The font size is returned as a string, such as ' 13px').  We want to
           return just the number of px.  */
        var fontSizeMatch = fontSizeStr.trim().match(/^(\d+)px$/);
        if (!fontSizeMatch) {
            throw new Error("Unexpected format for --theia-code-font-size (" + fontSizeStr + ")");
        }
        var fontSize = Number.parseInt(fontSizeMatch[1]);
        /* xterm.js expects #XXX of #XXXXXX for colors.  */
        var colorRe = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (!foreground.match(colorRe)) {
            throw new Error("Unexpected format for --theia-ui-font-color0 (" + foreground + ")");
        }
        if (!background.match(colorRe)) {
            throw new Error("Unexpected format for --theia-layout-color3 (" + background + ")");
        }
        return {
            fontSize: fontSize,
            fontFamily: fontFamily,
            foreground: foreground,
            background: background,
        };
    };
    TerminalWidget.prototype.registerResize = function () {
        var _this = this;
        var initialGeometry = this.term.proposeGeometry();
        this.cols = initialGeometry.cols;
        this.rows = initialGeometry.rows;
        this.term.on('resize', function (size) {
            if (_this.terminalId === undefined) {
                return;
            }
            if (!size) {
                return;
            }
            _this.cols = size.cols;
            _this.rows = size.rows;
            _this.shellTerminalServer.resize(_this.terminalId, _this.cols, _this.rows);
        });
        this.term.fit();
    };
    /**
     * Create a new shell terminal in the back-end and attach it to a
     * new terminal widget.
     * If id is provided attach to the terminal for this id.
     */
    TerminalWidget.prototype.start = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var root, rootURI, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.registerResize();
                        if (!(id === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.workspaceService.root];
                    case 1:
                        root = _c.sent();
                        rootURI = root !== undefined ? root.uri : undefined;
                        _a = this;
                        return [4 /*yield*/, this.shellTerminalServer.create({ rootURI: rootURI, cols: this.cols, rows: this.rows })];
                    case 2:
                        _a.terminalId = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this;
                        return [4 /*yield*/, this.shellTerminalServer.attach(id)];
                    case 4:
                        _b.terminalId = _c.sent();
                        _c.label = 5;
                    case 5:
                        /* An error has occurred in the backend.  */
                        if (this.terminalId === -1 || this.terminalId === undefined) {
                            this.terminalId = undefined;
                            if (id === undefined) {
                                this.logger.error("Error creating terminal widget, see the backend error log for more information.  ");
                            }
                            else {
                                this.logger.error("Error attaching to terminal id " + id + ", see the backend error log for more information.  ");
                            }
                            return [2 /*return*/];
                        }
                        this.connectSocket(this.terminalId);
                        this.monitorTerminal(this.terminalId);
                        return [2 /*return*/];
                }
            });
        });
    };
    TerminalWidget.prototype.createWebSocket = function (pid) {
        var url = this.endpoint.getWebSocketUrl().resolve(pid);
        return this.webSocketConnectionProvider.createWebSocket(url.toString(), { reconnecting: false });
    };
    TerminalWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.term.focus();
    };
    TerminalWidget.prototype.onResize = function (msg) {
        var _this = this;
        _super.prototype.onResize.call(this, msg);
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            _this.doResize();
        }, 500);
    };
    TerminalWidget.prototype.monitorTerminal = function (id) {
        var _this = this;
        this.toDispose.push(this.terminalWatcher.onTerminalError(function (event) {
            if (event.terminalId === id) {
                _this.title.label = "<terminal error>";
            }
        }));
        this.toDispose.push(this.terminalWatcher.onTerminalExit(function (event) {
            if (event.terminalId === id) {
                _this.title.label = "<terminated>";
            }
        }));
    };
    TerminalWidget.prototype.connectSocket = function (id) {
        var _this = this;
        var socket = this.createWebSocket(id.toString());
        socket.onopen = function () {
            _this.term.attach(socket);
            _this.term._initialized = true;
        };
        socket.onclose = function () {
            _this.title.label = "<terminated>";
        };
        socket.onerror = function (err) {
            console.error(err);
        };
        this.toDispose.push(common_1.Disposable.create(function () {
            return socket.close();
        }));
    };
    TerminalWidget.prototype.doResize = function () {
        var geo = this.term.proposeGeometry();
        this.cols = geo.cols;
        this.rows = geo.rows - 1; // subtract one row for margin
        this.term.resize(this.cols, this.rows);
    };
    TerminalWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.WorkspaceService)),
        __param(1, inversify_1.inject(browser_1.WebSocketConnectionProvider)),
        __param(2, inversify_1.inject(exports.TerminalWidgetOptions)),
        __param(3, inversify_1.inject(shell_terminal_protocol_1.IShellTerminalServer)),
        __param(4, inversify_1.inject(terminal_watcher_1.TerminalWatcher)),
        __param(5, inversify_1.inject(common_1.ILogger)),
        __metadata("design:paramtypes", [browser_2.WorkspaceService,
            browser_1.WebSocketConnectionProvider, Object, Object, terminal_watcher_1.TerminalWatcher, Object])
    ], TerminalWidget);
    return TerminalWidget;
}(browser_1.BaseWidget));
exports.TerminalWidget = TerminalWidget;
//# sourceMappingURL=terminal-widget.js.map