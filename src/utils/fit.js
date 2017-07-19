import Store       from '../store'
import { PADDING } from '../defaults/variables'

export default (ele, tester) => {
  const padding = Store.config.padding || PADDING
  const style   = window.getComputedStyle(ele)
  const _height = parseInt(style.getPropertyValue('height')) - padding
  const _width  = Math.max(0, parseInt(style.getPropertyValue('width')) - padding)

  const { width }      = tester.getBoundingClientRect()
  tester.style.display = ''
  const { height }     = tester.getBoundingClientRect()

  const rows = Math.floor(_height / height)
  const cols = Math.floor(_width / width)

  return {
    rows, cols
  }
}
