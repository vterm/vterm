import files            from './utils/files'
import { config, base } from './paths'
import defaultConfig    from './defaults/config'
import Loader           from './utils/loader'

export default new class Configuration {
  config = {}
  error  = null

  // Returns true when there's an error
  isError() {
    return this.error ? true : false
  }

  // Returns the configuration object if
  // there isn't any error, otherwise returns
  // the error
  get() {
    return this.error || this.config
  }

  async load() {
    const { stat, mkdir, writeFile } = files

    // Get stats for both the config file and the base directory
    const exists  = await stat(base)
    const _exists = await stat(config)

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
      this.error = err
    }
  }
}
