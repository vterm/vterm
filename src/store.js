/*
import { observable, intercept }        from 'mobx'
import { remote }                       from 'electron'
import defaultShell                     from 'default-shell'

// Config and plugins loading utilities
import { loadConfig }                   from './config'
import { config, babelrc }              from './paths'
import { loadPlugins, errorPlugins }    from './plugins'

// Default utilities and values
import defaultColors, { customPalette } from './defaults/colors'
import { mergeArrays }                  from './utils/arrays'
const mergedColors = mergeArrays(defaultColors, customPalette)

class Store {

  // Empty [or] falsy by default values
  @observable tabs           = []
  @observable selectedTab    = 0
  @observable isMaximized    = false
  @observable isFocused      = false

  // The config itself
  // And config based values
  @observable config         = loadConfig()
  @observable elements       = this.config.customElements || {}
  @observable shell          = this.config.shell          || defaultShell
  @observable shellArguments = this.config.shellArguments || []
  @observable customCss      = this.config.css            || ''

  // plugins
  @observable plugins        = loadPlugins()
  @observable errorPlugins   = errorPlugins

  // The rest
  @observable windowTitle    = this.tabs[this.selectedTab] ? this.tabs[this.selectedTab].title : ''
  @observable terminalColors = mergeArrays(mergedColors, this.config.colors || [])
}

const store = new Store

remote.getCurrentWindow().on('focus', () => store.isFocused = true )
remote.getCurrentWindow().on('blur',  () => store.isFocused = false)

// Intercept `windowTitle` changes and
// update window.title value
intercept(store, 'windowTitle', ({ newValue }) => window.title = newValue)

export default store
*/

export default new class Store {}
