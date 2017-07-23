import { join }         from 'path'

// Imoprt utilities
import Files, { _stat } from './utils/files'
import Loader           from './utils/loader'
import { isEmptyBlank } from './utils/strings'

// Import the store and a path
import Store            from './store'
import { plugins }      from './paths'

export default new class Plugins {
  // Plugins list, will contain:
  // - All plugins classes EXECUTED
  plugins = []

  // Plugins that throws some kind of exeptions
  // are stored here waiting to be processed and
  // notify the user of the failure
  errorPlugins = []

  // Check if a path inside of the
  // `plugins` folder is a directory
  async isDir(_path) {
    const { lstat } = Files
    const path      = join(plugins, _path)

    const stats     = await lstat(path)
    return stats.isDirectory()
  }

  // Check is a given name starts with `yat-`
  // Wich is used to recognize YAT plugins
  // from other dependencies
  isYatPlugin(name) {
    return name.substr(0, 4) == 'yat-'
  }

  getPlugins() {
    return Store.plugins
      .filter((str) => !isEmptyBlank(str))
    || []
  }

  // Loops all folders inside of
  // the `plugins` path and loads them
  async load() {
    // Extract values from the interested objects
    const { getPlugins }  = this
    const { readdir, mkdir } = Files

    // Check if the plugin folder exists
    // Related to #11
    const exists    = await _stat(plugins)
    if(!exists)       await mkdir(plugins)

    // Add dirs inside of the `plugins` folder
    const _plugins = getPlugins()

    console.log(_plugins);

    // For each dir inside of our plugins folder
    for (let i = 0; i < _plugins.length; i++) {
      // Generate require path
      const name   = _plugins[i]
      const path   = join(plugins, name)
      const plugin = null

      // Require the module with the loader
      //
      // TODO: In the future creators will be able to
      // specify arguments to give to the loader in
      // their package.json file, but for now
      // let's keep the cache enabled
      try {
        const plugin = await Loader.load(path)

        // Push and execute the plugin
        this.plugins.push(new plugin)

        // TODO:
        // Schedule events
      } catch (err) {
        
        // Warn the error in the devTools
        console.warn(
          `Error while loading plugin ${name}, here is the trace: \n`,
          err
        )
        // Otherwise push the plugin
        // to the error array
        this.errorPlugins.push({ name, path, err })
      }
    }
  }
}
