import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import Store              from '../store'

// Components and styles
import { Tabs }           from './tabs'
import { WindowControls } from './windowControls'
import { CreateTab }      from './createtab'
import { grey }           from '../styles/colors'

// Utils
import { platform }       from 'os'

@observer
export class TitleBar extends Component {
  getStyles() {
    const _platform         = Store.config.windowControls ? Store.config.windowControls : platform()
    const onFocusedBorder   = `1px solid ${Store.config.borderColor || grey[800]}`
    const onUnfocusedBorder = '1px solid transparent'

    let style               = {
      width: '100%',
      height: 32,
      borderBottom: Store.isFocused ? onFocusedBorder : onUnfocusedBorder
    }

    // In case we are using custom styles
    // For some linux distros for example
    if(_platform == Object) style = platform

    return style
  }

  render() {
    const _platform = Store.config.windowControls ? Store.config.windowControls : platform()
    return(
      <div className='titlebar' style={this.getStyles()}>
        {Store.elements.WindowControls
          ? <Store.elements.WindowControls platform={_platform} />

          : <WindowControls platform={_platform} />
        }

        {Store.elements.CreateTab
          ? <Store.elements.CreateTab platform={_platform} />
          : <CreateTab platform={_platform} />
        }

        {Store.elements.Tabs
          ? <Store.elements.Tabs />

          : <Tabs />
        }
    </div>
    )
  }
}
