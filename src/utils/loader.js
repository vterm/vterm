import Module from 'module'
import * as Preact from 'preact'
import Store from '../store'
import Notify from '../notify'
import * as Colors from '../styles/colors'

const __load = Module._load


Module._load = function (path) {
  switch (path) {
    case 'preact':
      return Preact
    case 'yat/store':
      return Store
    case 'yat/notify':
        return Notify
    case 'yat/colors':
        return Colors
    default:
      return __load.apply(this, arguments)
  }
}

export default (module) => window.require(module)
