import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import { bind }         from 'decko'
import Store            from '../store'
import { getTabId }     from '../actions/tabs'
import Fit              from '../utils/fit'

import { Terminal }     from './terminal'
import { Styles }       from './styles'

// Get width and height of a character
const _style         = { display: 'inline', visibility: 'hidden' }
const FontChild      = () => <span style={_style}>w</span>

@observer
export class Terminals extends Component {
  state = { cols: 0, rows: 0 }

  componentDidMount() {
    this.setState(Fit(this.container, this.tester))

    // Window Events listeners
    window.addEventListener('resize', this.onWindowResize)
  }

  @bind
  onWindowResize() {
    this.setState(Fit(this.container, this.tester))
  }

  getStyles() {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 32,
      bottom: 0,
      zIndex: 10,
      ...(Store.config.styles.Terminals || {})
    }
  }

  render() {

    console.log(this.state);
    const { rows, cols } = this.state

    return(
      <div
        _selected={Store.selectedTab}
        style={this.getStyles()}
        className='terminals-container'
        ref={e => this.container = e}
      >
        <Styles />
        <FontChild ref={({base}) => this.tester = base} />

        { // Ignore undefined objects with filter(undefined == removed)
          Store.tabs.filter(Boolean).map( item => {
            const { id, uid, content, props } = item
            const selected = id === Store.selectedTab
            const Content = content

          return !content
            ? <Terminal cols={cols} rows={rows} selected={selected} uid={uid} id={id} {...props} />
            : <Content cols={cols} rows={rows} selected={selected} uid={uid} id={id} {...props} />
        })}
      </div>
    )
  }
}
