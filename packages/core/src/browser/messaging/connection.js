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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var common_1 = require("../../common");
var endpoint_1 = require("../endpoint");
var ReconnectingWebSocket = require('reconnecting-websocket');
var WebSocketConnectionProvider = /** @class */ (function () {
    function WebSocketConnectionProvider() {
    }
    WebSocketConnectionProvider_1 = WebSocketConnectionProvider;
    WebSocketConnectionProvider.createProxy = function (container, path, target) {
        return container.get(WebSocketConnectionProvider_1).createProxy(path, target);
    };
    /**
     * Create a proxy object to remote interface of T type
     * over a web socket connection for the given path.
     *
     * An optional target can be provided to handle
     * notifications and requests from a remote side.
     */
    WebSocketConnectionProvider.prototype.createProxy = function (path, target, options) {
        var factory = new common_1.JsonRpcProxyFactory(target);
        this.listen({
            path: path,
            onConnection: function (c) { return factory.listen(c); }
        }, options);
        return factory.createProxy();
    };
    /**
     * Install a connection handler for the given path.
     */
    WebSocketConnectionProvider.prototype.listen = function (handler, options) {
        var url = this.createWebSocketUrl(handler.path);
        var webSocket = this.createWebSocket(url, options);
        var logger = this.createLogger();
        webSocket.onerror = function (error) {
            logger.error('' + error);
            return;
        };
        vscode_ws_jsonrpc_1.listen({
            webSocket: webSocket,
            onConnection: handler.onConnection.bind(handler),
            logger: logger
        });
    };
    WebSocketConnectionProvider.prototype.createLogger = function () {
        return new vscode_ws_jsonrpc_1.ConsoleLogger();
    };
    /**
     * Creates a websocket URL to the current location
     */
    WebSocketConnectionProvider.prototype.createWebSocketUrl = function (path) {
        var endpoint = new endpoint_1.Endpoint({ path: path });
        return endpoint.getWebSocketUrl().toString();
    };
    /**
     * Creates a web socket for the given url
     */
    WebSocketConnectionProvider.prototype.createWebSocket = function (url, options) {
        if (options === undefined || options.reconnecting) {
            var socketOptions = {
                maxReconnectionDelay: 10000,
                minReconnectionDelay: 1000,
                reconnectionDelayGrowFactor: 1.3,
                connectionTimeout: 10000,
                maxRetries: Infinity,
                debug: false
            };
            return new ReconnectingWebSocket(url, undefined, socketOptions);
        }
        return new WebSocket(url);
    };
    WebSocketConnectionProvider = WebSocketConnectionProvider_1 = __decorate([
        inversify_1.injectable()
    ], WebSocketConnectionProvider);
    return WebSocketConnectionProvider;
    var WebSocketConnectionProvider_1;
}());
exports.WebSocketConnectionProvider = WebSocketConnectionProvider;
//# sourceMappingURL=connection.js.map