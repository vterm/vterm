import { h, render } from 'preact'

export default (ele, tester) => {
  const style  = window.getComputedStyle(ele)
  const _height = parseInt(style.getPropertyValue('height')) - 16
  const _width  = Math.max(0, parseInt(style.getPropertyValue('width')) - 16)

  const { width }      = tester.getBoundingClientRect()
  tester.style.display = ''
  const { height }     = tester.getBoundingClientRect()

  const rows = Math.floor(_height / height)
  const cols = Math.floor(_width / width)

  return {
    rows, cols
  }
}
