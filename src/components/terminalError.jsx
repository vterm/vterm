import { h, Component }     from 'preact'
import { bind }             from 'decko'
import { observer }         from 'mobx-preact'

// XTerm.js import
import XTerminal            from 'xterm'

// Styles and components
import absoluteFill         from '../styles/absoluteFill'
import Store                from '../store'
import { removeTab }        from '../actions/tabs'
import { isEmpty, isBlank } from '../utils/strings'
import { grey }             from '../styles/colors'
import { red, green, cyan } from 'chalk'

export class TerminalError extends Component {
  //
  // Lifecycle
  //
  componentDidMount() {
    this.createTerminal()
  }

  @bind
  createTerminal() {
    // Create the terminal and setup event hooks
    XTerminal.loadAddon('fit')

    // Take out values from config
    const { cursorBlink, cursorStyle } = Store.config

    this.Terminal = new XTerminal({ cursorBlink, cursorStyle })
    this.Terminal.on('open', this.onTerminalOpen)

    // Window Events listeners
    window.addEventListener('resize', this.onWindowResize)

    this.Terminal.open(this.Term, true)
    this.Terminal.fit()
  }

  //
  // Terminal and Shell setups
  //
  @bind
  setUpShell() {
    const { error } = this.props
    this.Terminal.write([
      green('d[ o_0 ]b'),
      cyan(''),
      cyan('Hi, this is YAT speaking to you miserable human.'),
      cyan(''),
      cyan('While I was loading your `config.js` file located at `~/.yat/`'),
      cyan('I encountered this error, take a look at it:'),
      cyan(''),
      red(error.stack.replace(/[\r\n]/g, '\n\r')),
      cyan(''),
      cyan('Now your broken configuration file has been backed-up inside the same folder,'),
      cyan('but it\'s not called `config.js.old`, and will be ignored. Your old config has'),
      cyan('been replaced with a brand new default config. Feel free to remake your adjustments'),
      cyan('and when you\'re ready proceed by pressing any key. I\'ll reboot myself!'),
      cyan(''),
      cyan('I am ready, at the firing of your keyboard Master!')
    ].join('\n\r')
    )
  }

  setUpTerminal() {
    const { cursorStyle } = Store.config

    this.Terminal.on('data', this.onTerminalData)

    // Temporary fix for custor-style not applied by xterm.js
    this.Terminal.element.classList.add(`xterm-cursor-style-${cursorStyle}`)
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
    this.setUpTerminal()
    this.setUpShell()
  }

  @bind
  onTerminalData(e) {

    // Refresh the page to reload the confug
    // On each keypress
    document.location.reload()
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

  render({ id, uid, selected, error }) {
    let Class = ['Terminal']

    // Add the class and focus the terminal if this tab is selected
    if(selected) Class.push('selected')
    if(selected && this.Terminal)  this.Terminal.focus()

    return(
      <div className={Class.join(' ')} id={id} style={this.getStyles()}>
        <div className='xterm' style={this.getStyles()} ref={(e) => this.Term = e}/>
      </div>
    )
  }
}
