 /**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
// Handling defaults values
import Defaults from './defaults'
import '../values'

import Logger from './logger'
import Sanitizer from './sanitizer'
import Config from './config'

/**
 * Startup:
 * 
 * - Sanitize paths
 * - Load Config
 */

class VTerm {
  /**
   * Bootstraps the application
   */
  public async bootstrap(): Promise<any> {
    // Make logs output to the terminal
    Logger.addListener(console.log)
    
    /**
     * Sanitize files and folders, recreate them 
     * and populate with content:
     * 
     * - VTerm base folder(.vterm)
     * - VTerm's config.js file
     * - VTerm's keymap file
     * - VTerm's plugins folder(node_modules)
     */
    await Sanitizer.sanitize(Defaults.get('SANITIZE_PATHS'))

    await Config.load()
  }
}

new VTerm().bootstrap()