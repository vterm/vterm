import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import Store              from '../store'

import { createTab }      from '../actions/tabs'

@observer
export class CreateTab extends Component {
  getStyles(platform) {
    const onFocusedBorder = `1px solid ${Store.config.borderColor || grey[800]}`
    const onUnfocusedBorder = '1px solid transparent'

    return {
      userSelect: 'none',
      WebkitAppRegion: 'no-drag',
      cursor: 'default',
      width: '46px',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      float: platform =='darwin' ? 'right' : 'left',
      borderRight: Store.isFocused ? onFocusedBorder : onUnfocusedBorder
    }
  }

  render({ platform }) {
    return(
      <div onClick={createTab} style={this.getStyles(platform)}>
        <svg fill="#FFF" viewBox="0 0 24 24" style={{ height: 16, width: 16 }}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </div>
    )
  }
}
