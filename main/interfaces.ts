/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */

import { IObservableArray } from 'mobx'
import { TMessage } from './types'
import { ITheme } from 'xterm'

/**
 * 
 * Logger class, implementing ILogger inteface, holding
 * logs, handlers, responsible for catching logs changes,
 * sending them to the respecitve handlers and giving developers
 * the tools to log out strings and more complex values
 * 
 */
export interface ILogger {
  logs: IObservableArray<ILog>
  handlers: Function[]

  addListener: (handler: Function) => void
  removeListener: (handler: Function) => void

  log: (type: string, msg: TMessage[]) => number
  trace: (msg: TMessage[]) => number
  done: (msg: TMessage[]) => number
  warn: (msg: TMessage[]) => number
  error: (msg: TMessage[]) => number
}

/**
 * The log object holding the interfaces types 
 */
export interface ILog {
  time: number
  type: string
  messages: TMessage[]
}

/**
 * Loader class, implementing ILoader inteface, holding
 * options for the custom require method, the load method
 * and most importantly the require method used to 
 */
export interface ILoader {
  load: (name: string, options?: ILoaderOptions) => NodeModule | any
  registerCustom: (name: string, value: NodeModule | any) => void
}

/**
 * Object containing a series of NodeModules 
 * ordered by a string key value
 */
export interface IModulesObject {
  [key: string]: any
}

/**
 * Interface for the loaders settings
 */
export interface ILoaderOptions {
  useRequireCache?: boolean
  useLocalCache?: boolean
  putInRequireCache?: boolean
  putInLocalCache?: boolean
}

/**
 * Interface for the sanitize module
 */
export interface ISanitizer {
  exists: (path: string) => Promise<boolean>
  isFile: (path: string) => boolean
  isDir: (path: string) => boolean
  sanitize: (paths: string[] ) => Promise<any>
}

/**
 * Interfaces for the defaults class object
 */
export interface IDefaults {
  get: (key: string) => any
  set: (key: string, value: any) => void
  alias: (from: string, to: string) => void
}

/**
 * Interface for the config class object
 * containing methods to load the config
 * and the resulting values accessible trough
 * the get method
 */
export interface IConfig {
  config: IConfigOptions

  // Getter functions
  getConfig:  () => IConfigOptions
  getKeymaps: () => IKeymapsOptions
  get:  () => { 
    config: IConfigOptions, 
    keymaps: IKeymapsOptions 
  }

  load: () => Promise<any>
}

/**
 * Interface listing all the configurations 
 * options avaible to the user
 */
export interface IConfigOptions {
  // Fonts options
  fontSize?: number | string
  fontFamily?: string
  lineHeight?: number | string

  // Border options
  borderColor?: string
  borderRadius?: number | string
  borderWeight?: number | string

  // Colors options
  colors?: ITheme

  /**
   * TODO: Finish this listing
   */
}

/**
 * Interface for keymaps. TODO
 */
export interface IKeymapsOptions {
  [key: string]: string
}