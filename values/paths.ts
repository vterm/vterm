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

/**
 * Static homedir directory
 */
export const HOMEDIR: string = homedir()

/**
 * Root of vterm configuration, the .vterm folder
 * in the user's home path
 */
export const BASE   : string = join(HOMEDIR, '.vterm')

/**
 * Config file path
 */
export const CONFIG : string = join(BASE, 'config.js')

/**
 * Keymaps file path
 */
export const KEYMAPS : string = join(BASE, 'config.js')

/**
 * Folder containing plugins for vterm, will be called
 * 'node_modules' util #33 isn't resolved
 * 
 * Tracking: https://github.com/vterm/vterm/issues/33
 */
export const PLUGINS: string = join(BASE, 'node_modules')
