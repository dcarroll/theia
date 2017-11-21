"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
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
var __values =
  (this && this.__values) ||
  function(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
    if (m) return m.call(o);
    return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  };
var __read =
  (this && this.__read) ||
  function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
var __spread =
  (this && this.__spread) ||
  function() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var yargs = require("yargs");
var inversify_1 = require("inversify");
var common_1 = require("../common");
var promise_util_1 = require("../common/promise-util");
var backend_process_1 = require("./backend-process");
exports.BackendApplicationContribution = Symbol(
  "BackendApplicationContribution"
);
var defaultPort = backend_process_1.BackendProcess.electron ? 0 : 5000;
var defaultHost = "0.0.0.0";
var BackendApplicationCliContribution = /** @class */ (function() {
  function BackendApplicationCliContribution() {}
  BackendApplicationCliContribution.prototype.configure = function(conf) {
    yargs.option("port", {
      alias: "p",
      description: "The port the backend server listens on.",
      type: "number",
      default: defaultPort
    });
    yargs.option("hostname", {
      description: "The allowed hostname for connections.",
      type: "string",
      default: defaultHost
    });
  };
  BackendApplicationCliContribution.prototype.setArguments = function(args) {
    this.port = args.port;
    this.hostname = args.hostname;
  };
  BackendApplicationCliContribution = __decorate(
    [inversify_1.injectable()],
    BackendApplicationCliContribution
  );
  return BackendApplicationCliContribution;
})();
exports.BackendApplicationCliContribution = BackendApplicationCliContribution;
/**
 * The main entry point for Theia applications.
 */
var BackendApplication = /** @class */ (function() {
  function BackendApplication(contributionsProvider, cliParams, logger) {
    this.contributionsProvider = contributionsProvider;
    this.cliParams = cliParams;
    this.logger = logger;
    this.app = express();
    process.on("uncaughtException", function(error) {
      if (error) {
        logger.error("Uncaught Exception: ", error.toString());
        if (error.stack) {
          logger.error(error.stack);
        }
      }
    });
    try {
      for (
        var _a = __values(this.contributionsProvider.getContributions()),
          _b = _a.next();
        !_b.done;
        _b = _a.next()
      ) {
        var contribution = _b.value;
        if (contribution.initialize) {
          try {
            contribution.initialize();
          } catch (err) {
            this.logger.error(err.toString());
          }
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    try {
      for (
        var _d = __values(this.contributionsProvider.getContributions()),
          _e = _d.next();
        !_e.done;
        _e = _d.next()
      ) {
        var contribution = _e.value;
        if (contribution.configure) {
          try {
            contribution.configure(this.app);
          } catch (err) {
            this.logger.error(err.toString());
          }
        }
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    var e_1, _c, e_2, _f;
  }
  BackendApplication.prototype.use = function() {
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      handlers[_i] = arguments[_i];
    }
    (_a = this.app).use.apply(_a, __spread(handlers));
    var _a;
  };
  BackendApplication.prototype.start = function(aPort, aHostname) {
    return __awaiter(this, void 0, void 0, function() {
      var _this = this;
      var deferred, server, herokuPort, hostname, _a, _b, contrib, e_3, _c;
      return __generator(this, function(_d) {
        deferred = new promise_util_1.Deferred();
        if (process.env.PORT === undefined) {
          herokuPort = this.cliParams.port;
        } else {
          herokuPort = process.env.PORT;
        }
        console.log("Listening on port " + herokuPort);
        hostname =
          aHostname !== undefined ? aHostname : this.cliParams.hostname;
        this.logger.info("Listening on host: " + hostname);
        server = this.app.listen(process.env.PORT, "0.0.0.0", function() {
          _this.logger.info(
            "Theia app listening on http://" +
              (hostname || "0.0.0.0") +
              ":" +
              server.address().port +
              "."
          );
          _this.logger.info("The env port is: ${process.env.PORT}");
          deferred.resolve(server);
        });
        /* Allow any number of websocket servers.  */
        server.setMaxListeners(0);
        try {
          for (
            _a = __values(this.contributionsProvider.getContributions()),
              _b = _a.next();
            !_b.done;
            _b = _a.next()
          ) {
            contrib = _b.value;
            if (contrib.onStart) {
              try {
                contrib.onStart(server);
              } catch (err) {
                this.logger.error(err.toString());
              }
            }
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        return [2 /*return*/, deferred.promise];
      });
    });
  };
  BackendApplication = __decorate(
    [
      inversify_1.injectable(),
      __param(0, inversify_1.inject(common_1.ContributionProvider)),
      __param(0, inversify_1.named(exports.BackendApplicationContribution)),
      __param(1, inversify_1.inject(BackendApplicationCliContribution)),
      __param(2, inversify_1.inject(common_1.ILogger)),
      __metadata("design:paramtypes", [
        Object,
        BackendApplicationCliContribution,
        Object
      ])
    ],
    BackendApplication
  );
  return BackendApplication;
})();
exports.BackendApplication = BackendApplication;
//# sourceMappingURL=backend-application.js.map
