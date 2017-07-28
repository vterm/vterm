import Store             from '../store'
import { grey }          from '../styles/colors'
import { BORDER_COLOR }  from './variables'

const { cursorColor, primaryColor } = Store.config

export default `
.terminal {
  background-color: transparent;
  color: #fff;
  font-feature-settings: "liga" 0;
  position: relative;
  user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.terminal.focus,
.terminal:focus {
  outline: none;
}

.terminal .xterm-helpers {
  position: absolute;
  top: 0;
}

.terminal .xterm-helper-textarea {
  /*
   * HACK: to fix IE's blinking cursor
   * Move textarea out of the screen to the far left, so that the cursor is not visible.
   */
  position: absolute;
  opacity: 0;
  left: -9999em;
  top: 0;
  width: 0;
  height: 0;
  z-index: -10;
  /** Prevent wrapping so the IME appears against the textarea at the correct position */
  white-space: nowrap;
  overflow: hidden;
  resize: none;
}

.terminal a {
  color: inherit;
  text-decoration: none;
}

.terminal a:hover {
  cursor: pointer;
  text-decoration: underline;
}

.terminal a.xterm-invalid-link:hover {
  cursor: text;
  text-decoration: none;
}

.terminal.focus:not(.xterm-cursor-style-underline):not(.xterm-cursor-style-bar) .terminal-cursor {
  background-color: ${cursorColor || primaryColor || BORDER_COLOR};
  color: #000;
}

.terminal:not(.focus) .terminal-cursor {
  outline: 1px solid ${cursorColor || primaryColor || BORDER_COLOR};
  outline-offset: -1px;
  background-color: transparent;
}

.terminal:not(.xterm-cursor-style-underline):not(.xterm-cursor-style-bar).focus.xterm-cursor-blink-on .terminal-cursor {
  background-color: transparent;
  color: inherit;
}

.terminal.xterm-cursor-style-bar .terminal-cursor,
.terminal.xterm-cursor-style-underline .terminal-cursor {
  position: relative;
}
.terminal.xterm-cursor-style-bar .terminal-cursor::before,
.terminal.xterm-cursor-style-underline .terminal-cursor::before {
  content: "";
  display: block;
  position: absolute;
  background-color: ${cursorColor || primaryColor || BORDER_COLOR};
}
.terminal.focus.xterm-cursor-style-bar .terminal-cursor::before {
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
}
.terminal.xterm-cursor-style-underline .terminal-cursor::before {
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
}
.terminal.xterm-cursor-style-bar.focus.xterm-cursor-blink.xterm-cursor-blink-on .terminal-cursor::before,
.terminal.xterm-cursor-style-underline.focus.xterm-cursor-blink.xterm-cursor-blink-on .terminal-cursor::before {
  background-color: transparent;
}
.terminal.xterm-cursor-style-bar.focus.xterm-cursor-blink .terminal-cursor::before,
.terminal.xterm-cursor-style-underline.focus.xterm-cursor-blink .terminal-cursor::before {
  background-color: ${cursorColor || primaryColor || BORDER_COLOR};
}

.terminal .composition-view {
  color: #FFF;
  display: none;
  position: absolute;
  white-space: nowrap;
  z-index: 1;
}

.terminal .composition-view.active {
  display: block;
}

.terminal .xterm-viewport {
  /* On OS X this is required in order for the scroll bar to appear fully opaque */
  background-color: transparent;
  overflow-y: auto;
}

.terminal .xterm-wide-char,
.terminal .xterm-normal-char {
  display: inline-block;
}

.terminal .xterm-rows {
  position: absolute;
  left: 0;
  top: 0;
}

.terminal .xterm-rows > div {
  /* Lines containing spans and text nodes ocassionally wrap despite being the same width (#327) */
  white-space: nowrap;
}

.terminal .xterm-scroll-area {
  visibility: hidden;
}

.terminal .xterm-char-measure-element {
  display: inline-block;
  visibility: hidden;
  position: absolute;
  left: -9999em;
}

.terminal.enable-mouse-events {
  /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
  cursor: default;
}

.terminal .xterm-selection {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.3;
  pointer-events: none;
}

.terminal .xterm-selection div {
  position: absolute;
  background-color: ${cursorColor || primaryColor || BORDER_COLOR};;
}


/*
 *  Determine default colors for xterm.js
 */
.terminal .xterm-bold {
  font-weight: bold;
}

.terminal .xterm-underline {
  text-decoration: underline;
}

.terminal .xterm-blink {
  text-decoration: blink;
}

.terminal .xterm-hidden {
  visibility: hidden;
}
`
