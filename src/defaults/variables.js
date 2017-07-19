import { grey }    from '../styles/colors'
import color       from 'tinycolor2'
import { homedir } from 'os'

// Global default font
export const FONT_FAMILY     =`
  'Fira Code',
  'Operator Mono',
  courier-new,
  courier,
  monospace,
  test
`

// Other values
export const FONT_SIZE       = 13
export const BORDER_RADIUS   = 2
export const PADDING         = 8
export const BACKGROUND      = grey[900]
export const PRIMARY_COLOR   = grey[500]
export const DARK_BACKGROUND = color(BACKGROUND).darken(.25)
export const HOMEDIR         = homedir()
