"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ws = require("ws");
var url = require("url");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var logger_1 = require("./logger");
function createServerWebSocketConnection(options, onConnect) {
    openJsonRpcSocket(options, function (socket) {
        var logger = new logger_1.ConsoleLogger();
        var connection = vscode_ws_jsonrpc_1.createWebSocketConnection(socket, logger);
        onConnect(connection);
    });
}
exports.createServerWebSocketConnection = createServerWebSocketConnection;
function openJsonRpcSocket(options, onOpen) {
    openSocket(options, function (socket) {
        var webSocket = toIWebSocket(socket);
        onOpen(webSocket);
    });
}
exports.openJsonRpcSocket = openJsonRpcSocket;
function openSocket(options, onOpen) {
    var wss = new ws.Server({
        noServer: true,
        perMessageDeflate: false
    });
    options.server.on('upgrade', function (request, socket, head) {
        var pathname = request.url ? url.parse(request.url).pathname : undefined;
        if (options.path && pathname === options.path || options.matches && options.matches(request)) {
            wss.handleUpgrade(request, socket, head, function (webSocket) {
                if (webSocket.readyState === webSocket.OPEN) {
                    onOpen(webSocket, request, socket, head);
                }
                else {
                    webSocket.on('open', function () { return onOpen(webSocket, request, socket, head); });
                }
            });
        }
    });
}
exports.openSocket = openSocket;
function toIWebSocket(webSocket) {
    return {
        send: function (content) { return webSocket.send(content, function (error) {
            if (error) {
                console.log(error);
            }
        }); },
        onMessage: function (cb) { return webSocket.on('message', cb); },
        onError: function (cb) { return webSocket.on('error', cb); },
        onClose: function (cb) { return webSocket.on('close', cb); },
        dispose: function () {
            if (webSocket.readyState < ws.CLOSING) {
                webSocket.close();
            }
        }
    };
}
exports.toIWebSocket = toIWebSocket;
//# sourceMappingURL=connection.js.map