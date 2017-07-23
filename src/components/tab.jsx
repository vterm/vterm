import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import { bind }         from 'decko'
import Store            from '../store'

// Import actions
import { selectTab, removeTab } from '../actions/tabs'

// Import defaults
import {
  PRIMARY_COLOR,
  LIGHT_COLOR } from '../defaults/variables'

@observer
export class Tab extends Component {
  // Initial state
  state = {
    hover: false
  }

  // Returns all the tabs
  getTabs() {
    return Store.tabs.filter(Boolean)
  }

  // Styles for our Tab component
  // Using:
  // - fill-up Height and divide width equally
  //   between all the tabs
  // - Make the text unselectable by the user
  // - It's a flex container, so we set some
  //   flex-based proprieties to make our children
  //   be aligned in the middle, but also keep the
  //   left/right if specified
  //   - flexBasis      = Use all the remaning space
  //   - justifyContent = separate the items from the
  //                      central titlebar
  //   - alignItems TODO MAYBE
  //
  // The <span /> where the shell title lives in
  // Title:
  // - relative positioning
  // - maxWidth to block the text inside the parent
  // - make the cursor as it's interactable
  // - disable overflow
  // - disable window dragging in the title
  // - color of the text(darker if non-selected)
  // - centred text
  // - Color the text light is the tab is selected
  //   otherwhise make it darker
  //
  // The <svg /> to close the tab
  // Close:
  // - Display only when there are 2 or more
  //   tabs and the mouse is hover this one
  // - Center the close svg
  // - Float its container to the right
  // - disable window dragging in the
  //   close button and add some margin
  // PLUS:
  // - Extra styles setted by the user and/ore the plugins.

  getStyles() {
    // Extract values from props, state
    // and other methods
    const { selected } = this.props
    const { hover }    = this.state
    const length       = this.getTabs().length

    const { Tab: userStyles }   = Store.config.styles

    // TODO: Support plugin styles
    const { Tab: pluginStyles } = {}

    const styles = {
      // fill the whole height
      // display: flex for the other props
      height:     '100%',
      display:    'flex',

      // Disable text selection
      userSelect: 'none',

      // Flexbox values
      flexBasis:  '100%',
      alignItems: 'center',

      Title: {
        // relative positioning, maxWidth
        // and text positioning
        position: 'relative',
        maxWidth: '100%',
        left: '50%',

        // Cursor as a pointer, no overflow
        // and no webkit drag region
        cursor: 'pointer',
        overflow: 'hidden',
        WebkitAppRegion: 'no-drag',

        // Color of the text
        color: selected ? LIGHT_COLOR : PRIMARY_COLOR
      },

      Close: {
        // Display only if there are 2 ore more tabs
        // the this one is hovered by the mouse
        display: length > 1 && hover ? 'flex' : 'none',

        // Center the close svg and make
        // it float to the right
        justifyContent: 'center',
        alignItems: 'center',
        float: 'right',

        // Disable window dragging
        // and add marginRight
        WebkitAppRegion: 'no-drag',
        marginRight: 8
      },

      // User/plugin custom styles
      ...(userStyles   || {}),
      ...(pluginStyles || {})
    }

    return styles
  }

  // Focus the clicked tab
  @bind
  onFocus() {
    selectTab(this.props.id)
  }

  // Closes the clicked tab
  @bind
  onClose() {
    removeTab(this.props.id)
  }

  // Sets the `hover` state to true
  // when the mouse enters in the
  // tab container area
  @bind
  onMouseEnter() {
    this.setState({ hover: true })
  }

  // Sets the `hover` state to false
  // when the mouse leaves in the
  // tab container area
  @bind
  onMouseLeave() {
    this.setState({ hover: false })
  }


  // Render the tab; This contains:
  // - Main <div> container:
  //   - Custom <preTab /> elements
  //   - Default <span /> to hold the title
  //   - Default <div /> to hold the closing SVG
  //     - Close svg with styles differing
  //       when selected and when not

  render({ id, uid, selected, title }) {
    // Retrivecustom pre/after elements
    const { preTab, afterTab } = Store.elements

    // Extract methods from the local class
    const {
      onMouseEnter, onFocus,
      onMouseLeave, onClose
    } = this

    // Retriving custom props and our styles
    const { Tab: tabProps } = Store.props
    const styles = this.getStyles()

    // Determinate the className
    // Determinate the padding of the terminal container
    const _classes = `Tab ${selected ? 'selected' : ''}`

    return(
      <div
        uid={uid}
        id={id}
        style={styles}
        onClick={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={_classes}
        {...tabProps}
      >
        {preTab}

        <span
          style={styles.Title}
          className='tab-title'
        >
          {title}
        </span>

        <div
          onClick={onClose}
          style={styles.Close}
          className='tab-close'
        >
          <svg
            viewBox='0 0 10.2 10.2'
            style={{ width: 8, height: 8 }}
          >
            <polygon
              fill={selected ? LIGHT_COLOR : PRIMARY_COLOR}
              points='10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 '
            />
          </svg>
        </div>

        {afterTab}
      </div>
    )
  }
}
