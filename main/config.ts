/**
 * @license
 * This software is a part of VTerm,
 * licensed under the MIT License.
 *
 * You can find it in the root of
 * the repository under the LICENSE.md file
 */
//import Loader from './loader'
import Defaults from './defaults'
import Loader from './loader'
import { 
  IConfig, 
  IConfigOptions, 
  IKeymapsOptions 
} from './interfaces'

interface ConfigStructure {
  config: IConfigOptions
  keymaps: IKeymapsOptions
}

export default new class Config implements IConfig {
  /**
   * Configuration object
   */
  public config: IConfigOptions = {}

  /**
   * Keymaps object
   */
  public keymaps: {} = {}

  /**
   * Returns the current config
   */
  public getConfig(): IConfigOptions {
    return this.config
  }

  /**
   * Returns the current keymaps
   */
  public getKeymaps(): IKeymapsOptions {
    return this.keymaps
  }

  /**
   * Returns a ConfigStructure object, containing both
   * the config and the keymaps values
   */
  public get(): ConfigStructure {
    return {
      config: this.config,
      keymaps: this.keymaps
    }
  }

  /**
   * Loads the configuration from the file
   */
  public async load(): Promise<void> {
    // Load the config
    const config = await Loader.load(Defaults.get('CONFIG_PATH'))

    // Load the config
    const keymaps = await Loader.load(Defaults.get('KEYMAPS_PATH'))    

    // Update config
    this.config = {
      ...Defaults.get('DEFAULT_CONFIG_VALUE'),
      ...config
    }
  
    // Update keymaps
    this.keymaps = {
      ...Defaults.get('DEFAULT_KEYMAPS_VALUE'),
      ...keymaps
    }
  }
}

