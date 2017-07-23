import Store from './store'
import { observable } from 'mobx'

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
