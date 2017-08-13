import { join }         from 'path'
import { bind }         from 'decko'

// Imoprt utilities
import Loader           from './loader'
import Manager          from './manager'
import Files, { _stat } from './utils/files'
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
  async exists(name) {
    const { lstat } = Files
    const path      = join(PLUGINS, name)

    try {
      return await lstat(path)
    } catch (e) {
      return false
    }
  }

  getPlugins() {
    return Store.plugins
      .filter((str) => !isEmptyBlank(str))
    || []
  }

  // Loops all folders inside of
  // the `plugins` path and loads them
  @bind
  async loadAll() {
    // Extract values from the interested objects
    const { getPlugins }  = this
    const { readdir, mkdir } = Files

    // Check if the plugin folder exists
    // Related to #11
    const exists    = await _stat(PLUGINS)
    if(!exists)       await mkdir(PLUGINS)

    // Get plugins list from the config
    const _plugins = getPlugins()

    for (let i = 0; i < _plugins.length; i++) {
      // Generate require path
      const name   = _plugins[i]

      await this.load(name)
    }
  }

  // Require the module with the loader
  //
  // TODO: In the future creators will be able to
  // specify arguments to give to the loader in
  // their package.json file, but for now
  // let's keep the cache enabled
  @bind
  async load(name) {
    // Install the plugin if it isn't already
    if(!await this.exists(name))
      await Manager.run('add', [name])

    // Load it
    const path = join(PLUGINS, name)

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
