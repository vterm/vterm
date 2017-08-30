/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
import { IModulesObject } from './types'

import * as Inferno from 'inferno'
import * as IMobx   from 'inferno-mobx'
import Component    from 'inferno-component'
import * as Mobx    from 'mobx'
import * as Decko   from 'decko'


export const DEFAULT_MODULES: IModulesObject = {
  'inferno': Inferno,
  'inferno-component': Component,
  'inferno-mobx': IMobx,

  'mobx': Mobx,
  'decko': Decko
}