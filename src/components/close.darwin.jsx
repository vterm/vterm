import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import { bind }           from 'decko'
import { close }          from '../actions/window'
import Store              from '../store'

@observer
export class MacClose extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      background: 'rgb(255, 95, 87)'
    }
  }

  componentDidMount() {
    this.element.addEventListener('mouseover', () => this.setState({ background: 'rgb(191, 73, 67)' }))
    this.element.addEventListener('mouseout', () => this.setState({ background: 'rgb(255, 95, 87)' }))
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
    return(
      <div style={this.getStyles().container}>
        <div
          style={this.getStyles().button}
          ref={(e) => this.element = e}
          onClick={close} />
      </div>
    )
  }
}
