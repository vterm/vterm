import { ipcRenderer } from 'electron'
import { noop }        from './noop'

// Import defaultss
import { BASE } from '../defaults/variables'
import {
  DEFAULT_ARGS, 
  YARN_EXECUTABLE
} from '../defaults/yarn'

export default class Yarn {
  // Where an eventual error
  // will be located
  error  = null

  // This is where the running
  // process will be stored
  proc   = null

  // Stdiut function caleed onData
  stdout = noop

  // Stderr function called onData
  stderr = noop

  // Default values for cmd and props
  cmd    = []
  props  = {}

  // This functions executes yarn with a custom
  // series of arguments == commands and custom props
  // for the `child_process.spawn` function
  //
  // This function returns the new process.
  // The hooks for stderr and stdout should be set
  // before calling this function
  run(commands = [], props = {}) {
    // Extract values from the
    // local class object
    const { stderr, stdout } = this

    return new Promise(resolve => {

      // The cmd is composed by:
      // - Yarn path for the executable
      // - Commands defined by user
      // - Yarn default arguments like
      //   --json, --no-emoji, --modules-folder, etc
      this.cmd = [
        ...commands,
        ...DEFAULT_ARGS
      ]

      // Setting props merging the cwd
      // for yarn to be executed in(.yat),
      // the default ENV and other custom props
      this.props = {
        stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ],
        cwd: BASE,
        ...props
      }

      // Execute the processand setup event listeners
      ipcRenderer.send('YARN_START', YARN_EXECUTABLE, this.cmd, this.props)

      // Listen for logs
      ipcRenderer.on('YARN_LOG', this.stdout)
      ipcRenderer.on('YARN_ERR', this.stderr)

      // When the process closes, means
      // that the update has finished
      ipcRenderer.on('YARN_EXIT', resolve)
    })
  }
}
