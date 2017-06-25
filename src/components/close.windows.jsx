import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import { bind }           from 'decko'
import { close }          from '../actions/window'
import Store              from '../store'

@observer
export class WindowsClose extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      background: 'transparent'
    }
  }

  componentDidMount() {
    this.element.addEventListener('mouseover', () => this.setState({ background: '#e81123' }))
    this.element.addEventListener('mouseout', () => this.setState({ background: 'transparent' }))
  }

  @bind
  getStyles() {
    return {
      userSelect: 'none',
      WebkitAppRegion: 'no-drag',
      cursor: 'default',
      width: 46,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background .1s',
      background: this.state.background,
      float: 'right',
      borderTopRightRadius: !Store.isMaximized ? (Store.config.borderRadius || 2) : 0
    }
  }

  render() {
    return(
      <div onClick={close} ref={(e) => this.element = e} style={this.getStyles()}>
        <svg viewBox='0 0 10.2 10.2' style={{ width: 10, height: 10 }}>
          <polygon
            fill='#FFF'
            points='10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 '
          />
        </svg>
      </div>
    )
  }
}
