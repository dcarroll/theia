const stringArgv = require('string-argv');

/**
 * Parses the given line into an array of args respecting escapes and string literals.
 * @param line the given line to parse
 */
export function parseArgs(line: string): string[] {
    return stringArgv(line);
}
