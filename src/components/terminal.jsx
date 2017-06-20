import { h, Component } from 'preact'
import { bind }         from 'decko'
import { observer }     from 'mobx-preact'

// XTerm.js imports
import XTerminal        from 'xterm'
import styles           from 'xterm/dist/xterm.css'

// Styles and components
import absoluteFill     from '../styles/absoluteFill'
import { Shell }        from './shell'
import Store            from '../store'
import { removeTab }    from '../actions/tabs'
import { isEmpty, isBlank } from '../utils/strings'
import { grey } from '../styles/colors'

@observer
export class Terminal extends Component {
  //
  // Lifecycle
  //
  componentDidMount() {
    this.createTerminal()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  @bind
  createTerminal() {
    // Create the terminal and setup event hooks
    XTerminal.loadAddon('fit')

    // Take out values from config
    let { cursorBlink, cursorStyle } = Store.config

    this.Terminal = new XTerminal({ cursorBlink, cursorStyle })
    console.log(this.Terminal);
    this.Terminal.on('open', this.onTerminalOpen)
    this.Terminal.on('title', this.onShellTitle)

    // Window Events listeners
    window.addEventListener('resize', this.onWindowResize)

    this.Terminal.open(this.Term, true)
    this.Terminal.fit()
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
    this.Terminal.on('data', this.onTerminalData)
    this.Terminal.on('resize', this.onTerminalResize)
    this.Terminal.element.querySelector('.xterm-viewport').style.overflow = 'auto'
    this.Terminal.element.querySelector('.xterm-viewport').style.overflowX = 'hidden'
  }

  //
  // Window Events
  //
  @bind
  onComponentLoad() {
    const { Terminal } = this
    Terminal.fit()
  }

  @bind
  onWindowResize() {
    this.Terminal.fit()
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
      background: 'transparent',
      padding: 8,
      visibility: (this.props.selected) ? 'visible' : 'hidden'
    }
  }

  render({ id, uid, selected }) {
    let Class = ['Terminal']
    if(selected) Class.push('selected')

    if(selected && this.Terminal) {
      this.Terminal.fit()
      this.Terminal.focus()
    }

    return(
      <div className={Class.join(' ')} id={id} style={this.getStyles()}>
        <Shell className='Shell' id={id} style={{display: 'none'}} ref={(e) => this.Shell = e}/>
        <div className='xterm' style={this.getStyles()} ref={(e) => this.Term = e}/>
      </div>
    )
  }
}
