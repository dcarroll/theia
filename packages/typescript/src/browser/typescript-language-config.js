"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
// some parts are copied from https://github.com/Microsoft/monaco-typescript/blob/v2.3.0/src/mode.ts
var common_1 = require("../common");
var tokenization_1 = require("./monaco-tokenization/tokenization");
var genericEditConfiguration = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    onEnterRules: [
        {
            // e.g. /** | */
            beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
            afterText: /^\s*\*\/$/,
            action: { indentAction: monaco.languages.IndentAction.IndentOutdent, appendText: ' * ' }
        },
        {
            // e.g. /** ...|
            beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
            action: { indentAction: monaco.languages.IndentAction.None, appendText: ' * ' }
        },
        {
            // e.g.  * ...|
            beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
            action: { indentAction: monaco.languages.IndentAction.None, appendText: '* ' }
        },
        {
            // e.g.  */|
            beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
            action: { indentAction: monaco.languages.IndentAction.None, removeText: 1 }
        }
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
        { open: '`', close: '`', notIn: ['string', 'comment'] },
        { open: "/**", close: " */", notIn: ["string"] }
    ]
};
function registerTypeScript() {
    monaco.languages.register({
        id: common_1.TYPESCRIPT_LANGUAGE_ID,
        extensions: ['.ts', '.tsx'],
        aliases: [common_1.TYPESCRIPT_LANGUAGE_NAME, 'ts', 'typescript'],
        mimetypes: ['text/typescript']
    });
    monaco.languages.onLanguage(common_1.TYPESCRIPT_LANGUAGE_ID, function () {
        monaco.languages.setLanguageConfiguration(common_1.TYPESCRIPT_LANGUAGE_ID, genericEditConfiguration);
        monaco.languages.setTokensProvider(common_1.TYPESCRIPT_LANGUAGE_ID, tokenization_1.createTokenizationSupport(tokenization_1.Language.TypeScript));
    });
}
exports.registerTypeScript = registerTypeScript;
function registerJavaScript() {
    monaco.languages.register({
        id: common_1.JAVASCRIPT_LANGUAGE_ID,
        extensions: ['.js', '.jsx'],
        aliases: [common_1.JAVASCRIPT_LANGUAGE_NAME, 'js', 'javascript'],
        mimetypes: ['text/javascript']
    });
    monaco.languages.onLanguage(common_1.JAVASCRIPT_LANGUAGE_ID, function () {
        monaco.languages.setLanguageConfiguration(common_1.JAVASCRIPT_LANGUAGE_ID, genericEditConfiguration);
        monaco.languages.setTokensProvider(common_1.JAVASCRIPT_LANGUAGE_ID, tokenization_1.createTokenizationSupport(tokenization_1.Language.EcmaScript5));
    });
}
exports.registerJavaScript = registerJavaScript;
//# sourceMappingURL=typescript-language-config.js.map