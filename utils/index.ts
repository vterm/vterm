/**
 * @license
 * This software is a part of VTerm, 
 * licensed under the MIT License. 
 * 
 * You can find it in the root of 
 * the repository under the LICENSE.md file 
 */
const cache = []

export const ecludeCircular = function(key, value) {
  if (typeof value === 'object' && value !== null) {

      // Circular reference found, discard key
      if (cache.indexOf(value) !== -1) return

      // Store value in our collection
      cache.push(value)
  }

  return value
}