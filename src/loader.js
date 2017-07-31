import Module          from 'module'
import Decko, { bind } from 'decko'

// Cached libraries
import * as Preact     from 'preact'
import * as Mobx       from 'mobx'
import MobxPreact      from 'mobx-preact'

// VTerm mdules
import * as Notify     from './actions/notify'
import * as _Tabs      from './actions/tabs'
import * as Window     from './actions/window'
import * as Colors     from './defaults/colors'
import * as Extend     from './extend'

// VTerm components
import { App }            from './components/app'
import { Terminals }      from './components/terminals'
import { Terminal }       from './components/terminal'
import { Shell }          from './components/shell'
import { Tabs }           from './components/tabs'
import { Tab }            from './components/tab'
import { CreateTab }      from './components/createtab'
import { Styles }         from './components/styles'
import { TitleBar }       from './components/titlebar'
import { WindowControls } from './components/windowControls'

import Store           from './store'
import Config          from './config'
import Plugins         from './plugins'

export default new class Loader {
  // Cache storage, by default filled up with modules
  // that VTerm requires for himself and that are avaible
  // to the user.
  cached = {
    'preact':      Preact,
    'mobx':        Mobx,
    'mobx-preact': MobxPreact,
    'decko':       Decko
    // NEEDS TO BE COMPLETED
  }

  // Use cache ?
  cache = true

  // Modules defined by the user to return custom imports
  // For example this could be helpful when a custom plugin
  // has as a dependency another custom plugin and the developer
  // wants to use a fancy custom name, or simply avoid conflicts
  // with other npm's modules with the same name(without the prefix)
  customModules = {
    'vterm/loader':  this,
    'vterm/store':   Store,
    'vterm/colors':  Colors,
    'vterm/config':  Config,
    'vterm/plugins': Plugins,
    'vterm/extend':  Extend,
    'vterm/actions': {
      Tabs: _Tabs,
      Window,
      Notify
    },
    'vterm/components': {
      App,
      Terminal,
      Terminals,
      Tab,
      Tabs,
      CreateTab,
      Shell,
      Styles,
      TitleBar,
      WindowControls
    }
  }

  constructor() {
    // Backing up original `_load` function since we're going
    // to use this when the user requires a non-custom module
    const _load       = Module._load

    // Extract cache and cached from this
    const {
      cache,
      cached,
      customModules
    } = this

    // Rewrite `_load` function to support custom defined
    // modules and cached modules. This helps the app spin
    // A LOT faster and enables the user to create some cool
    // Implementations
    Module._load = function(path) {
      // Figure out if the requested module is cached
      // or is a custom-defined module
      // Obviously we're going to ignore this if
      // the user has set the cache to false

      // Aliases for consistency
      const _cached = cache ? cached : {}
      const _custom = customModules

      // Checking if the module is
      // cached or is custom
      if(_cached[path] || _custom[path]) {
        // Then return it's cached
        // or custom version!
        return _cached[path] || _custom[path]

      } else {
        // Call the default _load function, and if we
        // recive an ES6 module we return the default value
        const _return = _load.apply(this, arguments)

        if(_return.__esModule) return _return.default
        else                   return _return
      }
    }
  }

  // Add a custom module to the list
  // Parameters are:
  // - name: name of the custo module used
  //         as the first parameter in the
  //         `require` function.
  // - value: object, string or whatver
  //          that the `require` function
  //          will return.
  @bind
  setCustomModule(name, value) {
    this.customModules[name] = value
  }

  // Set to true to use cache
  // False to disable
  @bind
  setUseCache(value) {
    this.cache = value
  }

  // Check if a module is custom
  @bind
  isCustom(module) {
    return this.customModules[module] ? true : false
  }

  // This is a promisified version of the commonjs
  // `require` function, used in vterm and by external plugins
  load(module, { cache } = {}) {
    const {
      cached,
      isCustom,
      setUseCache
    } = this

    // `__cache` is the value of cache before changing
    // it for this particular request
    const __cache   = this.cache

    // Set the cache JUST FOR THIS REQUEST
    // Resetting in before resolving/rejecting
    if(typeof cache == 'boolean') setUseCache(cache)

    return new Promise((resolve, reject) => {
      try {
        // Load the module with
        // the native require function
        const _module = window.require(module)

        // If the user enable the cache,
        // Store the `_module` value inside of
        // our cache, and it will be avaible
        // for future use
        //
        // IMPORTANT:
        // We only cache the module if
        // it's not a custom one!!
        if(cache && !isCustom(module))
          // Then let's cache it
          cached[module] = _module

        // Reverting the cache value
        // back to the original one
        setUseCache(__cache)

        // If veverything went OK
        // let's resolve the promise
        resolve(_module)
      } catch (err) {
        // Reverting the cache value
        // back to the original one
        setUseCache(__cache)

        // Reject with the error
        reject(err)
      }
    })
  }
}
