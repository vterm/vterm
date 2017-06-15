import { transform } from 'babel-core'
import { parse } from 'babylon'

import Load from './utils/loader'
import { base, config, babelrc } from './paths'
import { remakeFile, readFileSync, unlinkSync, writeFileSync, doesFileExists, backupFile, existsSync, mkdirSync } from './utils/files'
import defaultConfig from './defaults/config'
import defaultBabelrc from './defaults/.babelrc'

let i = 0

if(!existsSync(base)) mkdirSync(base)

export const getRawConfig  = () => {
  if(!doesFileExists(config)) {

    remakeFile(config, defaultConfig)
    return defaultConfig

  } else {
    return readFileSync(config).toString()
  }
}

export const getRawBabelrc  = () => {

  if(!doesFileExists(babelrc)) {

    remakeFile(babelrc, defaultBabelrc)
    return defaultBabelrc

  } else {
    return readFileSync(babelrc).toString()
  }
}

export const getParsedBabelrc = () => {
  const raw = getRawBabelrc()

  try {
    return JSON.parse( raw )
  } catch (err) {
    // If the babelrc has some parsing errors
    //
    // First log the error to the debugger
    console.error(err)

    // Reset the babelrc to the default file
    // And back-it-up as a copy
    backupFile(babelrc, raw)
    remakeFile(babelrc, defaultBabelrc)
    return JSON.parse( defaultBabelrc )
  }
}

export const getParsedConfig = () => {
  const raw     = getRawConfig()
  let babelrc = getParsedBabelrc()

  try {

    parse(raw, babelrc.babylon)
    delete babelrc.babylon

    return transform(raw, babelrc).code

  } catch (err) {
    // If the config has some parsing errors
    //
    // First log the error to the debugger
    console.error(err)
    delete babelrc.babylon

    // Reset the config to the default config
    // And back-it-up as a copy
    backupFile(config, raw)
    remakeFile(config, defaultConfig)
    return transform(defaultConfig, babelrc).code
  }
}

export const loadConfig = () => {
  const _config = getParsedConfig()

  const path   = config.replace('.js', '') + `.${i}.compiled.js`
  writeFileSync(path, _config)

  const loaded = Load(path)

  unlinkSync(path)
  i++
  return (loaded.__esModule) ? loaded.default : loaded
}
