import { h, Component }   from 'preact'
import { bind }           from 'decko'
import { minimize }          from '../actions/window'
import Store              from '../store'

export class MacMinimize extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      background: 'transparent'
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background .1s',
      background: this.state.background,
      float: 'right'
    }
  }

  render() {
    return(
      <div onClick={minimize} ref={(e) => this.element = e} style={this.getStyles()}>
        <svg x='0px' y='0px' viewBox='0 0 10.2 1' style={{ height: 10, width: 10 }}>
          <rect fill='#FFF' width='10.2' height='1'/>
        </svg>
      </div>
    )
  }
}
