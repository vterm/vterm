import { join }    from 'path'
import { homedir } from 'os'

export const base    = join( homedir(), '.yat'         )
export const config  = join( base,      'config.js'    )
export const babelrc = join( base,      '.babelrc'     )
export const plugins = join( base,      'node_modules' )
