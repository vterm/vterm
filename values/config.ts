/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
import Defaults from '../main/defaults'

Defaults.set('DEFAULT_CONFIG', `
module.exports = {

}
`)

Defaults.set('DEFAULT_KEYMAPS', `
module.exports = {

}
`)

// Alias these values
Defaults.alias('DEFAULT_CONFIG', '/Users/luca/.vterm/config.js')
Defaults.alias('DEFAULT_KEYMAPS', '/Users/luca/.vterm/keymaps.js')