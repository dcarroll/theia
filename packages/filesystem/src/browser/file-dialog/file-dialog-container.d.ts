import { interfaces, Container } from "inversify";
import { FileDialog, FileDialogProps } from "./file-dialog";
export declare function createFileDialogContainer(parent: interfaces.Container): Container;
export declare function createFileDialog(parent: interfaces.Container, props: FileDialogProps): FileDialog;
