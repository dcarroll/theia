import { Marker } from './marker';
import { Diagnostic } from "vscode-languageserver-types";
export declare const PROBLEM_KIND = "problem";
export interface ProblemMarker extends Marker<Diagnostic> {
    kind: 'problem';
}
export declare namespace ProblemMarker {
    function is(node: Marker<object>): node is ProblemMarker;
}
