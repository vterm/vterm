import { h, Component }  from 'preact'
import { bind }          from 'decko'
import Store             from '../store'

// Terminal and shell constructors
import TERMINAL          from 'xterm'
import { Shell }         from './shell'

// Costants, utils and actions
import { PADDING }       from '../defaults/variables'
import { isEmptyBlank }  from '../utils/strings'
import { removeTab }     from '../actions/tabs'

export class Terminal extends Component {
  shell = null

  // When the component recives new props
  // and is selected we resize it!
  @bind
  componentWillReceiveProps({ selected, cols, rows }) {
    const { terminal } = this

    if(selected)
      // Resize the terminal
      terminal.resize(cols, rows)
  }

  // Re render only if the selected tab changed
  shouldComponentUpdate({ selected }) {
    const { selcted: _selected } = this.props
    if(_selected !== selected) return true

    else return false
  }

  // Lifecycle; This is it:
  // - Setup Shell and its EVENTS:
  //   - onShellData
  //   - onShellExit
  //
  // - Create a new Terminal from its constructor,
  //   Setup event listeners and then open it
  //
  //   EVENTS:
  //   - onTerminalOpen
  //   - onTerminalData
  //   - onTerminalTitle(we sometimes use the shell one)
  //   - onTerminalResize
  componentDidMount() {
    // SETTING UP THE SHELL:
    // - Setting the local shell value
    //   to what `getShell` returns
    //
    //   To simplify access we then
    //   extrapolate it from `this`
    this.shell = this.__shell.getShell()
    const { shell } = this

    // - SETTING UP EVENTS:
    //   - onShellData
    //   - onShellExit
    shell.on('data', this.onShellData)
    shell.on('exit', this.onShellExit)


    // SETTING UP THE TERMINAL:
    // - Taking values from the Store
    // - Taking ID, cols and rows from props
    // - Creating the Terminal object
    const { cursorBlink, cursorStyle } = Store.config
    const { id, cols, rows } = this.props

    // Creating the terminal with the default
    // options plus TODO: custom ones
    this.terminal = Store.tabs[id].terminal =
      new TERMINAL({
        cursorBlink,
        cursorStyle,
        cols,
        rows
      })

    const { terminal } = this
    // - SETTING UP EVENTS:
    //   - onTerminalOpen
    //   - onTerminalData
    //   - onTerminalTitle (linked to the shell)
    //   - onTerminalResize
    terminal.on('open',   this.onTerminalOpen  )
    terminal.on('data',   this.onTerminalData  )
    terminal.on('title',  this.onTerminalTitle )
    terminal.on('resize', this.onTerminalResize)

    // Lastly open the terminal
    // Set autofocus to true for future-proofness
    // plannings for version 3.0
    terminal.open(this.__term, true)

    // Immediatly force the terminal to find
    // A title to fill the tab gap!
    this.onTerminalTitle(this.shell.title)
  }

  // We destroy the terminal since the
  // killing of the pty is handled by itself
  // on the componentWillUnmount of the
  // <Shell /> component
  componentWillUnmount() {
    this.terminal.destroy()
  }

  // When we recive ANY kind of data
  // print it to the terminal in order
  // to display it to the user
  //
  // TIP: Use customKeyHandlers to
  // intercept binds or keystrokes
  @bind
  onTerminalData(data) {
    this.shell.write(data)
  }

  // When the terminal gets resized
  // = props change and the event is fired
  // we have to tell the pty to resize too.
  @bind
  onTerminalResize({ cols, rows }) {
    this.shell.resize(cols, rows)
  }

  // TODO: Something, for now it's just
  //       here for reference!
  @bind
  onTerminalOpen() {}

  // This is clled when we recive a shell title;
  // Here we use the xterm escape sequence
  // if it's avaible, but if the name is emptyOrBlank
  // we return the shell title
  @bind
  onTerminalTitle(__title) {
    // Shell title
    let title = ''
    const _title = this.shell.process

    // If the xterm value if it exists
    if(isEmptyBlank(__title)) title = _title

    // Otherwise use pty's title
    else                      title = __title

    // Update the title in the store
    Store.tabs[this.props.id].title = title
  }

  // When we recive ANY kind of data
  // print it to the terminal in order
  // to display it to the user
  //
  // TIP: Use customKeyHandlers to
  // intercept binds or keystrokes
  @bind
  onShellData(data) {
    this.terminal.write(data)
  }

  // When the shell closes we remove the current
  // tab and the terminal will destroy by itself
  //
  // TIP: Look at componentWillUnmount
  @bind
  onShellExit() {
    removeTab(this.props.id)
  }

  // Styles for our terminal
  // Using:
  // - Absolute positioning fillig all the space
  //   the space left up
  // - Configurable padding for the terminal
  // - Display none/block either if
  // it's selected or not
  // - Extra styles setted by the user and/ore the plugins.
  getStyles() {
    // Extract values from local class
    const { selected, cols, rows, charHeight, charWidth } = this.props

    const { Terminal: userStyles }   = Store.config.styles

    // Plugin styles
    const { Terminal: pluginStyles } = Store.styles

    // Styles array
    const styles = {
      // Absolute positioning
      position: 'absolute',
      top: 0, bottom: 0,
      right: 0, left: 0,

      display: selected ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',

      terminalContainer: {
        width: cols * charWidth,
        height: rows * charHeight
      },

      // User/plugin custom styles
      ...(userStyles   || {}),
      ...(pluginStyles || {})
    }

    return styles
  }

  // Render the Terminal; This contains:
  // - Custom <preTermina/> elements
  // - Default <Shell />
  // - Default <div /> used as xterm wrapper
  // - Custom <afterTerminal /> elements

  render({ id, uid, selected, cols, rows }) {
    // Retrive custom elements and
    // custom pre/after elements
    const { preTerminal, afterTerminal } = Store.elements

    // Retriving custom props and our styles
    const { Terminal: terminalProps } = Store.props
    const styles = this.getStyles()

    // Determinate the className
    // Determinate the padding of the terminal container
    const _classes = `Terminal ${selected ? 'selected' : ''}`
    const padding = Store.config.padding || PADDING

    return(
      <div
        className={_classes}
        id={id}
        style={styles}
        {...terminalProps}
      >
        {preTerminal}
        <Shell id={id} ref={(e) => this.__shell = e}/>
        <div
          className='xterm'
          style={styles.terminalContainer}
          ref={(e) => this.__term = e}
          {...terminalProps}
        />
        {afterTerminal}
      </div>
    )
  }
}
