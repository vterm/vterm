import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import Store            from '../store'

// Styles
import xterm            from '../defaults/xterm'
import scrollbars       from '../defaults/scrollbar'

export const getPalette = (Arr) => {
  const styles = []

  /* Assuming the give array is a valid 16bit or 256bit color scheme
   * Loop thrugh all its values and build a valid css color scheme
   *
   * 16bit color listing:
   * - Black
   * - Red
   * - Green
   * - Yellow
   * - Blue
   * - Magenta
   * - Cyan
   * - White
   * - Light black
   * - Light red
   * - Light green
   * - Light yellow
   * - Light blue
   * - Light magenta
   * - Light cyan
   * - Light white
   */

  for (let i = 0; i < Arr.length; i++) {
    styles.push(`
    .terminal .xterm-color-${i} {
      color: ${Arr[i]};
    }

    .terminal .xterm-bg-color-${i} {
      background-color: ${Arr[i]};
    }
    `)
  }

  return styles.join('\n')
}

@observer
export class Styles extends Component {
  render() {
    // Extrapolating values from store's config
    const { css, colors } = Store

    /*
     * Here we're going to merge some default and some user-selected styles
     * This is the current list:
     * - xterm default css(without 256-ansi colors)
     * - webkit custom scrollbars
     * - global styles
     * - global transition
     * - 16bit[extensible to 256] terminal colors(either custom or default)
     * - custom user selected styles wich can be edited by plugins
     */
    return <style type='text/css' dangerouslySetInnerHTML={{ __html: `
    /*
     *  Default style for xterm.js
     */
    ${xterm()}

    // Scrollbars
    ${scrollbars}

    // Global custom styles
    * { text-rendering: optimizeLegibility; }

    @media (min-resolution: 2dppx) {
      * { text-rendering: geometricPrecision; }
    }

    // Globlal transitions
    * { transition: border .1s }

    // Custom color palette for the terminal
    ${getPalette(colors)}

    /*
     * User written custom css
     * This could be edited by some of your plugins
     */
    ${css}
    ` }} />
  }
}
