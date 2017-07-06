import { h, Component }         from 'preact'
import { bind }                 from 'decko'
import { maximize, unmaximize } from '../actions/window'
import { observer }             from 'mobx-preact'
import Store                    from '../store'

@observer
export class MacMaximize extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      background: 'transparent',
      fill: '#FFF'
    }
  }

  componentDidMount() {
    this.element.addEventListener('mouseover', () => this.setState({ background: 'rgba(255, 255, 255, .13)' }))
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
      lineHeight: 0,
      display: 'flex',
      justifyContent: 'center',
      transition: 'background .1s',
      background: this.state.background,
      alignItems: 'center',
      float: 'right'
    }
  }

  render() {
    const { isMaximized } = Store

    return(
      <div
        ref={(e) => this.element = e}
        style={this.getStyles()}
        onClick={!isMaximized ? maximize : unmaximize}
      >
        {!isMaximized
          // If it's not maximized
          ?
          <svg x='0px' y='0px' viewBox='0 0 10.2 10.1' style={{ height: 10, width: 10 }}>
            <path
              fill={this.state.fill}
              d='M0,0v10.1h10.2V0H0z M9.2,9.2H1.1V1h8.1V9.2z'
            />
          </svg>
          // If it's maximized
          :
          <svg x='0px' y='0px' viewBox='0 0 10.2 10.2' style={{ height: 10, width: 10 }}>
            <path
              fill={this.state.fill}
              d='M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z'
            />
          </svg>
        }
      </div>
    )
  }
}
