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
    const { customCss, terminalColors } = Store

    /*
     * Here we're going to merge some default and some user-selected styles
     * This is the current list:
     * - xterm default css(without 256-ansi colors)
     * - webkit custom scrollbars
     * - global transition
     * - 16bit[extensible to 256] terminal colors(either custom or default)
     * - custom user selected styles wich can me edited by plugins
     */
    const blob = new Blob([`
    ${xterm}

    // Scrollbars
    ${scrollbars}

    // Globlal transitions
    * { transition: border .1s }

    // Custom color palette for the terminal
    ${getPalette(terminalColors)}

    /*
     * User written custom css
     * This could be edited by some of your plugins
     */
    ${customCss}
    `], { type: 'text/css'})
    const url = URL.createObjectURL(blob)

    return <link rel='stylesheet' href={url} />
  }
}
