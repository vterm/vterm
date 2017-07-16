import { h, Component }     from 'preact'
import { bind }             from 'decko'
import { observer }         from 'mobx-preact'

// XTerm.js import
import XTerminal            from 'xterm'

// Styles and components
import absoluteFill         from '../styles/absoluteFill'
import { Shell }            from './shell'
import Store                from '../store'
import { removeTab }        from '../actions/tabs'
import { isEmpty, isBlank } from '../utils/strings'
import { grey }             from '../styles/colors'

export class Terminal extends Component {
  //
  // Lifecycle
  //
  componentDidMount() {
    this.createTerminal()
  }

  @bind
  createTerminal() {
    // Take out values from config
    const { cursorBlink, cursorStyle } = Store.config

    // Create the terminal and setup event hooks
    this.Terminal = new XTerminal({ cursorBlink, cursorStyle })
    this.Terminal.on('open', this.onTerminalOpen)

    this.Terminal.open(this.Term, true)
  }

  //
  // Terminal and Shell setups
  //
  setUpShell() {
    const { getShell } = this.Shell
    let self = this

    getShell().on('data', this.onShellData)
    getShell().on('exit', this.onShellExit)

    // Set the title on startup since we emit no event.
    this.onShellTitle(getShell().process)
  }

  setUpTerminal() {
    const { cursorStyle } = Store.config
    const { cols, rows }  = this.props

    this.Terminal.on('data', this.onTerminalData)

    // TODO: On resize display the new size of the terminal
    this.Terminal.on('resize', this.onTerminalResize)
    this.Terminal.on('title', this.onShellTitle)
    this.Terminal.resize(cols, rows)

    // Temporary fix for custor-style not applied by xterm.js
    this.Terminal.element.classList.add(`xterm-cursor-style-${cursorStyle}`)
  }

  //
  // Window Events
  //
  @bind
  componentWillReceiveProps({ selected, cols, rows }) {
    const { Terminal } = this

    console.log(cols, rows);

    if(selected)
      Terminal.resize(cols, rows)
      Terminal.focus()

  }

  // Re render only if the selected tab changed
  shouldComponentUpdate({ selected }) {
    const { selcted: _selected } = this.props
    if(_selected !== selected) return true

    else return false
  }

  //
  // Terminal Events
  //
  @bind
  onTerminalOpen() {
    this.setUpShell()
    this.setUpTerminal()
  }

  @bind
  onTerminalResize({ cols, rows }) {
    const { getShell } = this.Shell

    getShell().resize(cols, rows)
  }

  @bind
  onTerminalData(data) {
    const { getShell } = this.Shell

    getShell().write(data)
  }

  //
  // Shell Events
  //
  @bind
  onShellData(data) {
    this.Terminal.write(data)
  }

  @bind
  onShellExit() {
    removeTab(this.props.id)
  }

  @bind
  onShellTitle(_title) {
    const { getShell } = this.Shell

    let title = _title

    // Use and xterm escape title sequence when it's avaible
    // Otherwise use the shell process' name
    if(isEmpty(_title) || isBlank(_title)) title = getShell().process
    this.title = title

    Store.tabs[this.props.id].title = title
  }

  //
  // Styling and rendering
  //
  @bind
  getStyles() {
    return {
      ...absoluteFill,
      padding: 8,
      display: (this.props.selected) ? 'block' : 'none'
    }
  }

  render({ id, uid, selected, cols, rows }) {
    let Class = ['Terminal']

    // Add the class and focus the terminal if this tab is selected
    if(selected) Class.push('selected')

    console.log(cols, rows);

    return(
      <div className={Class.join(' ')} id={id} style={this.getStyles()}>
        <Shell className='Shell' id={id} style={{display: 'none'}} ref={(e) => this.Shell = e}/>
        <div className='xterm' style={this.getStyles()} ref={(e) => this.Term = e}/>
      </div>
    )
  }
}
