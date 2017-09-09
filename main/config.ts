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
import Logger from './logger'

import { 
  IConfig, 
  IConfigOptions, 
  IKeymapsOptions,
  ILoaderOptions
} from './interfaces'

interface ConfigStructure {
  config: IConfigOptions
  keymaps: IKeymapsOptions
}

export default new class Config implements IConfig {
  /**
   * Boolean that describes the presence of 
   * an error in the loading process
   */
  private hasError: boolean = false

  /**
   * Error containing the trace of the exeption
   */
  private error: Error = null

  /**
   * Options to be used with the loader
   */
  private options: ILoaderOptions = {
    useLocalCache: false,
    useRequireCache: false,
    putInLocalCache: false,
    putInRequireCache: false
  }

  /**
   * Configuration object
   */
  public config: IConfigOptions = {}

  /**
   * Keymaps object
   */
  public keymaps: {} = {}

  /**
   * 
   */
  public hasErrors() {
    return this.hasError ? this.error : false
  }

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
    try {
      Logger.trace('Loading configuration and keymaps')

      // Load the config
      const config = await Loader.load(Defaults.get('CONFIG_PATH'), this.options)
      
      // Load the config
      const keymaps = await Loader.load(Defaults.get('KEYMAPS_PATH'), this.options)    

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

      this.hasError = false
      Logger.done('Configuration and keymaps loaded successfully!')

    } catch(err) {
      // Save the error status in the class
      this.hasError = true
      this.error = err

      Logger.error('There was an error while loading the configuration/keymaps', err)

      /**
       * Use the default value for both the
       * config and the keymaps. FOR NOW.
       */
      this.config = Defaults.get('DEFAULT_CONFIG_VALUE')
      this.keymaps = Defaults.get('DEFAULT_KEYMAPS_VALUE')
      
      Logger.done('Using default configuration and keymaps presets.')
    }
  }
}

