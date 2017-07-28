import Store from '../store'
import { grey } from '../defaults/colors'

export default `
  div::-webkit-scrollbar-track {
    background: ${Store.config.primaryColor || grey[500] };
  }

  div::-webkit-scrollbar { width: 4px; }

  div::-webkit-scrollbar-thumb {
  	background: ${Store.config.primaryColor || grey[500] };
  }
`
