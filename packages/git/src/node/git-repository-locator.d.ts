import { Repository } from '../common/model';
/**
 * Resolves to an array of repositories, recursively discovered from the given root `path`.
 *
 * @param path the FS path of the root to start the discovery.
 */
export declare function locateRepositories(path: string): Promise<Repository[]>;
