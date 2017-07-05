import Store from '../store'

export const createTab = ({ title, content, customProps } = {}) => {
  let Tab = {
    id: Store.tabs.length,
    props: customProps,
    uid: Date.now() + Math.random(100),
    title: title || '',
    content: content || null
  }

  Store.tabs.push(Tab)
  selectTab(Store.tabs.length - 1)
}

export const getTabId = (Tab) => Store.tabs.indexOf(Tab)

export const selectTab = (item) => {

  if(typeof item == 'object') Store.selectedTab = item.id
  else                        Store.selectedTab = item

}

export const getLatestTab = () => Store.tabs.filter(Boolean)[ Store.tabs.filter(Boolean).length - 1 ]

export const removeTab = (item) => {

  if(typeof item == 'object') {
    Store.tabs[getTabId(item)] = undefined
  } else {
    Store.tabs[item] = undefined
  }

  // Select lastest tab ONLY IF this was the latest
  setTimeout(() => selectTab(getLatestTab()), 10)

}
