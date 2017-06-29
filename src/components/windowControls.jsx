import { h, Component }    from 'preact'

// Components and styles
import { WindowsClose }    from './close.windows'
import { WindowsMaximize } from './maximize.windows'
import { WindowsMinimize } from './minimize.windows'
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
