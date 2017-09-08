/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
import { homedir } from 'os'
import { join } from 'path'

import Defaults from '../main/defaults'

/**
 * Static homedir directory
 */
Defaults.set('HOMEDIR_PATH', homedir())

/**
 * Root of vterm configuration, the .vterm folder
 * in the user's home path
 */
Defaults.set('BASE_PATH', join(homedir(), '.vterm'))

/**
 * Config file path
 */
Defaults.set('CONFIG_PATH', join(homedir(), '.vterm', 'config.js'))

/**
 * Keymaps file path
 */
Defaults.set('KEYMAPS_PATH', join(homedir(), '.vterm', 'keymaps.js'))

/**
 * Folder containing plugins for vterm, will be called
 * 'node_modules' util #33 isn't resolved
 * 
 * Tracking: https://github.com/vterm/vterm/issues/33
 */
Defaults.set('PLUGINS_PATH', join(homedir(), '.vterm', 'node_modules'))

Defaults.set('SANITIZE_PATHS', [
  Defaults.get('BASE_PATH'),
  Defaults.get('CONFIG_PATH'),
  Defaults.get('KEYMAPS_PATH'),
  Defaults.get('PLUGINS_PATH')
])