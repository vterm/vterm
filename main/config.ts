/**
 * @license
 * This software is a part of VTerm,
 * licensed under the MIT License.
 *
 * You can find it in the root of
 * the repository under the LICENSE.md file
 */
import { CONFIG } from '../values/paths'
import FS from './fs'

class Config {
  async load(): Promise<void> {
    const exists = await FS.stat(CONFIG)

    

    return exists
  }
}

export default new Config
