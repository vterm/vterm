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
}