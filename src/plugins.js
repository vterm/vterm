import { join }         from 'path'

import Files, { _stat } from './utils/files'
import Loader           from './utils/loader'
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

  // Loops all folders inside of
  // the `plugins` path and loads them
  async load() {
    // Extract values from interested objects
    const {
      isDir,
      isYatPlugin
    }  = this
    const { readdir, mkdir } = Files

    // Check if the plugin folder exists
    // Related to #11
    const exists    = await _stat(plugins)
    if(!exists)       await mkdir(plugins)

    // Add dirs inside of the `plugins` folder
    const __plugins = await readdir(plugins)

    // Filter dirs inside of the previous list
    //
    // NOTE:
    // The dir MUST start with yat-* in order
    // to be loaded. This prevents loading
    // dependencies of other plugins
    const _plugins = __plugins
      .filter(await isDir)
      .filter(isYatPlugin)

    // For each dir inside of our plugins folder
    for (let i = 0; i < _plugins.length; i++) {
      // Generate require path
      const name   = _plugins[i]
      const path   = join(plugins, name)
      const plugin = null
      // Require the module with the loader
      //
      // TODO
      // In the future creators will be able to
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
        // Otherwise push the plugin
        // to the error array
        this.errorPlugins.push({ name, path, err })
      }
    }
  }
}
