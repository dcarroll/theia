/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied from https://github.com/Microsoft/monaco-typescript/tree/v2.3.0 and only slightly modified (imports and linting)
'use strict';
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
// tslint:disable:indent
// tslint:disable:no-var-keyword
// tslint:disable:one-variable-per-declaration
// tslint:disable:prefer-const
var ts = require("monaco-typescript/release/lib/typescriptServices");
var Language;
(function (Language) {
    Language[Language["TypeScript"] = 0] = "TypeScript";
    Language[Language["EcmaScript5"] = 1] = "EcmaScript5";
})(Language = exports.Language || (exports.Language = {}));
function createTokenizationSupport(language) {
    var classifier = ts.createClassifier(), bracketTypeTable = language === Language.TypeScript ? tsBracketTypeTable : jsBracketTypeTable, tokenTypeTable = language === Language.TypeScript ? tsTokenTypeTable : jsTokenTypeTable;
    return {
        getInitialState: function () { return new State(language, ts.EndOfLineState.None, false); },
        tokenize: function (line, state) { return tokenize(bracketTypeTable, tokenTypeTable, classifier, state, line); }
    };
}
exports.createTokenizationSupport = createTokenizationSupport;
var State = /** @class */ (function () {
    function State(language, eolState, inJsDocComment) {
        this.language = language;
        this.eolState = eolState;
        this.inJsDocComment = inJsDocComment;
    }
    State.prototype.clone = function () {
        return new State(this.language, this.eolState, this.inJsDocComment);
    };
    State.prototype.equals = function (other) {
        if (other === this) {
            return true;
        }
        if (!other || !(other instanceof State)) {
            return false;
        }
        if (this.eolState !== other.eolState) {
            return false;
        }
        if (this.inJsDocComment !== other.inJsDocComment) {
            return false;
        }
        return true;
    };
    return State;
}());
function tokenize(bracketTypeTable, tokenTypeTable, classifier, state, text) {
    // Create result early and fill in tokens
    var ret = {
        tokens: [],
        endState: new State(state.language, ts.EndOfLineState.None, false)
    };
    function appendFn(startIndex, type) {
        if (ret.tokens.length === 0 || ret.tokens[ret.tokens.length - 1].scopes !== type) {
            ret.tokens.push({
                startIndex: startIndex,
                scopes: type
            });
        }
    }
    var isTypeScript = state.language === Language.TypeScript;
    // shebang statement, #! /bin/node
    if (!isTypeScript && checkSheBang(0, text, appendFn)) {
        return ret;
    }
    var result = classifier.getClassificationsForLine(text, state.eolState, true), offset = 0;
    ret.endState.eolState = result.finalLexState;
    ret.endState.inJsDocComment = result.finalLexState === ts.EndOfLineState.InMultiLineCommentTrivia && (state.inJsDocComment || /\/\*\*.*$/.test(text));
    try {
        for (var _a = __values(result.entries), _b = _a.next(); !_b.done; _b = _a.next()) {
            var entry = _b.value;
            var type;
            if (entry.classification === ts.TokenClass.Punctuation) {
                // punctions: check for brackets: (){}[]
                var ch = text.charCodeAt(offset);
                type = bracketTypeTable[ch] || tokenTypeTable[entry.classification];
                appendFn(offset, type);
            }
            else if (entry.classification === ts.TokenClass.Comment) {
                // comments: check for JSDoc, block, and line comments
                if (ret.endState.inJsDocComment || /\/\*\*.*\*\//.test(text.substr(offset, entry.length))) {
                    appendFn(offset, isTypeScript ? 'comment.doc.ts' : 'comment.doc.js');
                }
                else {
                    appendFn(offset, isTypeScript ? 'comment.ts' : 'comment.js');
                }
            }
            else {
                // everything else
                appendFn(offset, tokenTypeTable[entry.classification] || '');
            }
            offset += entry.length;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return ret;
    var e_1, _c;
}
var tsBracketTypeTable = Object.create(null);
tsBracketTypeTable['('.charCodeAt(0)] = 'delimiter.parenthesis.ts';
tsBracketTypeTable[')'.charCodeAt(0)] = 'delimiter.parenthesis.ts';
tsBracketTypeTable['{'.charCodeAt(0)] = 'delimiter.bracket.ts';
tsBracketTypeTable['}'.charCodeAt(0)] = 'delimiter.bracket.ts';
tsBracketTypeTable['['.charCodeAt(0)] = 'delimiter.array.ts';
tsBracketTypeTable[']'.charCodeAt(0)] = 'delimiter.array.ts';
var tsTokenTypeTable = Object.create(null);
tsTokenTypeTable[ts.TokenClass.Identifier] = 'identifier.ts';
tsTokenTypeTable[ts.TokenClass.Keyword] = 'keyword.ts';
tsTokenTypeTable[ts.TokenClass.Operator] = 'delimiter.ts';
tsTokenTypeTable[ts.TokenClass.Punctuation] = 'delimiter.ts';
tsTokenTypeTable[ts.TokenClass.NumberLiteral] = 'number.ts';
tsTokenTypeTable[ts.TokenClass.RegExpLiteral] = 'regexp.ts';
tsTokenTypeTable[ts.TokenClass.StringLiteral] = 'string.ts';
var jsBracketTypeTable = Object.create(null);
jsBracketTypeTable['('.charCodeAt(0)] = 'delimiter.parenthesis.js';
jsBracketTypeTable[')'.charCodeAt(0)] = 'delimiter.parenthesis.js';
jsBracketTypeTable['{'.charCodeAt(0)] = 'delimiter.bracket.js';
jsBracketTypeTable['}'.charCodeAt(0)] = 'delimiter.bracket.js';
jsBracketTypeTable['['.charCodeAt(0)] = 'delimiter.array.js';
jsBracketTypeTable[']'.charCodeAt(0)] = 'delimiter.array.js';
var jsTokenTypeTable = Object.create(null);
jsTokenTypeTable[ts.TokenClass.Identifier] = 'identifier.js';
jsTokenTypeTable[ts.TokenClass.Keyword] = 'keyword.js';
jsTokenTypeTable[ts.TokenClass.Operator] = 'delimiter.js';
jsTokenTypeTable[ts.TokenClass.Punctuation] = 'delimiter.js';
jsTokenTypeTable[ts.TokenClass.NumberLiteral] = 'number.js';
jsTokenTypeTable[ts.TokenClass.RegExpLiteral] = 'regexp.js';
jsTokenTypeTable[ts.TokenClass.StringLiteral] = 'string.js';
function checkSheBang(deltaOffset, line, appendFn) {
    if (line.indexOf('#!') === 0) {
        appendFn(deltaOffset, 'comment.shebang');
        return true;
    }
    return false;
}
//# sourceMappingURL=tokenization.js.map