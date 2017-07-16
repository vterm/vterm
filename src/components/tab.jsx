import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import { bind } from 'decko'
import Store from '../store'
import { selectTab, removeTab } from '../actions/tabs'
import absoluteFill from '../styles/absoluteFill'
import { grey }     from '../styles/colors'

@observer
export class Tab extends Component {
  state = {
    hover: false
  }

  getStyles() {
    const length     = Store.tabs.filter(Boolean).length
    const isSelected = this.props.selected
    const { hover }  = this.state

    return {
      height: 32,
      flexBasis: '100%',
      flexAlign: 'center',
      display: 'flex',
      userSelect: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',

      tabName: {
        maxWidth: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        WebkitAppRegion: 'no-drag',
        color: isSelected ? grey[200] : grey[500],
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
      },

      tabClose: {
        // Display only if there are 2 or more tabs
        // AND only if the mouse is hover that specific tab
        display: (length > 1 && hover) ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitAppRegion: 'no-drag',
        float: 'right',
        color: isSelected ? grey[200] : grey[500],
        marginRight: 8
      }
    }
  }

  @bind
  focus() {
    selectTab(this.props.id)
  }

  @bind
  close() {
    removeTab(this.props.id)
  }

  @bind
  onMouseEnter() {
    this.setState({ hover: true })
  }

  @bind
  onMouseLeave() {
    this.setState({ hover: false })
  }

  render({ id, title, uid, selected }) {
    let Class = ['tab']
    if(selected) Class.push('selected')

    return <div
      onClick={this.focus}
      uid={uid}
      id={id}
      style={this.getStyles()}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      className={Class.join(' ')}>

        <span style={this.getStyles().tabName} className='tab-title'>
          {title}
        </span>

        <div onClick={this.close} style={this.getStyles().tabClose} className='tab-close'>
          <svg viewBox='0 0 10.2 10.2' style={{ width: 8, height: 8 }}>
            <polygon
              fill={selected ? grey[200] : grey[500]}
              points='10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 '
            />
          </svg>
        </div>

      </div>
  }
}
