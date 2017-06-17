import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import Store              from '../store'

// Import any additional component
// For our `app UI`
import { TitleBar }       from './titlebar'
import { Terminals }      from './terminals'
import { Notifications }  from './notifications'

// Styles and colors
import fixedFill          from '../styles/fixedFill'
import { grey }           from '../styles/colors'
import DEFAULT_FONT       from '../defaults/font'

@observer
export class App extends Component {
  getStyles() {
    const onFocusedBorder = `1px solid ${Store.config.borderColor || grey[800]}`
    const onUnfocusedBorder = '1px solid transparent'

    return {
      ...fixedFill,
      background: Store.config.background || grey[900],
      border: Store.isFocused ? onFocusedBorder : onUnfocusedBorder,
      borderRadius: Store.isMaximized ? (Store.config.borderRadius || 2) : 0,
      fontFamily: Store.config.fontFamily || DEFAULT_FONT,
      fontSize: Store.config.fontSize || 15
    }
  }

  render() {
    const { elements } = Store
    return(
      <div style={this.getStyles()} className='app'>
        {elements.TitleBar      ? <Store.elements.TitleBar /> : <TitleBar />}
        {elements.Terminals     ? <elements.Terminals />      : <Terminals />}
        {elements.Notifications ? <elements.Notifications />  : <Notifications />}
      </div>
    )
  }
}
