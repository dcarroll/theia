"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../common");
var java_monaco_language_1 = require("./java-monaco-language");
monaco.languages.register({
    id: common_1.JAVA_LANGUAGE_ID,
    extensions: ['.java', '.jav', '.class'],
    aliases: ['Java', 'java'],
    mimetypes: ['text/x-java-source', 'text/x-java'],
});
monaco.languages.onLanguage(common_1.JAVA_LANGUAGE_ID, function () {
    monaco.languages.setLanguageConfiguration(common_1.JAVA_LANGUAGE_ID, java_monaco_language_1.configuration);
    monaco.languages.setMonarchTokensProvider(common_1.JAVA_LANGUAGE_ID, java_monaco_language_1.monarchLanguage);
});
//# sourceMappingURL=index.js.map