import { h, Component } from 'preact'
import { spawn }        from 'node-pty'
import { bind }         from 'decko'
import Store            from '../store'

// Import defaults
import DEFAULT_SHELL    from 'default-shell'
import { HOMEDIR }      from '../defaults/variables'

export class Shell extends Component {
  // This is where the shell object
  // will live and will be destroied
  // when the component will unmount
  shell = null

  componentDidMount() {
    // Take values from the store
    const {
      shellArguments: args,
      cols, rows, shell,
    } = Store

    // Get the shell ID
    const { id } = this.props

    const options = {
      name: 'xterm-256color',
      env: process.env,
      cwd: HOMEDIR,
      cols, rows
    }

    this.shell = Store.tabs[id].shell =
      spawn(shell, args.peek(), options)
  }
  
  // Kill the pty when the component gets unmounted
  // = the tab gets closed
  componentWillUnmount() {
    this.shell.kill()
  }

  // Rreturns the shell located in the
  // local class.
  @bind
  getShell() {
    return this.shell
  }

  // Render the shell of VTerm; This contains:
  // - An empty div just to link to this class
  //   and let the user be able to retrive
  //   the shell object.
  //
  //   This element has also the ID for reference

  render({ id }) {
    // Retriving custom props
    const { Shell: shellProps } = Store.props

    return <div
      style={{ display: 'none' }}
      id={'Shell-'+id}
      {...shellProps}
    />
  }
}
