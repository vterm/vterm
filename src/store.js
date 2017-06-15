import { observable }      from 'mobx'
import { loadConfig }      from './config'
import { config, babelrc } from './paths'
import { remote }          from 'electron'
import defaultShell        from 'default-shell'

class Store {
  @observable tabs           = []
  @observable selectedTab    = 0
  @observable config         = loadConfig()
  @observable windowTitle    = (this.tabs[this.selectedTab]) ? this.tabs[this.selectedTab].title : ''
  @observable tabsWidth      = 0
  @observable isMaximized    = false
  @observable isFocused      = false
  @observable shell          = this.config.shell || defaultShell
  @observable shellArguments = this.config.shellArguments || []

  @observable
  elements = this.config.customElements || {}
}

const store = window.store = new Store

const updateWidth = () => {
  store.tabsWidth   = document.querySelector('.tabs-container').offsetWidth
  Store.isMaximized = remote.getCurrentWindow().isMaximized()
}

window.addEventListener('load', updateWidth)
window.addEventListener('resize', updateWidth)

remote.getCurrentWindow().on('focus', () => store.isFocused = true)
remote.getCurrentWindow().on('blur', () => store.isFocused = false)

export default store
