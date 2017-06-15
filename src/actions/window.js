import Store from '../store'
import { remote } from 'electron'

export const close = () => remote.getCurrentWindow().close()
export const maximize = () => remote.getCurrentWindow().maximize()
export const unmaximize = () => remote.getCurrentWindow().unmaximize()
