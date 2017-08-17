import Store       from '../store'
import { PADDING } from '../defaults/variables'

export default ({ height: __height, width: __width }, tester) => {
  const padding = Store.config.padding || PADDING
  const _height = __height - (padding * 2)
  const _width  = __width  - (padding * 2)

  tester.style.display = 'inline'
  const { width } = tester.getBoundingClientRect()
  tester.style.display = ''
  const { height } = tester.getBoundingClientRect()

  const rows = Math.floor(_height / height)
  const cols = Math.floor(_width / width)

  return {
    rows, cols,
    charHeight: height,
    charWidth: width
  }
}
