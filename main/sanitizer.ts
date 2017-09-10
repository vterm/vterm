/**
 * @license
 * This software is a part of VTerm,
 * licensed under the MIT License.
 *
 * You can find it in the root of
 * the repository under the LICENSE.md file
 */
import { stat } from 'fs'

// Classes
import FS       from './fs'
import Logger   from './logger'
import Defaults from './defaults'

// Typings
import { ISanitizer } from './interfaces'

export default new class Sanitizer implements ISanitizer {
  /**
   * Checks if a file exists and returns a boolean
   * 
   * @param path Path of the file to be checked
   */
  public async exists(path: string): Promise<boolean> {
    return new Promise((resolve: (res: boolean) => void) => {

      // Resolve with true if the file exists
      // False if we get an error
      stat(path, (err) => err ? resolve(false) : resolve(true))

    })
  }

  /**
   * Checks if a path is a file
   * 
   * @param path Path of the file/dir that will be checked
   */
  public isFile(path: string): boolean {
    const last = path.split('/').pop()
    
    return last.indexOf('.') > -1 
      &&   last.charAt(0) !== '.'
  }

  /**
   * Checks if a path is a directory
   * 
   * @param path Path of the file/dir that will be checked
   */
  public isDir(path: string): boolean {
    return !this.isFile(path)
  }

  /**
   * Checks if a file is empty(= blank, whitespaced)
   * 
   * @param path Path to the file that should be checked
   */
  public async isEmpty(path: string): Promise<boolean> {
    // Ignore dirs or non-existing files
    if(this.isDir(path))         return false
    if(!await this.exists(path)) return true

    // Get file contents
    const content: string = await FS.readFile(path).toString()

    /**
     * Cuple of tests here to ensure the file isn't:
     * - Empty
     * - Blank
     * - Whitespaced
     */
    return content.length === 0 // Empty
      || !content.trim()        // Whitespaced
      || !content               // Blank
      || /^\s*$/.test(content)  // Blank
     
  }
  
  /**
   * Recreates files and folders if they are missing, repopulates folders
   * 
   * @param paths Array of strings containing a series of paths to sanitize
   */
  public async sanitize(paths: string[]): Promise<any> {
    paths.forEach(async (path: string) => {
      const exists  = await this.exists(path)
      const isEmpty = await this.isEmpty(path)

      // If the dir/file exists we just ignore this entry
      if(exists && !isEmpty) return

      Logger.trace(`${path} doesn't exists, creating`)
      
      // Recreate the file(with its default content) or the folder
      if(this.isFile(path)) {
        await FS.writeFile(path, Defaults.get(path))
      } else {
        await FS.mkdir(path)
      }
    })
  }
}