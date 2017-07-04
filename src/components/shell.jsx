import { h, Component } from 'preact'
import { spawn }        from 'node-pty'
import { bind }         from 'decko'
import Store            from '../store'
import defaultShell     from 'default-shell'

export class Shell extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const shell = (typeof Store.shell == 'string') ? Store.shell : defaultShell
    const _arguments = Store.shellArguments ? Store.shellArguments.peek() : []
    const options = { name: 'xterm-color', env: process.env }

    this.shell = spawn(shell, _arguments, options)
  }

  @bind
  getShell() {
    return this.shell
  }

  render({ id }) {
    return <div style={{ display: 'none' }} id={'Shell-'+id}></div>
  }
}
