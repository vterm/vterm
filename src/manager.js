import { observable }   from 'mobx'
import { bind }         from 'decko'
import { platform }     from 'os'

import Plugins          from './plugins'
import Yarn             from './utils/yarn'
import files            from './utils/files'
import { isEmptyBlank } from './utils/strings'

// Import specific core plugins
// based on the platform
import {
  OSX_CORE_PLUGINS,
  WIN_CORE_PLUGINS,
  LINUX_CORE_PLUGINS
} from './defaults/variables'


export default new class Manager {
  // List of core plugins
  // that MUST be installed
  corePlugins =
    (platform() == 'darwin') ? OSX_CORE_PLUGINS   :
    (platform() == 'win32')  ? WIN_CORE_PLUGINS   :
    (platform() == 'linux')  ? LINUX_CORE_PLUGINS : []

  // Array where all the plugins that
  // are missingPlugins are stored
  missingPlugins = []

  // Values indicating the currentJob
  // and the relative progess of it
  @observable currentJob = ''
  @observable progress   = ''
  @observable isError    = false
  @observable error      = ''

  // Array containing all the logs
  // from the stdout of the process
  @observable log        = []

  // Whenever the stdout gets some data
  // we call this funtion to update the
  // current state with the brand new data
  @bind
  onData(_data) {
    const spliced = _data.split('\n')

    for (let i = 0; i < spliced.length; i++) {
      const data = spliced[i]

      if(isEmptyBlank(data)) break

      try {
        // parse the data and push it to
        // the logs
        const parsed = JSON.parse(data)

        this.log.push(parsed)
      } catch (e) {
        // If we catch an error in the parsing
        // we warn it to the console
        return console.warn(
          'Corrupted output from yarn process:', e, data
        )
      }
    }
  }

  // Function called when the stderr
  // recives some data(bad sign :/)
  @bind
  onError(data) {
    this.isError = true
    this.error   = data
  }

  async check() {
    const { corePlugins, missingPlugins } = this
    for (let i = 0; i < corePlugins.length; i++) {
      const name   = corePlugins[i]
      const exists = await Plugins.exists(name)

      if(!exists)
        missingPlugins.push(name)
    }
  }

  @bind
  async loadCore() {
    // Check for missing plugins
    await this.check()

    // Extract values from the local object
    const {
      missingPlugins,
      corePlugins,
      install
    } = this

    console.log('Starting installation', new Date().getTime());

    // If there are some missing
    // plugins insttall them
    if(missingPlugins) await install(missingPlugins)

    console.log('all plugins installed', new Date().getTime());

    // Then load them up!
    for (let i = 0; i < corePlugins.length; i++) {
      Plugins.load(corePlugins[i])
    }
  }

  @bind
  async install(packages) {
    const installer = new Yarn

    installer.stdout = this.onData
    installer.stderr = this.onError

    await installer.run([ 'add', ...packages ])
  }

  @bind
  async uninstall(packages) {
    const installer = new Yarn

    installer.stdout = this.onData
    installer.stderr = this.onError

    await installer.run([ 'remove', ...packages ])
  }

  @bind
  async update() {
    const installer = new Yarn

    installer.stdout = this.onData
    installer.stderr = this.onError

    await installer.run([ 'update' ])
  }
}
