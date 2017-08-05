import { h, Component } from 'preact'
import { spawn }        from 'node-pty'
import { bind }         from 'decko'
import Store            from '../store'
import fixPath          from 'fix-path'

// Import defaults
import DEFAULT_SHELL    from 'default-shell'
import { HOMEDIR }      from '../defaults/variables'

export class Shell extends Component {
  // This is where the shell object
  // will live and will be destroied
  // when the component will unmount
  shell = null

  // This method takes a series of values
  // and puts them into an object to create
  // a set of options for node-pty to start with.
  //
  // Here is the list:
  // - cols and rows for the starting
  //   size of the terminal
  // - Default shell name for OSs like Windows
  //   where otherwhise it's UGLY
  // - cwd to make the shell always start
  //   in the users's home directory
  // - The default env for the shell

  getOptions() {
    // This fixes the $PATH value to not
    // be set correctly on macOS, and so
    // throw 'Unknown command' at everything
    // run that's not inside of the /bin folder
    //
    // https://github.com/vterm/vterm/issues/29
    fixPath()


    // Take values from the store and
    // from the App's package.json
    const { cols, rows } = Store
    const { version, name } = window.require('../package.json')

    const options = {
      cols, rows,
      name: 'Shell',
      cwd: HOMEDIR,

      // Building the default env:
      // - We take the system env
      // - Then add the TERM variable to
      //   make it support 256 colors
      // - Then we put name and version of
      //   out terminal to follow the standards
      env: {
        ...process.env,

        TERM: 'xterm-256color',
        TERM_PROGRAM: name,
        TERM_PROGRAM_VERSION: version
      }
    }

    return options
  }

  componentDidMount() {
    // Take values from the store and
    // the ID from the local class
    const { args, shell, cols, rows } = Store
    const { id } = this.props

    // Get options
    const options = this.getOptions()

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
      key={id}
      style={{ display: 'none' }}
      {...shellProps}
    />
  }
}
