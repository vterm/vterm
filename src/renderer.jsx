const StartTime = Date.now()
import { h, render }  from 'preact'
import { bind }       from 'decko'
import { App }        from './components/app'
import { remote, ipcRenderer }     from 'electron'
import { createTab }  from './actions/tabs'

render(<App />, document.body)
createTab()

remote.getCurrentWindow().focus()
ipcRenderer.send('ready')
