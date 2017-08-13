import { join } from 'path'

export const YARN_EXECUTABLE = process.env.NODE_ENV == 'development'
  ? join(process.cwd(),         '__yarn.js') // Development
  : join(process.resourcesPath, '__yarn.js') // Production

export const DEFAULT_ARGS = [
  '--no-emoji',
  '--json',
  // Util we fix:
  // https://github.com/vterm/vterm/issues/33
  //'--modules-folder plugins',
  '--no-lockfile',
  '--check-files'
]
