import { writeFile, existsSync, readFileSync } from 'fs'
export * from 'fs'

export const remakeFile = (filepath, data) => {
  writeFile(filepath, data, err => {
    if(err) throw err
  })
}

export const doesFileExists = filepath =>
  existsSync(filepath) &&
  readFileSync(filepath) != ''

export const backupFile = (filepath, data) => {
  const name = filepath + '.old'
  writeFile(name, data)
}
