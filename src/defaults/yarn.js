import { join } from 'path'

export const YARN_EXECUTABLE = process.env.ENV == 'production'
  ? join(process.execPath, '__yarn.js') // Production
  : join(process.cwd(), '__yarn.js')    // Development

export const DEFAULT_ARGS = [
  '--no-emoji',
  '--json',
  '--modules-folder plugins',
  '--no-lockfile',
  '--check-files'
]

export const DEFAULT_ENV = {
  ...process.env,
  ELECTRON_RUN_AS_NODE: true
}
