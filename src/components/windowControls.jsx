import { h, Component }    from 'preact'
import { bind }            from 'decko'
import { observer }        from 'mobx-preact'
import Store               from '../store'
import { grey }            from '../styles/colors'

import { WindowsClose }    from './close.windows'
import { WindowsMaximize } from './maximize.windows'
import { WindowsMinimize } from './minimize.windows'

@observer
export class WindowControls extends Component {
  getStyles(platform) {
    const onFocusedBorder = `1px solid ${Store.config.borderColor || grey[800]}`
    const onUnfocusedBorder = '1px solid transparent'

    return {
      float: (platform == 'darwin') ? 'left' : 'right',
      height: '100%',
      borderLeft: Store.isFocused ? onFocusedBorder : onUnfocusedBorder
    }
  }

  render({ platform }) {
    return(
      <div style={this.getStyles(platform)}>

      {(platform == 'win32' || platform == 'linux')
        ? <WindowsClose />
        : <MacClose />
      }
      {(platform == 'win32' || platform == 'linux')
        ? <WindowsMaximize />
        : <MacMaximize />
      }
      {(platform == 'win32' || platform == 'linux')
        ? <WindowsMinimize />
        : <MacMinimize />
      }

      </div>
    )
  }
}
