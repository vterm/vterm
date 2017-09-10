/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
import Defaults from '../main/defaults'

import * as Inferno from 'inferno'
import Component    from 'inferno-component'
import * as Decko   from 'decko'

Defaults.set('DEFAULT_MODULES', {
  'inferno': Inferno,
  'inferno-component': Component,

  'decko': Decko
})