import { render, h }   from 'preact'
import { ipcRenderer } from 'electron'

import Config          from './config'
import Store           from './store'
import Plugins         from './plugins'

import { App }         from './components/app'
import { createTab }   from './actions/tabs'

/*
 * SEE: https://github.com/LucaT1/yat/pull/6
 *
 * Here we are bootstrapping the application programmatically
 * We are running preselected tasks asyncronously in order
 * To wait for every change before proceding, leaving no margin
 * For \undefined\ errors or mistakes.
 * This is the current queee of actions:
 * - Load configuration
 * - Setup store.js with config's values
 * - Setup global events listeners, like configuration
 *   update or window maximize/minimize
 * - Load plugins with the store fully setup and give
 *   them the possibility to execute functions even on
 *   a specific situation, for example `onConfigUpdate`
 * - Render the UI to the user with the effects caused by plugins
 *
 * This will also involve using `pify` promisify to create
 * FS calls as promises and rewriting part of the loader and configuration
 * to make them classes. Also involves creating a new plugins system
 */
export default async () => {
  // 1. Load configuration
  //  - Checks if the base folder exists
  //  - Load configuration otherwise saves the error
  await Config.load()

  // 2. Setup store
  //  - Setting up window's title and event listeners
  //  - Checking for config errors
  //  - Moving config values to the store
  await Store.init()

  // 3. Load plugins and schedule events
  //  - Fetch all plugins
  //  - Load all pluigns
  //  - Setup event listeners
  await Plugins.load()

  // 4. Render the UI
  //  - <App>
  //    - <Tabs />
  //    - <Terminals />
  //  - </App>
  render(<App />, document.body)

  // 5. Open a new tab
  createTab()

  // 6. Tell the renderer to show the main window
  ipcRenderer.send('ready')
}
