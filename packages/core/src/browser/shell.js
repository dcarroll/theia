"use strict";
// Copyright (c) Jupyter Development Team and others
// Distributed under the terms of the Modified BSD License.
/*
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var algorithm_1 = require("@phosphor/algorithm");
var signaling_1 = require("@phosphor/signaling");
var widgets_1 = require("@phosphor/widgets");
var virtualdom_1 = require("@phosphor/virtualdom");
var saveable_1 = require("./saveable");
var context_menu_renderer_1 = require("./context-menu-renderer");
var status_bar_1 = require("./status-bar/status-bar");
exports.ApplicationShellOptions = Symbol("ApplicationShellOptions");
/**
 * The class name added to AppShell instances.
 */
var APPLICATION_SHELL_CLASS = 'theia-ApplicationShell';
/**
 * The class name added to side bar instances.
 */
var SIDEBAR_CLASS = 'theia-SideBar';
/**
 * The class name added to the current widget's title.
 */
var CURRENT_CLASS = 'theia-mod-current';
/**
 * The class name added to the active widget's title.
 */
var ACTIVE_CLASS = 'theia-mod-active';
exports.MAINAREA_TABBAR_CONTEXT_MENU = ['mainarea-tabbar-context-menu'];
exports.DockPanelTabBarRendererFactory = Symbol('DockPanelTabBarRendererFactory');
var DockPanelTabBarRenderer = /** @class */ (function () {
    function DockPanelTabBarRenderer(contextMenuRenderer) {
        this.contextMenuRenderer = contextMenuRenderer;
        this.closeIconSelector = widgets_1.TabBar.defaultRenderer.closeIconSelector;
        this._tabBar = undefined;
    }
    DockPanelTabBarRenderer.prototype.renderTab = function (data) {
        var _this = this;
        var title = data.title;
        var key = widgets_1.TabBar.defaultRenderer.createTabKey(data);
        var style = widgets_1.TabBar.defaultRenderer.createTabStyle(data);
        var className = widgets_1.TabBar.defaultRenderer.createTabClass(data);
        var dataset = widgets_1.TabBar.defaultRenderer.createTabDataset(data);
        return (virtualdom_1.h.li({
            key: key, className: className, title: title.caption, style: style, dataset: dataset,
            oncontextmenu: function (event) { return _this.handleContextMenuEvent(event, title); }
        }, widgets_1.TabBar.defaultRenderer.renderIcon(data), widgets_1.TabBar.defaultRenderer.renderLabel(data), widgets_1.TabBar.defaultRenderer.renderCloseIcon(data)));
    };
    Object.defineProperty(DockPanelTabBarRenderer.prototype, "tabBar", {
        set: function (tabBar) {
            this._tabBar = tabBar;
        },
        enumerable: true,
        configurable: true
    });
    DockPanelTabBarRenderer.prototype.handleContextMenuEvent = function (event, title) {
        event.stopPropagation();
        event.preventDefault();
        if (this._tabBar !== undefined) {
            this._tabBar.currentTitle = title;
            if (title.owner !== null) {
                title.owner.activate();
            }
        }
        this.contextMenuRenderer.render(exports.MAINAREA_TABBAR_CONTEXT_MENU, event);
    };
    DockPanelTabBarRenderer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(context_menu_renderer_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object])
    ], DockPanelTabBarRenderer);
    return DockPanelTabBarRenderer;
}());
exports.DockPanelTabBarRenderer = DockPanelTabBarRenderer;
var DockPanelRenderer = /** @class */ (function () {
    function DockPanelRenderer(tabBarRendererFactory) {
        this.tabBarRendererFactory = tabBarRendererFactory;
    }
    DockPanelRenderer.prototype.createTabBar = function () {
        var renderer = this.tabBarRendererFactory();
        var bar = new widgets_1.TabBar({ renderer: renderer });
        bar.addClass('p-DockPanel-tabBar');
        renderer.tabBar = bar;
        return bar;
    };
    DockPanelRenderer.prototype.createHandle = function () {
        return widgets_1.DockPanel.defaultRenderer.createHandle();
    };
    DockPanelRenderer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.DockPanelTabBarRendererFactory)),
        __metadata("design:paramtypes", [Function])
    ], DockPanelRenderer);
    return DockPanelRenderer;
}());
exports.DockPanelRenderer = DockPanelRenderer;
/**
 * The application shell.
 */
var ApplicationShell = /** @class */ (function (_super) {
    __extends(ApplicationShell, _super);
    /**
     * Construct a new application shell.
     */
    function ApplicationShell(dockPanelRenderer, _statusBar, options) {
        var _this = _super.call(this, options) || this;
        _this._statusBar = _statusBar;
        _this._tracker = new widgets_1.FocusTracker();
        _this._currentChanged = new signaling_1.Signal(_this);
        _this._activeChanged = new signaling_1.Signal(_this);
        _this.addClass(APPLICATION_SHELL_CLASS);
        _this.id = 'main';
        var topPanel = _this._topPanel = new widgets_1.Panel();
        var hboxPanel = _this._hboxPanel = new widgets_1.BoxPanel();
        var dockPanel = _this._dockPanel = new widgets_1.DockPanel({ renderer: dockPanelRenderer });
        var hsplitPanel = _this._hsplitPanel = new widgets_1.SplitPanel();
        var leftHandler = _this._leftHandler = new Private.SideBarHandler('left');
        var rightHandler = _this._rightHandler = new Private.SideBarHandler('right');
        var rootLayout = new widgets_1.BoxLayout();
        topPanel.id = 'theia-top-panel';
        hboxPanel.id = 'theia-main-content-panel';
        dockPanel.id = 'theia-main-dock-panel';
        hsplitPanel.id = 'theia-main-split-panel';
        leftHandler.sideBar.addClass(SIDEBAR_CLASS);
        leftHandler.sideBar.addClass('theia-mod-left');
        leftHandler.stackedPanel.id = 'theia-left-stack';
        rightHandler.sideBar.addClass(SIDEBAR_CLASS);
        rightHandler.sideBar.addClass('theia-mod-right');
        rightHandler.stackedPanel.id = 'theia-right-stack';
        hboxPanel.spacing = 0;
        dockPanel.spacing = 0;
        hsplitPanel.spacing = 0;
        hboxPanel.direction = 'left-to-right';
        hsplitPanel.orientation = 'horizontal';
        widgets_1.SplitPanel.setStretch(leftHandler.stackedPanel, 0);
        widgets_1.SplitPanel.setStretch(dockPanel, 1);
        widgets_1.SplitPanel.setStretch(rightHandler.stackedPanel, 0);
        widgets_1.BoxPanel.setStretch(leftHandler.sideBar, 0);
        widgets_1.BoxPanel.setStretch(hsplitPanel, 1);
        widgets_1.BoxPanel.setStretch(rightHandler.sideBar, 0);
        hsplitPanel.addWidget(leftHandler.stackedPanel);
        hsplitPanel.addWidget(dockPanel);
        hsplitPanel.addWidget(rightHandler.stackedPanel);
        hboxPanel.addWidget(leftHandler.sideBar);
        hboxPanel.addWidget(hsplitPanel);
        hboxPanel.addWidget(rightHandler.sideBar);
        rootLayout.direction = 'top-to-bottom';
        rootLayout.spacing = 0; // TODO make this configurable?
        widgets_1.BoxLayout.setStretch(topPanel, 0);
        widgets_1.BoxLayout.setStretch(hboxPanel, 1);
        widgets_1.BoxLayout.setStretch(_statusBar, 0);
        rootLayout.addWidget(topPanel);
        rootLayout.addWidget(hboxPanel);
        rootLayout.addWidget(_statusBar);
        _this.layout = rootLayout;
        _this._tracker.currentChanged.connect(_this._onCurrentChanged, _this);
        _this._tracker.activeChanged.connect(_this._onActiveChanged, _this);
        return _this;
    }
    ApplicationShell.prototype.getLayoutData = function () {
        return {
            mainArea: __assign({ activeWidgets: this._tracker.activeWidget ? [this._tracker.activeWidget] : [] }, this._dockPanel.saveLayout()),
            leftBar: this._leftHandler.getLayoutData(),
            rightBar: this._rightHandler.getLayoutData(),
            statusBar: this._statusBar.getLayoutData()
        };
    };
    ApplicationShell.prototype.setLayoutData = function (layoutData) {
        if (layoutData) {
            if (layoutData.mainArea) {
                this._dockPanel.restoreLayout(layoutData.mainArea);
                this.registerWithFocusTracker(layoutData.mainArea.main);
                if (layoutData.mainArea.activeWidgets) {
                    try {
                        for (var _a = __values(layoutData.mainArea.activeWidgets), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var activeWidget = _b.value;
                            this.activateMain(activeWidget.id);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            this._leftHandler.setLayoutData(layoutData.leftBar);
            this._rightHandler.setLayoutData(layoutData.rightBar);
            this._statusBar.setLayoutData(layoutData.statusBar);
        }
        var e_1, _c;
    };
    // tslint:disable-next-line:no-any
    ApplicationShell.prototype.registerWithFocusTracker = function (data) {
        if (!data) {
            return;
        }
        if (data.hasOwnProperty("widgets")) {
            try {
                for (var _a = __values(data["widgets"]), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var widget = _b.value;
                    this.track(widget);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else if (data.hasOwnProperty("children")) {
            try {
                for (var _d = __values(data["children"]), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var child = _e.value;
                    this.registerWithFocusTracker(child);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var e_2, _c, e_3, _f;
    };
    Object.defineProperty(ApplicationShell.prototype, "currentChanged", {
        /**
         * A signal emitted when main area's current focus changes.
         */
        get: function () {
            return this._currentChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "activeChanged", {
        /**
         * A signal emitted when main area's active focus changes.
         */
        get: function () {
            return this._activeChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "currentWidget", {
        /**
         * The current widget in the shell's main area.
         */
        get: function () {
            return this._tracker.currentWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "activeWidget", {
        /**
         * The active widget in the shell's main area.
         */
        get: function () {
            return this._tracker.activeWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "leftAreaIsEmpty", {
        /**
         * True if left area is empty.
         */
        get: function () {
            return this._leftHandler.stackedPanel.widgets.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "mainAreaIsEmpty", {
        /**
         * True if main area is empty.
         */
        get: function () {
            return this._dockPanel.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "rightAreaIsEmpty", {
        /**
         * True if right area is empty.
         */
        get: function () {
            return this._rightHandler.stackedPanel.widgets.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationShell.prototype, "topAreaIsEmpty", {
        /**
         * True if top area is empty.
         */
        get: function () {
            return this._topPanel.widgets.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activate a widget in the left area.
     */
    ApplicationShell.prototype.activateLeft = function (id) {
        this._leftHandler.activate(id);
    };
    /**
     * Activate a widget in the main area.
     */
    ApplicationShell.prototype.activateMain = function (id) {
        var dock = this._dockPanel;
        var widget = algorithm_1.find(dock.widgets(), function (value) { return value.id === id; });
        if (widget) {
            dock.activateWidget(widget);
        }
    };
    /*
     * Activate the next Tab in the active TabBar.
     */
    ApplicationShell.prototype.activateNextTab = function () {
        var current = this._currentTabBar();
        if (current) {
            var ci = current.currentIndex;
            if (ci !== -1) {
                if (ci < current.titles.length - 1) {
                    current.currentIndex += 1;
                    if (current.currentTitle) {
                        current.currentTitle.owner.activate();
                    }
                }
                else if (ci === current.titles.length - 1) {
                    var nextBar = this._nextTabBar();
                    if (nextBar) {
                        nextBar.currentIndex = 0;
                        if (nextBar.currentTitle) {
                            nextBar.currentTitle.owner.activate();
                        }
                    }
                }
            }
        }
    };
    /*
     * Activate the previous Tab in the active TabBar.
     */
    ApplicationShell.prototype.activatePreviousTab = function () {
        var current = this._currentTabBar();
        if (current) {
            var ci = current.currentIndex;
            if (ci !== -1) {
                if (ci > 0) {
                    current.currentIndex -= 1;
                    if (current.currentTitle) {
                        current.currentTitle.owner.activate();
                    }
                }
                else if (ci === 0) {
                    var prevBar = this._previousTabBar();
                    if (prevBar) {
                        var len = prevBar.titles.length;
                        prevBar.currentIndex = len - 1;
                        if (prevBar.currentTitle) {
                            prevBar.currentTitle.owner.activate();
                        }
                    }
                }
            }
        }
    };
    /**
     * Activate a widget in the right area.
     */
    ApplicationShell.prototype.activateRight = function (id) {
        this._rightHandler.activate(id);
    };
    /**
     * Add a widget to the left content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    ApplicationShell.prototype.addToLeftArea = function (widget, options) {
        if (options === void 0) { options = {}; }
        if (!widget.id) {
            console.error('widgets added to app shell must have unique id property');
            return;
        }
        var rank = options.rank !== undefined ? options.rank : 100;
        this._leftHandler.addWidget(widget, rank);
    };
    /**
     * Add a widget to the main content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     * All widgets added to the main area should be disposed after removal (or
     * simply disposed in order to remove).
     */
    ApplicationShell.prototype.addToMainArea = function (widget) {
        if (!widget.id) {
            console.error('widgets added to app shell must have unique id property');
            return;
        }
        this._dockPanel.addWidget(widget, { mode: 'tab-after' });
        this.track(widget);
    };
    /**
     * Add a widget to the right content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    ApplicationShell.prototype.addToRightArea = function (widget, options) {
        if (options === void 0) { options = {}; }
        if (!widget.id) {
            console.error('widgets added to app shell must have unique id property');
            return;
        }
        var rank = options.rank !== undefined ? options.rank : 100;
        this._rightHandler.addWidget(widget, rank);
    };
    /**
     * Add a widget to the top content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    ApplicationShell.prototype.addToTopArea = function (widget, options) {
        if (options === void 0) { options = {}; }
        if (!widget.id) {
            console.error('widgets added to app shell must have unique id property');
            return;
        }
        // Temporary: widgets are added to the panel in order of insertion.
        this._topPanel.addWidget(widget);
    };
    /**
     * Collapse the left area.
     */
    ApplicationShell.prototype.collapseLeft = function () {
        this._leftHandler.collapse();
    };
    /**
     * Collapse the right area.
     */
    ApplicationShell.prototype.collapseRight = function () {
        this._rightHandler.collapse();
    };
    /**
     * Close the current tab.
     */
    ApplicationShell.prototype.closeTab = function () {
        var current = this._currentTabBar();
        if (current) {
            var ci = current.currentIndex;
            if (ci !== -1) {
                var title = current.currentTitle;
                if (title !== null) {
                    title.owner.close();
                }
            }
        }
    };
    /**
     * Close the tabs right of the current one.
     */
    ApplicationShell.prototype.closeRightTabs = function () {
        var current = this._currentTabBar();
        if (current) {
            var length_1 = current.titles.length;
            if (length_1 > 0) {
                var ci = current.currentIndex;
                var last = length_1 - 1;
                var next = ci + 1;
                if (ci !== -1 && last > ci) {
                    for (var i = next; i <= last; i++) {
                        current.titles[next].owner.close();
                    }
                }
            }
        }
    };
    /**
     * Close all tabs expect the current one.
     */
    ApplicationShell.prototype.closeOtherTabs = function () {
        var current = this._currentTabBar();
        if (current) {
            var ci = current.currentIndex;
            if (ci !== -1) {
                var titles = current.titles.slice(0);
                for (var i = 0; i < titles.length; i++) {
                    if (i !== ci) {
                        titles[i].owner.close();
                    }
                }
            }
        }
    };
    /**
     * Close all tabs.
     */
    ApplicationShell.prototype.closeAllTabs = function () {
        var current = this._currentTabBar();
        if (current) {
            var length_2 = current.titles.length;
            for (var i = 0; i < length_2; i++) {
                current.titles[0].owner.close();
            }
        }
    };
    /**
     * Test whether the current widget is dirty.
     */
    ApplicationShell.prototype.canSave = function () {
        return saveable_1.Saveable.isDirty(this.currentWidget);
    };
    /**
     * Save the current widget if it is dirty.
     */
    ApplicationShell.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, saveable_1.Saveable.save(this.currentWidget)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test whether there is a dirty widget.
     */
    ApplicationShell.prototype.canSaveAll = function () {
        return this._tracker.widgets.some(saveable_1.Saveable.isDirty);
    };
    /**
     * Save all dirty widgets.
     */
    ApplicationShell.prototype.saveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this._tracker.widgets.map(saveable_1.Saveable.save))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Close all widgets in the main area.
     */
    ApplicationShell.prototype.closeAll = function () {
        algorithm_1.each(algorithm_1.toArray(this._dockPanel.widgets()), function (widget) {
            widget.close();
        });
    };
    /**
     * Checks to see if a tab is currently selected
     */
    ApplicationShell.prototype.hasSelectedTab = function () {
        var current = this._currentTabBar();
        if (current) {
            return current.currentIndex !== -1;
        }
        else {
            return false;
        }
    };
    /*
     * Return the TabBar that has the currently active Widget or undefined.
     */
    ApplicationShell.prototype._currentTabBar = function () {
        var current = this._tracker.currentWidget;
        if (current) {
            var title_1 = current.title;
            var tabBar = algorithm_1.find(this._dockPanel.tabBars(), function (bar) {
                return algorithm_1.ArrayExt.firstIndexOf(bar.titles, title_1) > -1;
            });
            return tabBar;
        }
        return undefined;
    };
    /*
     * Return the TabBar previous to the current TabBar (see above) or undefined.
     */
    ApplicationShell.prototype._previousTabBar = function () {
        var current = this._currentTabBar();
        if (current) {
            var bars = algorithm_1.toArray(this._dockPanel.tabBars());
            var len = bars.length;
            var ci = algorithm_1.ArrayExt.firstIndexOf(bars, current);
            var prevBar = null;
            if (ci > 0) {
                prevBar = bars[ci - 1];
            }
            else if (ci === 0) {
                prevBar = bars[len - 1];
            }
            return prevBar;
        }
        return null;
    };
    /*
     * Return the TabBar next to the current TabBar (see above) or undefined.
     */
    ApplicationShell.prototype._nextTabBar = function () {
        var current = this._currentTabBar();
        if (current) {
            var bars = algorithm_1.toArray(this._dockPanel.tabBars());
            var len = bars.length;
            var ci = algorithm_1.ArrayExt.firstIndexOf(bars, current);
            var nextBar = null;
            if (ci < (len - 1)) {
                nextBar = bars[ci + 1];
            }
            else if (ci === len - 1) {
                nextBar = bars[0];
            }
            return nextBar;
        }
        return null;
    };
    /**
     * Handle a change to the dock area current widget.
     */
    ApplicationShell.prototype._onCurrentChanged = function (sender, args) {
        if (args.newValue) {
            args.newValue.title.className += " " + CURRENT_CLASS;
        }
        if (args.oldValue) {
            args.oldValue.title.className = (args.oldValue.title.className.replace(CURRENT_CLASS, ''));
        }
        this._currentChanged.emit(args);
    };
    /**
     * Handle a change to the dock area active widget.
     */
    ApplicationShell.prototype._onActiveChanged = function (sender, args) {
        if (args.newValue) {
            args.newValue.title.className += " " + ACTIVE_CLASS;
        }
        if (args.oldValue) {
            args.oldValue.title.className = (args.oldValue.title.className.replace(ACTIVE_CLASS, ''));
        }
        this._activeChanged.emit(args);
    };
    ApplicationShell.prototype.track = function (widget) {
        this._tracker.add(widget);
        saveable_1.Saveable.apply(widget);
    };
    ApplicationShell = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(DockPanelRenderer)),
        __param(1, inversify_1.inject(status_bar_1.StatusBarImpl)),
        __param(2, inversify_1.inject(exports.ApplicationShellOptions)), __param(2, inversify_1.optional()),
        __metadata("design:paramtypes", [DockPanelRenderer,
            status_bar_1.StatusBarImpl, Object])
    ], ApplicationShell);
    return ApplicationShell;
}(widgets_1.Widget));
exports.ApplicationShell = ApplicationShell;
var Private;
(function (Private) {
    /**
     * A less-than comparison function for side bar rank items.
     */
    function itemCmp(first, second) {
        return first.rank - second.rank;
    }
    Private.itemCmp = itemCmp;
    /**
     * A class which manages a side bar and related stacked panel.
     */
    var SideBarHandler = /** @class */ (function () {
        /**
         * Construct a new side bar handler.
         */
        function SideBarHandler(side) {
            this._items = new Array();
            this._side = side;
            this._sideBar = new widgets_1.TabBar({
                insertBehavior: 'none',
                removeBehavior: 'none',
                allowDeselect: true
            });
            this._stackedPanel = new widgets_1.StackedPanel();
            this._sideBar.hide();
            this._stackedPanel.hide();
            this._sideBar.currentChanged.connect(this._onCurrentChanged, this);
            this._sideBar.tabActivateRequested.connect(this._onTabActivateRequested, this);
            this._stackedPanel.widgetRemoved.connect(this._onWidgetRemoved, this);
        }
        SideBarHandler.prototype.getLayoutData = function () {
            var currentActive = this._findWidgetByTitle(this._sideBar.currentTitle) || undefined;
            return {
                activeWidgets: currentActive ? [currentActive] : [],
                widgets: this.stackedPanel.widgets
            };
        };
        SideBarHandler.prototype.setLayoutData = function (layoutData) {
            if (layoutData) {
                this.collapse();
                if (layoutData.widgets) {
                    var index = 0;
                    try {
                        for (var _a = __values(layoutData.widgets), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var widget = _b.value;
                            if (widget) {
                                this.addWidget(widget, index++);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                if (layoutData.activeWidgets) {
                    try {
                        for (var _d = __values(layoutData.activeWidgets), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var widget = _e.value;
                            this.activate(widget.id);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            var e_4, _c, e_5, _f;
        };
        Object.defineProperty(SideBarHandler.prototype, "sideBar", {
            /**
             * Get the tab bar managed by the handler.
             */
            get: function () {
                return this._sideBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SideBarHandler.prototype, "stackedPanel", {
            /**
             * Get the stacked panel managed by the handler
             */
            get: function () {
                return this._stackedPanel;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Activate a widget residing in the side bar by ID.
         *
         * @param id - The widget's unique ID.
         */
        SideBarHandler.prototype.activate = function (id) {
            var widget = this._findWidgetByID(id);
            if (widget) {
                this._sideBar.currentTitle = widget.title;
                widget.activate();
            }
        };
        /**
         * Collapse the sidebar so no items are expanded.
         */
        SideBarHandler.prototype.collapse = function () {
            this._sideBar.currentTitle = null;
        };
        /**
         * Add a widget and its title to the stacked panel and side bar.
         *
         * If the widget is already added, it will be moved.
         */
        SideBarHandler.prototype.addWidget = function (widget, rank) {
            widget.parent = null;
            widget.hide();
            var item = { widget: widget, rank: rank };
            var index = this._findInsertIndex(item);
            algorithm_1.ArrayExt.insert(this._items, index, item);
            this._stackedPanel.insertWidget(index, widget);
            this._sideBar.insertTab(index, widget.title);
            this._refreshVisibility();
        };
        /**
         * Find the insertion index for a rank item.
         */
        SideBarHandler.prototype._findInsertIndex = function (item) {
            return algorithm_1.ArrayExt.upperBound(this._items, item, Private.itemCmp);
        };
        /**
         * Find the index of the item with the given widget, or `-1`.
         */
        SideBarHandler.prototype._findWidgetIndex = function (widget) {
            return algorithm_1.ArrayExt.findFirstIndex(this._items, function (item) { return item.widget === widget; });
        };
        /**
         * Find the widget which owns the given title, or `null`.
         */
        SideBarHandler.prototype._findWidgetByTitle = function (title) {
            var item = algorithm_1.find(this._items, function (value) { return value.widget.title === title; });
            return item ? item.widget : null;
        };
        /**
         * Find the widget with the given id, or `null`.
         */
        SideBarHandler.prototype._findWidgetByID = function (id) {
            var item = algorithm_1.find(this._items, function (value) { return value.widget.id === id; });
            return item ? item.widget : null;
        };
        /**
         * Refresh the visibility of the side bar and stacked panel.
         */
        SideBarHandler.prototype._refreshVisibility = function () {
            this._sideBar.setHidden(this._sideBar.titles.length === 0);
            this._stackedPanel.setHidden(this._sideBar.currentTitle === null);
        };
        /**
         * Handle the `currentChanged` signal from the sidebar.
         */
        SideBarHandler.prototype._onCurrentChanged = function (sender, args) {
            var oldWidget = this._findWidgetByTitle(args.previousTitle);
            var newWidget = this._findWidgetByTitle(args.currentTitle);
            if (oldWidget) {
                oldWidget.hide();
            }
            if (newWidget) {
                newWidget.show();
            }
            if (newWidget) {
                document.body.setAttribute("data-" + this._side + "Area", newWidget.id);
            }
            else {
                document.body.removeAttribute("data-" + this._side + "Area");
            }
            this._refreshVisibility();
        };
        /**
         * Handle a `tabActivateRequest` signal from the sidebar.
         */
        SideBarHandler.prototype._onTabActivateRequested = function (sender, args) {
            args.title.owner.activate();
        };
        /*
         * Handle the `widgetRemoved` signal from the stacked panel.
         */
        SideBarHandler.prototype._onWidgetRemoved = function (sender, widget) {
            algorithm_1.ArrayExt.removeAt(this._items, this._findWidgetIndex(widget));
            this._sideBar.removeTab(widget.title);
            this._refreshVisibility();
        };
        return SideBarHandler;
    }());
    Private.SideBarHandler = SideBarHandler;
})(Private || (Private = {}));
//# sourceMappingURL=shell.js.map