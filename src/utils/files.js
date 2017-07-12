import fs, { stat } from 'fs'
import pify         from 'pify'
export default       pify(fs)

// Alternative stat function used in
// config and plugin loading to avoid
// promise rejection( Related to #11 )
export const _stat = (filepath) => new Promise(resolve => {
  stat(filepath, (err) => {
    if(err) resolve(false)
    else    resolve(true)
  })
})
