import Store from '../store'
import { remote } from 'electron'

export const close = () => remote.getCurrentWindow().close()

export const maximize = () => {
  remote.getCurrentWindow().maximize()
  Store.isMaximized = true
}

export const unmaximize = () => {
  remote.getCurrentWindow().unmaximize()
  Store.isMaximized = false
}

export const minimize = () => remote.getCurrentWindow().minimize()
