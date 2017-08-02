import Store from '../store'

// Takes values from the store and sets
// the window title based on these values
export const updateTitle = () => {

  // Extract values from the store
  const { tabs, selectedTab } = Store
  const { title } = tabs[selectedTab]

  // Then set the new window title
  document.title = (title || 'Shell') + ' | VTerm'
}
