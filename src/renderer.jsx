const StartTime = Date.now()
import { h, render }  from 'preact'
import { bind }       from 'decko'
import { App }        from './components/app'
import { remote, ipcRenderer }     from 'electron'
import { createTab }  from './actions/tabs'
import { inject }     from './utils/styles'
import Scrollbar      from './styles/scrollbar'
import terminalColors from './styles/terminalColors'
import { setTerminalColors } from './utils/terminalColor'

render(<App />, document.body)
createTab()
inject(Scrollbar)
inject(setTerminalColors(terminalColors, 'rgba(33, 33, 33, 1)'))

remote.getCurrentWindow().focus()
ipcRenderer.send('ready')
