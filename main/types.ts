/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */

import { IObservableArray, IArrayChange } from 'mobx'
import { ILog } from './interfaces'


/**
 * type of the Log object
 * type of the LogChange object
 * type of the Log.message property
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