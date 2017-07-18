import { grey } from '../styles/colors'
import color    from 'tinycolor2'
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
export const BACKGROUND      = grey[500]
export const DARK_BACKGROUND = color(BACKGROUND).darken(.25)
