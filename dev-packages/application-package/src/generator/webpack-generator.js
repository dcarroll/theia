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
var paths = require("path");
var abstract_generator_1 = require("./abstract-generator");
var WebpackGenerator = /** @class */ (function (_super) {
    __extends(WebpackGenerator, _super);
    function WebpackGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebpackGenerator.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.write(this.configPath, this.compileWebpackConfig())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(WebpackGenerator.prototype, "configPath", {
        get: function () {
            return this.pck.path('webpack.config.js');
        },
        enumerable: true,
        configurable: true
    });
    WebpackGenerator.prototype.resolve = function (moduleName, path) {
        return this.pck.resolveModulePath(moduleName, path).split(paths.sep).join('/');
    };
    WebpackGenerator.prototype.compileWebpackConfig = function () {
        var _this = this;
        return "// @ts-check\nconst path = require('path');\nconst webpack = require('webpack');\nconst CopyWebpackPlugin = require('copy-webpack-plugin');\nconst CircularDependencyPlugin = require('circular-dependency-plugin');\n\nconst outputPath = path.resolve(__dirname, 'lib');\nconst development = process.env.NODE_ENV === 'development';" + this.ifMonaco(function () { return "\n\nconst monacoEditorPath = development ? '" + _this.resolve('monaco-editor-core', 'dev/vs') + "' : '" + _this.resolve('monaco-editor-core', 'min/vs') + "';\nconst monacoLanguagesPath = '" + _this.resolve('monaco-languages', 'release') + "';\nconst monacoCssLanguagePath = '" + _this.resolve('monaco-css', 'release/min') + "';\nconst monacoJsonLanguagePath = '" + _this.resolve('monaco-json', 'release/min') + "';\nconst monacoHtmlLanguagePath = '" + _this.resolve('monaco-html', 'release/min') + "';"; }) + this.ifBrowser("\n\nconst requirePath = '" + this.resolve('requirejs', 'require.js') + "';") + "\n\nmodule.exports = {\n    entry: path.resolve(__dirname, 'src-gen/frontend/index.js'),\n    output: {\n        filename: 'bundle.js',\n        path: outputPath\n    },\n    target: '" + this.ifBrowser('web', 'electron-renderer') + "',\n    node: {" + this.ifElectron("\n        __dirname: false,\n        __filename: false", "\n        fs: 'empty',\n        child_process: 'empty',\n        net: 'empty',\n        crypto: 'empty'") + "\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.css$/,\n                loader: 'style-loader!css-loader'\n            },\n            {\n                test: /\\.(ttf|eot|svg)(\\?v=\\d+\\.\\d+\\.\\d+)?$/,\n                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'\n            },\n            {\n                test: /.(jpg|png|gif)$/,\n                loader: 'file-loader',\n                options: {\n                    name: '[path][name].[hash].[ext]',\n                }\n            },\n            {\n                test: /node_modules.+xterm.+.map$/,\n                loader: 'ignore-loader'\n            },\n            {\n                /* Get rid of :\n\n                   @theia/example-electron: WARNING in /home/emaisin/src/theia/~/xterm/lib/addons/attach/index.html\n                   @theia/example-electron: Module parse failed: /home/emaisin/src/theia/node_modules/xterm/lib/addons/attach/index.html Unexpected token (1:0)\n                   @theia/example-electron: You may need an appropriate loader to handle this file type.\n\n                   See: https://github.com/theia-ide/theia/pull/688#issuecomment-338289418\n                */\n\n                test: /node_modules\\/xterm\\/lib\\/addons\\/attach\\/index\\.html/,\n                loader: 'ignore-loader',\n            },\n            {\n                // see https://github.com/theia-ide/theia/issues/556\n                test: /source-map-support/,\n                loader: 'ignore-loader'\n            },\n            {\n                test: /\\.js$/,\n                enforce: 'pre',\n                loader: 'source-map-loader'\n            },\n            {\n                test: /\\.woff(2)?(\\?v=[0-9]\\.[0-9]\\.[0-9])?$/,\n                loader: \"url-loader?limit=10000&mimetype=application/font-woff\"\n            }\n        ],\n        noParse: /vscode-languageserver-types|vscode-uri/\n    },\n    resolve: {\n        extensions: ['.js']" + this.ifMonaco(function () { return ",\n        alias: {\n            'vs': path.resolve(outputPath, monacoEditorPath)\n        }"; }) + "\n    },\n    devtool: 'source-map',\n    plugins: [\n        new webpack.HotModuleReplacementPlugin(),\n        new CopyWebpackPlugin([" + this.ifBrowser("\n            {\n                from: requirePath,\n                to: '.'\n            },") + this.ifMonaco(function () { return "\n            {\n                from: monacoEditorPath,\n                to: 'vs'\n            },\n            {\n                from: monacoLanguagesPath,\n                to: 'vs/basic-languages'\n            },\n            {\n                from: monacoCssLanguagePath,\n                to: 'vs/language/css'\n            },\n            {\n                from: monacoJsonLanguagePath,\n                to: 'vs/language/json'\n            },\n            {\n                from: monacoHtmlLanguagePath,\n                to: 'vs/language/html'\n            }"; }) + "\n        ]),\n        new CircularDependencyPlugin({\n            exclude: /(node_modules|examples)\\/./,\n            failOnError: false // https://github.com/nodejs/readable-stream/issues/280#issuecomment-297076462\n        })\n    ],\n    stats: {\n        warnings: true\n    }\n};";
    };
    return WebpackGenerator;
}(abstract_generator_1.AbstractGenerator));
exports.WebpackGenerator = WebpackGenerator;
//# sourceMappingURL=webpack-generator.js.map