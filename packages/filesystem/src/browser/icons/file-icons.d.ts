import { FileStat } from '../../common/filesystem';
import URI from '@theia/core/lib/common/uri';
import "file-icons-js/css/style.css";
export declare class FileIconProvider {
    getFileIconForURI(uri: URI): string;
    getFileIconForStat(stat: FileStat): string;
}
