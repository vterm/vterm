 /**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
import Logger from './logger'
import Sanitizer from './sanitizer'

/**
 * Startup:
 * 
 * - Sanitize paths
 * - Load Config
 */

class VTerm {
  constructor() {
    this.bootstrap()
  }

  private async bootstrap(): Promise<any> {
    // Make logs output to the terminal
    Logger.addListener(console.log)
    
    await Sanitizer.sanitize([
      '/Users/luca/.vtermdasdsa',
      '/Users/luca/.vterm',
      '/Users/luca/.vterm/config.js'
    ])
  }
}

new VTerm