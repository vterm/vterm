import { homedir }     from 'os'
import { join }        from 'path'
import { grey, white } from '../defaults/colors'

// Global default font
export const FONT_FAMILY   = `
  'Fira Code',
  'Operator Mono',
  courier-new,
  courier,
  monospace,
  test
`

// Mesures
export const FONT_SIZE     = 13
export const BORDER_RADIUS = 5
export const PADDING       = 8

// Colors constants:
export const BACKGROUND    = grey[900]
export const FOREGROUND    = grey[500]
export const BORDER_COLOR  = grey[500]

// Directory constats:
// - HOMEDIR = Home of the user
// - BASE    = VTerm base folder
// - CONFIG  = Config file for vterm
// - PLUGINS = Pluigns folder
export const HOMEDIR = homedir()
export const BASE    = join( HOMEDIR, '.vterm'     )
export const CONFIG  = join( BASE,    'config.js')
export const PLUGINS = join( BASE,    'plugins'  )
