import { join }         from 'path'

// Imoprt utilities
import Files, { _stat } from './utils/files'
import Loader           from './loader'
import { isEmptyBlank } from './utils/strings'

// Import the store and a path
import Store            from './store'
import { PLUGINS }      from './defaults/variables'

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
    const path      = join(PLUGINS, _path)

    const stats     = await lstat(path)
    return stats.isDirectory()
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
    const exists    = await _stat(PLUGINS)
    if(!exists)       await mkdir(PLUGINS)

    // Add dirs inside of the `plugins` folder
    const _plugins = getPlugins()

    // For each dir inside of our plugins folder
    for (let i = 0; i < _plugins.length; i++) {
      // Generate require path
      const name   = _plugins[i]
      const path   = join(PLUGINS, name)

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
