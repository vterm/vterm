const StartTime = Date.now()

// Import render functionalities
import { h, render }           from 'preact'
import { remote, ipcRenderer } from 'electron'

// Components and utilities
import { App }                 from './components/app'
import { TerminalError } from './components/terminalError'
import { createTab }           from './actions/tabs'

const setUp = () => {
  // Create a first tab
  if(!window.isError) createTab()
  else
    // Create a new error tab
    createTab({
      title: 'Terminal Error',
      content: TerminalError,
      customProps: window.isError
    })

  // Render the application directly to the document's body
  // NOT SAFE TOUGH
  render(<App />, document.body)

  // contact the remove to notify that the window is ready to show up!
  ipcRenderer.send('ready')
}

setUp()
