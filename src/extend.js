// Import the store object
import Store          from './store'

// Import utilities
import { observable } from 'mobx'
import { isArray }    from 'isarray'
/**
 * Decorate Yat elements or even replace them
 * by adding elements before/after or overwriting
 * existing ones
 *
 * @param  {string} Name of the area you're going to change,
 *                       for example `preApp`, `afterApp` or `Tab`
 * @param  {Preact element} class Preact component to decorate the UI
 * @return {null}
 */
export const decorate = (name, _class) => {
  const { elements } = Store

  // If the element is going to precede or follow
  // aterwards some other element then we use the procedure
  // of creating an array of elements, so that multiple plugins
  // can push custom additions to the UI
  if(/pre/.test(name) || /after/.test(name)) {

    // If it's not yet set, set the value
    // to an array that will contain all
    // our custom elements, and we push the
    // current _class right away!
    if(!elements[name])
      Store.elements[name] = observable([])

    Store.elements[name].push(_class)
  } else {
    // otherwhise if the element is replacing
    // one of our core ones, we simply set the
    // class to the value in the store, since our
    // elements are all single!(not multiple
    // values inside of arrays)

    // Before we check if this element was already
    // overwritten, so that we can throw a warning
    // to the user, and let him know that some other
    // plugins loaded before this one may not work prorely
    if(Store.elements[name])
      console.warn(
        `The custom element ${name} was applied more than one time, so
        one of your plugins may not work!`
      )

    // Then we set it!
    Store.elements[name] = _class
  }
}

/**
 * Styles up a given component by the name
 * and applies all the styles listed as an object,
 * just like Preact/React
 * @param  {string} name   name of the component to style up
 * @param  {object} styles object containing component styles
 * @return {null}
 */
export const styleComponent = (name, styles) => {
  if(typeof styles !== 'object' || Array.isArray(styles))
    return console.warn('The styles for a component MUST be an object')

  // We take the previous styles(if any)
  // and then we merge them with the new ones
  // to lose the less possible with multiple plugins
  const __style = Store.styles[name] || {}
  const _style  = {...__style, ...styles}

  // Set them
  Store.styles[name] = observable(_style)
}

/**
 * Populate components with custom props
 * @param  {string} name   name of the component to give props
 * @param  {object} props  object containing props
 * @return {null}
 */
export const propulate = (name, props) => {
  console.log(name, props);
  if(typeof styles !== 'object' || Array.isArray(styles))
    return console.warn('The props for a component MUST objects')

  // We take the previous props(if any)
  // and then we merge them with the new ones
  // to lose the less possible with multiple plugins
  const __props = Store.props[name] || {}
  const _props  = {...__props, ...props}

  // Set them
  Store.props[name] = observable(_props)
}
