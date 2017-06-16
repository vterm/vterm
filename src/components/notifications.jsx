import { h, Component }   from 'preact'
import { observer }       from 'mobx-preact'
import Store              from '../store'

@observer
export class Notifications extends Component {
  getStyles() {
    return {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 8,
      // 150 is the width of each notification
      width: 160 + 16,
      // Notifications can fill up the whole space exept for the titlebar
      // +1 for the border!
      top: 33
    }
  }

  render() {
    return(
      <div style={this.getStyles()}>

      </div>
    )
  }
}
