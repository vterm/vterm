import { watchFile } from 'fs'

import files, { _stat } from './utils/files'
import defaultConfig    from './defaults/config'
import Loader           from './loader'
import { CONFIG, BASE } from './defaults/variables'

export default new class Configuration {
  CONFIG  = {}
  error   = null
  watcher = null

  // Returns true when there's an error
  async isError() {
    return this.error ? true : false
  }

  // Returns the configuration object if
  // there isn't any error, otherwise returns
  // the error
  async get() {
    return this.error || this.config
  }

  async load() {
    const {
      mkdir,
      writeFile,
      readFile
    }  = files

    // Get stats for both the config file and the base directory
    // Using `_stat` function to avoid promise rejection
    // And relative errors: see #11
    const exists  = await _stat(BASE)
    const _exists = await _stat(CONFIG)

    // If stats are undefined then these files/folders doesn't exists
    // So we have to create them
    if(!exists)  await mkdir(BASE)
    if(!_exists) await writeFile(CONFIG, defaultConfig)

    try {
      // Load the configuration with custom `requires`
      // There currently is a problem with the order
      // of the loading, because the user is able to require
      // the store inside of the config, but at this point the storeù
      // hasn't been configured yet. So we'll need to specify
      // that inside of the config's documentation
      const __config = await Loader.load(CONFIG, { cache: false })
      this.config = __config

    } catch (err) {
      // Save the error inside of the class object
      this.error = err

      // Path for the backup
      const newPath = CONFIG.replace('js', 'old.js')

      // Backup the file and call it `config.old.js`
      // and the new file will be ignored
      writeFile(newPath, await readFile(CONFIG))

      // The config file will be resetted
      // to its default value
      writeFile(CONFIG, defaultConfig)

      // TODO: Notify the user that the
      //       config was corrupted
    }

    // Setup event listener for config changes
    if(!this.watcher)
      this.watcher = watchFile(CONFIG, async () => await this.load())
  }
}
