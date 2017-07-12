import files, { _stat } from './utils/files'
import defaultConfig    from './defaults/config'
import Loader           from './utils/loader'
import { config, base } from './paths'

export default new class Configuration {
  config = {}
  error  = null

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
    const exists  = await _stat(base)
    const _exists = await _stat(config)

    // If stats are undefined then these files/folders doesn't exists
    // So we have to create them
    if(!exists)  await mkdir(base)
    if(!_exists) await writeFile(config, defaultConfig)

    try {
      // Load the configuration with custom `requires`
      // There currently is a problem with the order
      // of the loading, because the user is able to require
      // the store inside of the config, but at this point the storeù
      // hasn't been configured yet. So we'll need to specify
      // that inside of the config's documentation
      const __config = await Loader.load(config, { cache: false })
      this.config = __config

    } catch (err) {
      // Save the error inside of the class object
      this.error = err

      // Path for the backup
      const newPath = config.replace('js', 'old.js')

      // Backup the file and call it `config.old.js`
      // and the new file will be ignored
      writeFile(newPath, await readFile(config))

      // The config file will be resetted
      // to its default value
      writeFile(config, defaultConfig)
    }
  }
}
