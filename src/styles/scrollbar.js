import Store from '../store'
import { grey } from './colors'

export default `
  .terminal,
  .terminal .xterm-viewport {
    background: transparent;
  }

  .terminal ::-webkit-scrollbar {
    width: 6px !important;
  }

  .terminal ::-webkit-scrollbar-button {
    display: none !important;
  }

  .terminal ::-webkit-scrollbar-thumb {
    background-color: ${Store.config.primaryColor || grey[500] } !important;
    border-radius: 2px;
  }

  * { transition: border .1s }
`
