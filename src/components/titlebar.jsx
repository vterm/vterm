import { h, Component }    from 'preact'
import { platform }        from 'os'
import { observer }        from 'mobx-preact'
import Store               from '../store'
import color               from 'tinycolor2'

// Import the components for the UI/UX
import { Tabs }           from './tabs'
import { WindowControls } from './windowControls'
import { CreateTab }      from './createtab'

// Import defaults
import { DARK_BACKGROUND } from '../defaults/variables'

@observer
export class TitleBar extends Component {
  // Save the platform in a local constant
  // instead of calling it every time
  platform  = platform()

  // Styles for the TitleBar
  // Using:
  // - Relative positioning with 100%
  //   width to fill up the whole space
  //   and fixed height(32).
  // - Darken background of the config or
  //   use default one darked.
  // - Box shadow to divide the
  //   titleBar from terminals.
  //   TODO: Probably remove this
  // - Extra styles setted by the user and/ore the plugins.
  getStyles() {
    // Take used values from
    // the user's config and local class
    const { background } = Store.config
    const { platform }   = this

    // Users's custom styles
    const { TitleBar: userStyles }   = Store.config.styles

    // Plugin styles
    const { TitleBar: pluginStyles } = Store.styles


    const styles = {
      // Relative positioning with relative
      // width and fixed height
      width: '100%',
      height: platform == 'darwin' ? 24 : 32,

      // Default background or darked one
      background: color(background).darken(.25) || DARK_BACKGROUND,

      // Drop shadow. Probably going to be removed sooner
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

      // User/plugin custom styles
      ...(userStyles   || {}),
      ...(pluginStyles || {})
    }

    return styles
  }

  // Here we are rendering the titlebar
  // wich differs from OS to OS.
  // NOTE: on Windows there are some bugs with the
  //       tab's close button.
  // TODO: Fix windows titlebar bugs by separating
  //       tabs from titlebar or using electron-titlebar somehow
  //
  // ANYWAY:
  //
  // Here we are rendering:
  // - Default <WindowControls /> or custom
  //   based on platform
  // - Default <CreateTab /> button
  //   TODO: Give user or plugins the
  //         ability to customize it!
  // - Default <Tabs /> list or custom

  render() {
    // Extract things from local class
    // and from the store
    const { platform } = this

    // Retrive custom elements and
    // custom pre/after elements
    const {
      preTitleBar, afterTitleBar,
      windowControls: _WindowControls,
      Tabs: _Tabs
      // TODO: CreateTab
    } = Store.elements

    // Retriving custom props and our styles
    const { TitleBar: titleBarProps } = Store.props
    const styles = this.getStyles()

    // Determinate the components
    // we need to render
    const __WindowControls = _WindowControls
      ? <_WindowControls platform={this.platform} />
      : <WindowControls  platform={this.platform} />

    const __Tabs = _Tabs
      ? <_Tabs />
      : <Tabs  />

    // TODO: Add support for custom
    //      <CreateTab /> element

    return(
      <div
        className='titlebar'
        style={styles}
        {...titleBarProps}
      >
        {preTitleBar}

        {platform !== 'darwin' ? __WindowControls : ''}
        <CreateTab platform={this.platform} />
        {__Tabs}

        {afterTitleBar}
      </div>
    )
  }
}
