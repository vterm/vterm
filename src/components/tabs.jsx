import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import { bind }         from 'decko'
import Store            from '../store'
import { getTabId }     from '../actions/tabs'
import { isEmpty }      from '../utils/objects'
import { grey, orange } from '../styles/colors'
import { Tab }          from './tab'

@observer
export class Tabs extends Component {
  getStyles() {
    return {
      overflow: 'hidden',
      height: '100%',
      WebkitAppRegion: 'drag',
      ...(Store.config.styles.Tabs || {})
    }
  }

  render() {
    return(
      <div ref={(e) => this.parent = e} style={this.getStyles()} className='tabs-container'>
        { // Ignore undefined objects with filter(undefined == removed)
          Store.tabs.filter(isEmpty).map( item => {
          const id = getTabId(item)
          const uid = item.uid
          const title = item.title
          const selected = id === Store.selectedTab

          return<Tab selected={selected} id={id} uid={uid} title={title} />
        })}
      </div>
    )
  }
}
