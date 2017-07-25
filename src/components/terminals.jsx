import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import { bind }         from 'decko'
import Store            from '../store'

// Utils
import getDimentions    from '../utils/fit'

// Import the components for the UI/UX
import { Terminal }     from './terminal'
import { Styles }       from './styles'

@observer
export class Terminals extends Component {
  // Styles for the testing node
  _styles = {
    display: 'inline',
    visibility: 'hidden'
  }

  // This is the test node to get the
  // width and height of the terminal's charters
  //
  // We are usign `w` as it is a common tester
  // even with unicode charters
  _tester = () =>
    <span style={this._styles}>w</span>

  getTabs() {
    // Ignore undefined objects with
    // filter(undefined == removed)
    return Store.tabs.filter(Boolean)
  }

  componentDidMount() {
    // Setting up global event listener:
    // When the page is resized we get
    // the new charter width and height and
    // calculate how many rows and cols our
    // terminal will have.
    //
    // We do also this onMount so that we have
    // a starting vlaue for cols and rows
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  componentWillUnmount() {
    // Removing the resize event listener
    window.removeEventListener('resize', this.onResize)
  }

  @bind
  onResize() {
    // Calculate dimentions
    const { cols, rows } =
      getDimentions(this.container, this.tester)

    Store.cols = cols
    Store.rows = rows
  }

  // Styles for the terminl's container
  // Using:
  // - Absolute positioning fillig all the space
  //   the space left up and keeping a margin
  //   from the top fixed.
  // - zIndex of 10
  // - Extra styles setted by the user
  //   and/ore the plugins.

  getStyles() {
    const { Terminals: userStyles }   = Store.config.styles

    // Plugin styles
    const { Terminals: pluginStyles } = Store.styles

    const styles = {
      // Absolute positioning
      position: 'absolute',
      top: 32, bottom: 0,
      right: 0, left: 0,

      // zIndex
      zIndex: 10,

      // User/plugin custom styles
      ...(userStyles   || {}),
      ...(pluginStyles || {})
    }

    return styles
  }

  // Render the Termial container; This contains:s
  // - Custom <preTerminals /> elements
  // - Default <Style /> or custom one
  // - Default <Tester /> tag used to get
  //   cols and rows number
  // - Custom <afterTerminals /> elements

  render() {
    // Extract value for the local object
    const { _tester } = this

    // Take values from the Store
    const { cols, rows } = Store

    // Retrive custom elements and
    // custom pre/after elements
    const {
      preTerminals, afterTerminals,
      Terminal: _Terminal,
      Styles: _Styles,
      // TODO: Notifications
    } = Store.elements

    // Retriving custom props and our styles
    const { Terminals: terminalsProps } = Store.props
    const styles = this.getStyles()

    // Determinate the components
    // we need to render
    const __Terminal  = _Terminal  ? _Terminal  : Terminal
    const __Styles = _Styles ? <_Styles /> : <Styles />

    return(
      <div
        className='terminals-container'
        _selected={Store.selectedTab}
        ref={e => this.container = e}
        style={styles}
        {...terminalsProps}
      >
        {preTerminals}

        {/* Custom styles for the terminals,
          user customizations and
          plugins customizations */}
        {__Styles}

        {/* Tester element used to get charter width and height */}
        <_tester ref={({base}) => this.tester = base} />

        {this.getTabs().map( item => {
          // Take values from the item
          const {
            id, uid, props,
            content: _content
          } = item

          // Declare if it is selected
          const selected = id === Store.selectedTab

          return !Content
            ? <__Terminal cols={cols} rows={rows} selected={selected} uid={uid} id={id} {...props} />
            : <_content cols={cols} rows={rows} selected={selected} uid={uid} id={id} {...props} />
        })}
        {afterTerminals}
      </div>
    )
  }
}
