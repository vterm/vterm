/**
 * @license
 * This software is a part of VTerm,
 * licensed under the MIT License.
 *
 * You can find it in the root of
 * the repository under the LICENSE.md file
 */
import Logger from './logger'
import { IDefaults } from './interfaces'

export default new class Defaults implements IDefaults {
  private store: { [key: string]: any } = {}

  /**
   * Returns the value of the store for the given key
   * 
   * @param key Key of the value to be returned
   */
  public get(key: string): any {
    return this.store[key]
  }

  /**
   * Sets a key in the store to a given value
   * 
   * @param key Key of the store to be setted
   */
  public set(key: string, value: any): void {
    if(this.store[key]) 
      Logger.warn('The value you have setted has just overwritten an old value.')
    
    this.store[key] = value
  }
}