/**
 * @license
 * This software is a part of VTerm,
 * licensed under the MIT License.
 *
 * You can find it in the root of
 * the repository under the LICENSE.md file
 */
import promisify from 'pify'
import fs        from 'fs'

export default promisify(fs)
