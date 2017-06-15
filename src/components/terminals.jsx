import { h, Component } from 'preact'
import { observer }       from 'mobx-preact'
import { bind }         from 'decko'
import Store            from '../store'
import { getTabId }     from '../actions/tabs'
import { isEmpty }      from '../utils/objects'

import { Terminal }     from './terminal'

@observer
export class Terminals extends Component {
  getStyles() {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 32,
      bottom: 0,
      ...(Store.config.styles.Terminals || {})
    }
  }

  render() {
    return(
      <div style={this.getStyles()} className='terminals-container'>
        { // Ignore undefined objects with filter(undefined == removed)
          Store.tabs.filter(isEmpty).map( item => {
          const id = getTabId(item)
          const uid = item.uid
          const selected = id === Store.selectedTab

          if(item.content) return item.content
          return <Terminal
            selected={selected}
            uid={uid}
            id={id}
          />
        })}
      </div>
    )
  }
}
