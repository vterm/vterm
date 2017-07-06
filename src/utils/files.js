import * as fs from 'fs'
import pify    from 'pify'

export default pify(fs)

export const remakeFile = (filepath, data) => {
  writeFile(filepath, data, err => {
    if(err) throw err
  })
}

export const doesFileExist = filepath =>
  existsSync(filepath) &&
  readFileSync(filepath) != ''

export const backupFile = (filepath, data) => {
  const name = filepath + '.old'
  writeFile(name, data)
}

export const isDir = (path) =>  lstatSync(path).isDirectory()
