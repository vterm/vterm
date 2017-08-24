/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */

import { observable, observe } from 'mobx'
import { bind } from 'decko'
import { 
  ILog, ILogger, 
  ILogChange, TMessage 
} from './types'

/**
 * 
 * Logger class, implementing ILogger inteface, holding
 * logs, handlers, responsible for catching logs changes,
 * sending them to the respecitve handlers and giving developers
 * the tools to log out strings and more complex values
 * 
 */
export class Logger implements ILogger {
  constructor() {
    observe(this.logs, this.onChange)
  }

  // Logs' mobx store
  readonly logs = observable([])

  // Handlers array
  readonly handlers = []

  /**
   * 
   * Adds a logger to the array of handlers and fires the calle
   * function every new log that gets added
   * 
   * @param callee Fuction to be called when there's a new log
   */
  @bind
  public addListener(handler: Function): void {
    this.handlers.push(handler)
  }

  /**
   * 
   * Removes and handler for the listening process.
   * Throws an Error if the handler isn't listening
   * 
   * @param callee Fuction to remove from the handlers list
   */
  @bind
  public removeListener(handler: Function): void {
    const index = this.handlers.indexOf(handler)

    if(index < 0) {
      throw Error('The function you specified isn\'t listening for changes.')
    }

    this.handlers.splice(index, 1)
  }

  /**
   * 
   * Handles the additon of each log, by firing
   * all the hadlers with the specific payload
   * 
   * @param newValue New IArrayChange<ILog> object
   */
  @bind
  private onChange(change: ILogChange): void {
    const parsed = this.parseLog(change)

    this.handlers
      .forEach((handler: Function): void => {
        handler.call(this, ...parsed)
      })
  }

  /**
   * 
   * Parses the data contained in the ILogChange
   * extracting the current ILgìog from the store
   * and merging DISPLAY_DATE, TYPE and MESSAGE together
   * 
   * @param handler Function to be fired 
   * @param index Index of the handler in the array
   */
  @bind
  private parseLog({ object, index }: ILogChange): Array<string> {   
    const { time, type, messages } = object[index]

    /**
     * Generate the DATE; current format:
     * - Hours
     * - Minutes
     * - Seconds
     * 
     */
    const date = new Date(time)
    const DISPLAY_DATE = 
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return messages
      .map(line => this.printMessage(DISPLAY_DATE, type, line))

  }

  @bind
  private printMessage(DISPLAY_DATE: string, type: string, message: TMessage)  {
    let msg = message

    if(message instanceof Error) {

      /**
       * If it's an error parse the stack property
       * and re-map it to this function in order to add
       * the prefix to every line.
       */
      return '\n' + message.stack
        .split('\n')
        .map(line => this.printMessage(DISPLAY_DATE, type, line))
        .join('\n')
        

    } else if(typeof message == 'object') {

      // If it's an object/array we stringify the output
      msg = JSON.stringify(message, null, 2)

    }

    return `[${DISPLAY_DATE}] [${type.toUpperCase()}] ${msg}`
  }

  /**
   * 
   * @param type Type of the log
   * @param msg  Contents of the log
   */
  @bind
  public log(type: string, msg: TMessage[]): number {
    const Log: ILog = {
      time: new Date().getTime(),
      type: type,
      messages: msg
    }
  
    this.logs.push(Log)
    return this.logs.length
  }

  /**
   * Calls the log function as a TRACE type
   */
  @bind
  public trace(...msg: TMessage[]): number {
    return this.log('trace', msg)
  }

  /**
   * Calls the log function as a DONE type
   */
  @bind
  public done(...msg: TMessage[]): number {
    return this.log('done', msg)
  }

  /**
   * Calls the log function as a DONE type
   */
  @bind
  public warn(...msg: TMessage[]): number {
    return this.log('warn', msg)
  }

  /**
   * Calls the log function as a DONE type
   */
  @bind
  public error(...msg: TMessage[]): number {
    return this.log('error', msg)
  }
}

export default new Logger