import { h, Component }    from 'preact'

// Components and styles
import { WindowsClose }    from './close.windows'
import { WindowsMaximize } from './maximize.windows'
import { WindowsMinimize } from './minimize.windows'

import { MacClose }        from './close.darwin'
import { MacMaximize }     from './maximize.darwin'
import { MacMinimize }     from './minimize.darwin'

import { grey }            from '../styles/colors'

export class WindowControls extends Component {
  getStyles(platform) {
    return {
      float: (platform == 'darwin') ? 'left' : 'right',
      height: '100%'
    }
  }

  render({ platform }) {
    return(
      <div style={this.getStyles(platform)}>

      {(platform == 'win32' || platform == 'linux')
        ? <WindowsClose />
        : <MacMaximize />
      }
      {(platform == 'win32' || platform == 'linux')
        ? <WindowsMaximize />
        : <MacMinimize />
      }
      {(platform == 'win32' || platform == 'linux')
        ? <WindowsMinimize />
        : <MacClose />
      }

      </div>
    )
  }
}
