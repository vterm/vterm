import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import Store              from '../store'

// Components and styles
import { Tabs }           from './tabs'
import { WindowControls } from './windowControls'
import { CreateTab }      from './createtab'
import { grey }           from '../styles/colors'
import color              from 'tinycolor2'

// Utils
import { platform }       from 'os'

@observer
export class TitleBar extends Component {
  getStyles() {
    const _platform = Store.config.windowControls ? Store.config.windowControls : platform()

    let style       = {
      width: '100%',
      height: 32,
      background: color(Store.config.background || grey[900]).darken(.25),
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    }

    // In case we are using custom styles
    // In some linux distros for example
    if(_platform == Object) style = platform

    return style
  }

  render() {
    let _platform = Store.config.windowControls ? Store.config.windowControls : platform()

    if(_platform == Object) _platform = 'linux'

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
