/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */

import { IObservableArray, IArrayChange } from 'mobx'

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
 * type of the Log object
 * type of the LogChange object
 * type of the Message value
 */
export type ILogs = IObservableArray<ILog>
export type ILogChange = IArrayChange<ILog>
export type TMessage = string | Error | Object

/**
 * The log object holding the interfaces types 
 */
export interface ILog {
  time: number
  type: string
  messages: TMessage[]
}