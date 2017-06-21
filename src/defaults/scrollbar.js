import Store from '../store'
import { grey } from '../styles/colors'

export default `
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
`
