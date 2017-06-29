const { platform } = require('os')
const { spawn }    = require('child_process')
const { join }     = require('path')

const yarn = join(__dirname, '..', 'node_modules', '.bin', 'yarnpkg')

spawn(yarn, ['run', 'build:' + platform() + ':p'])
