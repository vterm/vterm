import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import Store            from '../store'

// Import the component for the UI/UX
import { Tab }          from './tab'

@observer
export class Tabs extends Component {
  // Styles for the Tabs container;
  // Using:
  // - Using flex positioning to make the container fill
  //   up the remaining space from <WindowControls />
  //   and <CreateTab />
  //
  // - Making the area Draggable with WebkitAppRegion
  //   NOTE: Has some issues on windows and we may
  //   want to find a better way to handle this
  //
  // - Extra styles setted by the user and/ore the plugins.
  getStyles() {
    const { Tabs: userStyles }   = Store.config.styles

    // TODO: Support plugin styles
    const { Tabs: pluginStyles } = {}

    const styles = {
      // Flex positioning with auto width
      // and 100% height
      height: '100%',
      display: 'flex',

      // Webkit drag region
      WebkitAppRegion: 'drag',

      // User/plugin custom styles
      ...(userStyles   || {}),
      ...(pluginStyles || {})
    }

    return styles
  }

  getTabs() {
    // Ignore undefined objects with
    // filter(undefined == removed)
    return Store.tabs.filter(Boolean)
  }

  // Render the Tab's container; This contains:
  //   (No phun intended)
  // - Default <div> used as a container:
  //   - Default or custom <Tab /> elements
  // - Custom <afterTabs /> elements

  render() {
    // Retrive custom elements and
    // custom pre/after elements
    const {
      preTabs, afterTabs,
      Tab: _Tab
    } = Store.elements

    // Retriving custom props and our styles
    const { Tabs: tabsProps } = Store.props
    const styles = this.getStyles()

    // Determinate the components
    // we need to render
    const __Tab  = _Tab  || Tab

    return(
      <div
        style={styles}
        className='tabs-container'
        _selected={Store.selectedTab}
        {...tabsProps}
      >
        {preTabs}
        {this.getTabs().map( item => {

          // Take values from the item
          const {
            id,
            uid,
            title,
            props
          } = item

          // Declare if it is selected
          const selected = id === Store.selectedTab

          return(
            <__Tab
              selected={selected}
              id={id}
              uid={uid}
              title={title}
              {...props}
            />
          )

        })}
        {afterTabs}
      </div>
    )
  }
}
