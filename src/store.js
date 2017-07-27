import DEFAULT_SHELL   from 'default-shell'
import { observable }  from 'mobx'
import { remote }      from 'electron'

import Config          from './config'
import { Colors }      from './defaults/colors'
import { mergeArrays } from './utils/arrays'

export default new class Store {
  // Empty or falsy values
  @observable tabs           = []
  @observable selectedTab    = 0
  @observable rows           = 0
  @observable cols           = 0
  @observable charWidth      = 0
  @observable charHeight     = 0
  @observable isMaximized    = false
  @observable isFocused      = false

  // Config based values
  // DEFAULTS
  @observable config         = {}
  @observable elements       = {}
  @observable styles         = {}
  @observable props          = {}
  @observable plugins        = []
  @observable shellArguments = []
  @observable customCss      = ''
  @observable terminalColors = Colors
  @observable shell          = DEFAULT_SHELL

  async init() {
    // Setup window title based on selected tab
    document.onload = () =>
      window.title = this.tabs[this.selectedTab].title || ''

    // Setup event listeners
    remote.getCurrentWindow().on('focus', () => this.isFocused = true )
    remote.getCurrentWindow().on('blur',  () => this.isFocused = false)


    // Retrive from the Config class
    // if there was an error in the loading process
    const isError = await Config.isError()

    // If there is this error
    if(isError)
      // Set the Store `isError` value to the error
      this.isError = Config.error
    else
      // If everything is Hunky Dory we can proceed
      // and fill in all config-based values
      this.config = await Config.get()

      // Then setup all the other values
      if(this.config.elements)
        this.elements       = this.config.elements

      if(this.config.shell)
        this.shell          = this.config.shell

      if(this.config.shellArguments)
        this.shellArguments = this.config.shellArguments

      if(this.config.customCss)
        this.shellArguments = this.config.css

      if(this.config.colors)
        this.terminalColors = mergeArrays(Colors, this.config.colors)

      if(this.config.plugins)
        this.plugins = this.config.plugins
  }
}
