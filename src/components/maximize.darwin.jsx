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
      background: 'rgb(40, 201, 64)'
    }
  }

  componentDidMount() {
    this.element.addEventListener('mouseover', () => this.setState({ background: 'rgb(31, 154, 49)' }))
    this.element.addEventListener('mouseout', () => this.setState({ background: 'rgb(40, 201, 64)' }))
  }

  @bind
  getStyles() {
    return {
      container: {
        userSelect: 'none',
        WebkitAppRegion: 'no-drag',
        cursor: 'default',
        width: 32,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background .1s',
        float: 'right',
        borderTopRightRadius: !Store.isMaximized ? (Store.config.borderRadius || 2) : 0
      },
      button: {
        background: this.state.background,
        width: 12,
        height: 12,
        borderRadius: '50%'
      }
    }
  }

  render() {
    const { isMaximized } = Store

    return(
      <div style={this.getStyles().container}>
        <div
          style={this.getStyles().button}
          ref={(e) => this.element = e}
          onClick={!isMaximized ? maximize : unmaximize} />
      </div>
    )
  }
}
