"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var event_1 = require("../event");
var JsonRpcConnectionHandler = /** @class */ (function () {
    function JsonRpcConnectionHandler(path, targetFactory) {
        this.path = path;
        this.targetFactory = targetFactory;
    }
    JsonRpcConnectionHandler.prototype.onConnection = function (connection) {
        var factory = new JsonRpcProxyFactory(this.path);
        var proxy = factory.createProxy();
        factory.target = this.targetFactory(proxy);
        factory.listen(connection);
    };
    return JsonRpcConnectionHandler;
}());
exports.JsonRpcConnectionHandler = JsonRpcConnectionHandler;
/**
 * Factory for JSON-RPC proxy objects.
 *
 * A JSON-RPC proxy exposes the programmatic interface of an object through
 * JSON-RPC.  This allows remote programs to call methods of this objects by
 * sending JSON-RPC requests.  This takes place over a bi-directional stream,
 * where both ends can expose an object and both can call methods each other's
 * exposed object.
 *
 * For example, assuming we have an object of the following type on one end:
 *
 *     class Foo {
 *         bar(baz: number): number { return baz + 1 }
 *     }
 *
 * which we want to expose through a JSON-RPC interface.  We would do:
 *
 *     let target = new Foo()
 *     let factory = new JsonRpcProxyFactory<Foo>('/foo', target)
 *     factory.onConnection(connection)
 *
 * The party at the other end of the `connection`, in order to remotely call
 * methods on this object would do:
 *
 *     let factory = new JsonRpcProxyFactory<Foo>('/foo')
 *     factory.onConnection(connection)
 *     let proxy = factory.createProxy();
 *     let result = proxy.bar(42)
 *     // result is equal to 43
 *
 * One the wire, it would look like this:
 *
 *     --> {"jsonrpc": "2.0", "id": 0, "method": "bar", "params": {"baz": 42}}
 *     <-- {"jsonrpc": "2.0", "id": 0, "result": 43}
 *
 * Note that in the code of the caller, we didn't pass a target object to
 * JsonRpcProxyFactory, because we don't want/need to expose an object.
 * If we had passed a target object, the other side could've called methods on
 * it.
 *
 * @param <T> - The type of the object to expose to JSON-RPC.
 */
var JsonRpcProxyFactory = /** @class */ (function () {
    /**
     * Build a new JsonRpcProxyFactory.
     *
     * @param target - The object to expose to JSON-RPC methods calls.  If this
     *   is omitted, the proxy won't be able to handle requests, only send them.
     */
    function JsonRpcProxyFactory(target) {
        this.target = target;
        this.onDidOpenConnectionEmitter = new event_1.Emitter();
        this.onDidCloseConnectionEmitter = new event_1.Emitter();
        this.waitForConnection();
    }
    JsonRpcProxyFactory.prototype.waitForConnection = function () {
        var _this = this;
        this.connectionPromise = new Promise(function (resolve) {
            return _this.connectionPromiseResolve = resolve;
        });
        this.connectionPromise.then(function (connection) {
            connection.onClose(function () {
                return _this.onDidCloseConnectionEmitter.fire(undefined);
            });
            _this.onDidOpenConnectionEmitter.fire(undefined);
        });
    };
    /**
     * Connect a MessageConnection to the factory.
     *
     * This connection will be used to send/receive JSON-RPC requests and
     * response.
     */
    JsonRpcProxyFactory.prototype.listen = function (connection) {
        var _this = this;
        if (this.target) {
            var _loop_1 = function (prop) {
                if (typeof this_1.target[prop] === 'function') {
                    connection.onRequest(prop, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.onRequest.apply(_this, __spread([prop], args));
                    });
                    connection.onNotification(prop, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.onNotification.apply(_this, __spread([prop], args));
                    });
                }
            };
            var this_1 = this;
            for (var prop in this.target) {
                _loop_1(prop);
            }
        }
        connection.onDispose(function () { return _this.waitForConnection(); });
        connection.listen();
        this.connectionPromiseResolve(connection);
    };
    /**
     * Process an incoming JSON-RPC method call.
     *
     * onRequest is called when the JSON-RPC connection received a method call
     * request.  It calls the corresponding method on [[target]].
     *
     * The return value is a Promise object that is resolved with the return
     * value of the method call, if it is successful.  The promise is rejected
     * if the called method does not exist or if it throws.
     *
     * @returns A promise of the method call completion.
     */
    JsonRpcProxyFactory.prototype.onRequest = function (method) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            try {
                var promise = (_a = _this.target)[method].apply(_a, __spread(args));
                promise
                    .catch(function (err) { return reject(err); })
                    .then(function (result) { return resolve(result); });
            }
            catch (err) {
                reject(err);
            }
            var _a;
        });
    };
    /**
     * Process an incoming JSON-RPC notification.
     *
     * Same as [[onRequest]], but called on incoming notifications rather than
     * methods calls.
     */
    JsonRpcProxyFactory.prototype.onNotification = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.target)[method].apply(_a, __spread(args));
        var _a;
    };
    /**
     * Create a Proxy exposing the interface of an object of type T.  This Proxy
     * can be used to do JSON-RPC method calls on the remote target object as
     * if it was local.
     *
     * If `T` implements `JsonRpcServer` then a client is used as a target object for a remote target object.
     */
    JsonRpcProxyFactory.prototype.createProxy = function () {
        var result = new Proxy(this, this);
        return result;
    };
    /**
     * Get a callable object that executes a JSON-RPC method call.
     *
     * Getting a property on the Proxy object returns a callable that, when
     * called, executes a JSON-RPC call.  The name of the property defines the
     * method to be called.  The callable takes a variable number of arguments,
     * which are passed in the JSON-RPC method call.
     *
     * For example, if you have a Proxy object:
     *
     *     let fooProxyFactory = JsonRpcProxyFactory<Foo>('/foo')
     *     let fooProxy = fooProxyFactory.createProxy()
     *
     * accessing `fooProxy.bar` will return a callable that, when called,
     * executes a JSON-RPC method call to method `bar`.  Therefore, doing
     * `fooProxy.bar()` will call the `bar` method on the remote Foo object.
     *
     * @param target - unused.
     * @param p - The property accessed on the Proxy object.
     * @param receiver - unused.
     * @returns A callable that executes the JSON-RPC call.
     */
    JsonRpcProxyFactory.prototype.get = function (target, p, receiver) {
        var _this = this;
        if (p === 'setClient') {
            return function (client) {
                _this.target = client;
            };
        }
        if (p === 'onDidOpenConnection') {
            return this.onDidOpenConnectionEmitter.event;
        }
        if (p === 'onDidCloseConnection') {
            return this.onDidCloseConnectionEmitter.event;
        }
        var isNotify = this.isNotification(p);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.connectionPromise.then(function (connection) {
                return new Promise(function (resolve, reject) {
                    try {
                        if (isNotify) {
                            connection.sendNotification.apply(connection, __spread([p.toString()], args));
                            resolve();
                        }
                        else {
                            var resultPromise = connection.sendRequest.apply(connection, __spread([p.toString()], args));
                            resultPromise
                                .catch(function (err) { return reject(err); })
                                .then(function (result) { return resolve(result); });
                        }
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        };
    };
    /**
     * Return whether the given property represents a notification.
     *
     * A property leads to a notification rather than a method call if its name
     * begins with `notify` or `on`.
     *
     * @param p - The property being called on the proxy.
     * @return Whether `p` represents a notification.
     */
    JsonRpcProxyFactory.prototype.isNotification = function (p) {
        return p.toString().startsWith("notify") || p.toString().startsWith("on");
    };
    return JsonRpcProxyFactory;
}());
exports.JsonRpcProxyFactory = JsonRpcProxyFactory;
//# sourceMappingURL=proxy-factory.js.map