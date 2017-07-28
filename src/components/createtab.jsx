import { h, Component }  from 'preact'
import Store             from '../store'

// Import actions and utils
import { createTab }     from '../actions/tabs'
import lighten          from '../utils/lighten'

// Import defaults
import { LIGHT_COLOR } from '../defaults/variables'

export class CreateTab extends Component {

  // Styles for our application
  // Using:
  // - TODO: Display only if there wasn't any
  //   error loading the app. Need to rewrite
  //   TerminalError for that.
  // - Float to right if the platform is
  //   `darwin` otherwhise to the left
  // - Fixed with and full height
  // - All items to the center
  // - Disable user selection and user dragging
  // - Use pointer cursor

  getStyles() {
    const { platform } = this.props

    const {
      CreateTab: userStyles
    } = Store.config.styles

    // Plugin styles
    const {
      CreateTab: pluginStyles
    } = Store.styles

    const styles = {
      // Display flex and left/right positioning
      display: 'flex',
      float: platform =='darwin' ? 'right' : 'left',

      // Fixed width and using full height
      width: 46,
      height: '100%',

      // Making the <svg /> fit the center
      justifyContent: 'center',
      alignItems: 'center',

      // Disalbe use selection and dragging.
      // Set the cursor to pointer
      userSelect: 'none',
      WebkitAppRegion: 'no-drag',
      cursor: 'pointer'
    }

    return styles
  }

  // Render the button to add more tabs:
  // - Default <div /> used as container
  //   - plugin sign <svg />
  render() {
    // Retriving custom props, styles
    // and foreground value from the store
    const {
      createTab: createTabProps
    } = Store.props

    const { foreground } = Store.config

    const styles = this.getStyles()

    return(
      <div
        onClick={createTab}
        style={styles}
        {...createTabProps}
      >
        <svg
          fill={lighten(foreground, .5) || LIGHT_COLOR}
          viewBox="0 0 24 24"
          style={{
            height: 16,
            width: 16
          }}
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </div>
    )
  }
}
