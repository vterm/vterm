const { platform } = require('os')
const { spawn }    = require('child_process')
const { join }     = require('path')

const process = spawn('yarn', ['run', 'build:' + platform() + ':p'])
process.stdout.on('data', (data) => console.log(data.toString()))
process.stderr.on('data', (err) => console.warn(err.toString()))

process.on('close',(code) =>  console.log(`Exited with ${code}`))
