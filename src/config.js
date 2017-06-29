import Load from './utils/loader'
import { base, config } from './paths'
import { doesFileExist, existsSync, mkdirSync, remakeFile, backupFile, readFileSync } from './utils/files'
import defaultConfig from './defaults/config'

if(!existsSync(base))      mkdirSync(base)
if(!doesFileExist(config)) remakeFile(config, defaultConfig)

export const baseConfig = { styles: {} }

export const loadConfig = () => {
  let _config
  try {
    _config = Load(config)
  } catch (err) {
    // Warn the error
    console.warn(err)

    // Create a copy of the old file
    // And recreate it from the default config
    backupFile(config, readFileSync(config))
    remakeFile(config, defaultConfig)

    // Lastly load the config again
    _config = Load(config)
  } finally {
    return { ...baseConfig, ..._config }
  }
}
