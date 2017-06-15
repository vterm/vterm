import Store from '../store'
import { isEmpty } from '../utils/objects'

export const createTab = ({ title, content } = {}) => {
  let Tab = {
    id: Store.tabs.length,
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

export const getLatestTab = () => Store.tabs.filter(isEmpty)[ Store.tabs.filter(isEmpty).length - 1 ]

export const removeTab = (item) => {

  if(typeof item == 'object') {
    Store.tabs[getTabId(item)] = undefined
  } else {
    Store.tabs[item] = undefined
  }

  // Select lastest tab ONLY IF this was the latest
  // NOT WORKING
  Store.selectedTab = getLatestTab().id


}

window.createTab = createTab
window.selectTab = selectTab
window.removeTab = removeTab
