import { h, Component } from 'preact'
import { spawn }        from 'node-pty'
import { bind }         from 'decko'
import { homedir }      from 'os'
import defaultShell     from 'default-shell'
import Store            from '../store'

export class Shell extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const shell = (typeof Store.shell == 'string') ? Store.shell : defaultShell
    const _arguments = Store.shellArguments ? Store.shellArguments.peek() : []
    const options = {
      name: 'xterm-256color',
      env: process.env,
      cwd: homedir()
    }

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
