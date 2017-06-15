let _style = null, count = 0

export const inject = (style) => {
  // Create and append new StyleSheet
  if(!_style) {
    _style = document.createElement('style')
    _style.setAttribute('type', 'text/css')
    document.head.appendChild(_style)
  }

  count++

  _style.innerHTML =
  `${(_style.innerHTML || '') + '\n'}
  /* Style #${count} */\n${style}`
}
