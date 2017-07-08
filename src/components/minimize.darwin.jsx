import { h, Component }   from 'preact'
import { bind }           from 'decko'
import { minimize }          from '../actions/window'
import Store              from '../store'

export class MacMinimize extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      background: 'rgb(255, 189, 46)'
    }
  }

  componentDidMount() {
    this.element.addEventListener('mouseover', () => this.setState({ background: 'rgb(191, 145, 35)' }))
    this.element.addEventListener('mouseout', () => this.setState({ background: 'rgb(255, 189, 46)' }))
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
          onClick={minimize} />
      </div>
    )
  }
}
