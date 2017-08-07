import {
  observable,
  observe }              from 'mobx'
import { remote }        from 'electron'
import Config            from './config'

// Import defaults
import DEFAULT_SHELL     from 'default-shell'
import { Colors }        from './defaults/colorPalette'

// Import utils
import { mergeArrays }   from './utils/arrays'
import { updateTitle }   from './utils/title'

const _window = remote.getCurrentWindow()

export default new class Store {
  // Empty or falsy values
  @observable tabs           = []
  @observable selectedTab    = -1
  @observable rows           = 0
  @observable cols           = 0
  @observable charWidth      = 0
  @observable charHeight     = 0
  @observable isMaximized    = _window.isFullScreen()
  @observable isFocused      = _window.isFocused()

  // Config based values
  // DEFAULTS
  @observable config         = {}
  @observable elements       = {}
  @observable styles         = {}
  @observable props          = {}
  @observable plugins        = []
  @observable args           = []
  @observable customCss      = ''
  @observable terminalColors = Colors
  @observable shell          = DEFAULT_SHELL

  async init() {
    // Observe selected tab changes, and title of the
    // selected tab changes, to manipualte the window's title
    observe(this, 'selectedTab', () => {
      // Update the title when the selectedTab changes
      updateTitle()

      // Observe when the current tab changes title
      observe(this.tabs[this.selectedTab], 'title', updateTitle)
    })

    // Setup event listeners
    _window.on('focus', () => this.isFocused = true )
    _window.on('blur',  () => this.isFocused = false)

    // OSX Bindings for maximized view
    _window.on('enter-full-screen',  () => this.isMaximized = true )
    _window.on('leave-full-screen',  () => this.isMaximized = false)

    // Other platforms Bindings
    _window.on('maximize',    () => this.isMaximized = true )
    _window.on('unmaximize',  () => this.isMaximized = false)


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
        this.args = this.config.shellArguments

      if(this.config.customCss)
        this.customCss = this.config.css

      if(this.config.colors)
        this.terminalColors = mergeArrays(Colors, this.config.colors)

      if(this.config.plugins)
        this.plugins = this.config.plugins
  }
}
