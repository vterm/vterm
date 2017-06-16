![](https://github.com/LucaT1/yat/blob/master/screenshots/first.png?raw=true)
[![Greenkeeper badge](https://badges.greenkeeper.io/LucaT1/yat.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/LucaT1/yat.svg?branch=master)](https://travis-ci.org/LucaT1/yat)
[![Github All Releases](https://img.shields.io/github/downloads/LucaT1/yat/total.svg)]()

***

## Description
YAT is a `terminal emulator` written entirely in JavaScript using [`preact`](https://github.com/developit/preact), a `react-like` library to create reactive user interfaces(UIs). To manage our data we use [`mobx`](https://github.com/mobxjs/mobx) for its semplicity and event-less flow of information. YAT provides by default a simple UI that can be extended with themes and plugins, making the terminal experience up to your immagination. YAT is a place where the tense `If You can think of something You can do it` is actually true. 100% hackable, 100% open source, 100% yours.

***

## Installation
Sooner you'll be able to download our precompiled binaries from the [`GitHub's releases page`](https://github.com/LucaT1/yat/releases) for your platform of choise, but for now you can only compile the application by yourself, so head over to the [build steps](#build)

***

## Build
**DISCLAIMER**: All the process shown here uses [`yarn`](https://yarnpkg.com), and altough all these commands can be run with npm, we highly raccomand using yarn.

First on `Windows` you'll need to install some build tools from Microsoft in order to build [`ptyw.js`](https://github.com/iiegor/ptyw.js/tree/master), so let's install them:
`$ yarn global add windows-build-tools`

Then clone the repository to your computer and open a terminal inside that folder.
Then install the packages with the command `yarn` and compile the app with `yarn run compile:build`. Lastly package it for your OS. Respectively:

MacOS:   `yarn run dist:darwin`<br>
Windows: `yarn run dist:windows`<br>
Linux:   `yarn run dist:linux`<br>
