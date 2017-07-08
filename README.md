![](https://github.com/LucaT1/yat/blob/master/screenshots/second.png?raw=true)
[![Greenkeeper badge](https://badges.greenkeeper.io/LucaT1/yat.svg)](https://greenkeeper.io/)
[![Travis Status](https://travis-ci.org/LucaT1/yat.svg?branch=master)](https://travis-ci.org/LucaT1/yat)
[![AppVeyor status](https://ci.appveyor.com/api/projects/status/github/LucaT1/yat?branch=master&svg=true)
![Github All Releases](https://img.shields.io/github/downloads/LucaT1/yat/total.svg)]()

***

## Description
YAT is a `terminal emulator` written entirely in JavaScript using [`preact`](https://github.com/developit/preact), a `react-like` library to create reactive user interfaces(UIs). To manage our data we use [`mobx`](https://github.com/mobxjs/mobx) for its simplicity and event-less flow of information. YAT provides by default a simple UI that can be extended with themes and plugins, making the terminal experience up to your imagination. YAT is a place where the tense `If You can think of something You can do it` is actually true. 100% hackable, 100% open-source, 100% yours.

***

## Installation
You can dowload our prebuilt binaries in the [`GitHub's releases page`](https://github.com/LucaT1/yat/releases) for your platform of choice. Tough keep in mind that these are some of the first releases, and the application state is not yet stable, so you may find some bugs and breakdowns: we'd like you to report these in the [`GitHub's issues page`](https://github.com/LucaT1/yat/issues)!

***

## Build
**DISCLAIMER**: All the process shown here uses [`yarn`](https://yarnpkg.com), and although all these commands can be run with npm, we highly recommend using yarn.

First, on `Windows` you'll have to install some build tools from Microsoft in order to compile successfully [`ptyw.js`](https://github.com/iiegor/ptyw.js/tree/master) with the command:
`$ yarn global add windows-build-tools`

Then clone the repository to your computer and open a terminal inside that folder.
Then install the packages with the command `yarn` and compile the app with `yarn run compile:build`. Lastly, package it for your OS. Respectively:

MacOS:   `$ yarn run build:darwin`<br>
Windows: `$ yarn run build:win32`<br>
Linux:   `$ yarn run build:linux`<br>
