/**
 * @license
 * This software is a part of VTerm,
 * licensed under the MIT License.
 *
 * You can find it in the root of
 * the repository under the LICENSE.md file
 */
import Defaults from './defaults'
import FS from './fs'

class Config {
  async load(): Promise<void> {
    const exists = await FS.stat(Defaults.get('CONFIG_PATH'))
    
    return exists
  }
}

export default new Config
