/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
import { Module } from 'module'
import { DEFAULT_MODULES } from '../values/modules'
import { 
  ILoader, ILoaderOptions,
  IModulesObject
} from './interfaces'

class Loader implements ILoader {
  /**
   * Sets of options for the commonjs custom require
   * function that is defined by this class
   */
  private options: ILoaderOptions = {
    /**
     * Wheter use or not commonjs's require.cache
     */
    useRequireCache: false,

    /**
     * Wheter use or not the local cached from this class
     */
    useLocalCache: true,

    /**
     * Wheter to put or not the requried module in the commonjs's cache.
     * 
     * Not that disabling this will remove require.cache[<module-name>]
     */
    putInRequireCache: true,

    /**
     * 
     */
    putInLocalCache: true
  }

  /**
   * Object of cached modules.
   * 
   * By default it's filled with a list of all these modules
   * that our app uses and can be directly sent to the user
   */
  private cached: IModulesObject = DEFAULT_MODULES

  /**
   * Object containing all the custom modules defined
   * with the appropriate method
   */
  private custom: IModulesObject = {}


  constructor() {
    /**
     * Backup a local copy of Module._load
     * in the local class to be used when requiring
     * non-custom or non-cached modules
     * 
     * Also extract options used in the 
     */
    const _load = Module._load

    // Extract values used in other scopes
    const { useLocalCache,useRequireCache } = this.options
    const { cached, custom } = this

    Module._load = function(module: string): NodeModule {
      let returner = custom[module]

      // If the commonjs's cache is disabled
      // Remove the entry from it
      if(!useRequireCache) delete require.cache[module]

      // Take the module from the cache if present
      if(useLocalCache && cached[module]) returner = cached[module]

      return returner || _load.apply(this, arguments)

    }
  }

  /**
   * Set options
   * 
   * @param options object implementing ILoaderOptions
   */
  private setOptions(options: ILoaderOptions): void {
    for (var key in options) {
      if(key !== undefined) this.options[key] = options[key]
    }
  }

  /**
   * Links a custom path to a value that can be obtained
   * via the modified commonjs's require function
   * 
   * @param name Name of the module you'd like to define
   * @param module Content that will be retourned for this module
   */
  public registerCustom(name: string, module: NodeModule | any) {
    this.custom[name] = module
  }

  /**
   * Wraps the commonjs require function and automatically sets
   * and reverts(after the use) custom settings for the loader module
   * 
   * NOTE: if options.putInLocalCache is true the module will be
   *       saved to the current class's local cache for future use
   * 
   * @param name Name of the module you'd like to require
   * @param options Sets of ILoaderOptions that describes how the package should be resolved
   */
  public load(name: string, options?: ILoaderOptions): NodeModule {
    // Back-up the curren options set
    const _options = this.options

    // Apply the new options and require the module
    this.setOptions(options || {})
    const res = require(name)

    // Cache the module
    if(this.options.putInLocalCache) {
      this.cached[name] = res
    }

    // Remove the module from the commonjs's
    // cache if it's disabled
    if(!this.options.putInRequireCache) {
      delete require.cache[name]
    }

    // Restore the old options
    this.setOptions(_options)

    return res
  }
}

const loader = new Loader
/**
 * Register the current loader instance to be avaible 
 * to other developers in the making of plugins
 */
loader.registerCustom('vterm/loader', loader)

export default loader