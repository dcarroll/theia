"use strict";
/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [0, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
require("mocha");
var chaiAsPromised = require("chai-as-promised");
var inversify_spec_config_1 = require("./test/inversify.spec-config");
var backend_application_1 = require("@theia/core/lib/node/backend-application");
var shell_terminal_protocol_1 = require("../common/shell-terminal-protocol");
var ws = require("ws");
chai.use(chaiAsPromised);
/**
 * Globals
 */
var expect = chai.expect;
describe("Terminal Backend Contribution", function() {
  this.timeout(10000);
  var server;
  var shellTerminalServer;
  before(function() {
    return __awaiter(this, void 0, void 0, function() {
      var application;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            application = inversify_spec_config_1.testContainer.get(
              backend_application_1.BackendApplication
            );
            shellTerminalServer = inversify_spec_config_1.testContainer.get(
              shell_terminal_protocol_1.IShellTerminalServer
            );
            return [4 /*yield*/, application.start()];
          case 1:
            server = _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
  it("is data received from the terminal ws server", function() {
    return __awaiter(this, void 0, void 0, function() {
      var terminalId, p;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, shellTerminalServer.create({})];
          case 1:
            terminalId = _a.sent();
            p = new Promise(function(resolve, reject) {
              var socket = new ws(
                "ws://0.0.0.0:" +
                  server.address().port +
                  "/services/terminals/" +
                  terminalId
              );
              socket.on("message", function(msg) {
                resolve();
                socket.close();
              });
              socket.on("error", function(error) {
                reject(error);
              });
            });
            return [2 /*return*/, expect(p).to.be.eventually.fulfilled];
        }
      });
    });
  });
});
//# sourceMappingURL=terminal-backend-contribution.slow-spec.js.map
