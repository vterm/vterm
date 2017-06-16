import Module      from 'module'
import * as Preact from 'preact'
import * as mobx   from 'mobx'
import mobxPreact  from 'mobx-preact'

import * as Notify from '../actions/notify'
import * as Tabs   from '../actions/tabs'
import * as Window from '../actions/window'

import Store       from '../store'
import * as Colors from '../styles/colors'

const __load = Module._load


Module._load = function (path) {
  switch (path) {
    case 'preact':
      return Preact

    case 'mobx':
      return mobx

    case 'mobx-preact':
      return mobxPreact

    case 'yat/store':
      return Store

    case 'yat/actions':
      return {
        notify: Notify,
        tabs: Tabs,
        window: Window
      }

    case 'yat/colors':
      return Colors

    default:
      return __load.apply(this, arguments)
  }
}

export default (module) => window.require(module)
