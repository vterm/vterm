import Store from '../store'

// This function adds a tab to the store
// And returns the relative tab just created
export const createTab = object => {
  // Extract values from the first argument
  const { title, props, content } = object

  // Take values from the store
  const id = Store.tabs.length

  // Construct the tab object
  const tab = {
    id, props,
    title:   title   || '',
    content: content || null
  }

  // Push the tab in the store
  Store.tabs.push(tab)

  // Select it
  selectTab(id)

  // Return the created tab
  return tab
}


export const selectTab = id => {
  // Change the selectedTab reference in the store
  Store.selectedTab = id

  // Focus the terminal
  // TODO: Split this in a separate file
  //       with all the temrinal functions
  focusTab(id)
}


// Focuses the terminal object inside of
// the tab defined by the id parameter
export const focusTab = id =>

  // Only focuses if the tab and the
  // temrinal object are set
  Store.tabs[id] && Store.tabs[id].terminal
    ? Store.tabs[id].terminal.focus()
    : null


// Return the last tab in the array
export const getLatestTab = () => {
  const _tabs   = Store.tabs.filter(Boolean)
  const _length = _tabs.length - 1

  console.log(_length);

  // If length == 0 means that
  // there is not latest tab
  return _length + 1
    ? _tabs[_length]['id']
    : null
}

// Returns the selected tab id
export const getSelectedTab = () => Store.selectedTab


export const removeTab = id => {
  // BEFORE_REMOVING current selected tab
  const _latest = getSelectedTab()

  // Clear the tab object to undefined
  // so it isn't rendered anymore
  Store.tabs[id] = undefined

  // Select the latest tab only if
  // the one just removed was the
  // selected one
  if(id == _latest) {
    setTimeout( selectTab(getLatestTab()), 10)
  } else {
    setTimeout( focusTab(Store.selectTab), 10)
  }
}
