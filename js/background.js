function onUpdated(tabId, changeInfo, tab) {
  
  if (tab.url.indexOf('google') !== -1) {
    chrome.pageAction.show(tab.id)
  }

  chrome.storage.local.get({
    paused: false
  }, function(result) {
    // do nothing if the extension is paused
    if (result.paused) return

    const searchQuery = getSearchQuery(tabId, changeInfo, tab)  

    chrome.storage.local.set({
      searchQuery: searchQuery
    }, function() {
         chrome.tabs.executeScript(tab.id, {
           file: 'js/inject.js'
         })
    })
  })

}

// obtain search query from the url
function getSearchQuery(tabId, changeInfo, tab) {
  if (tab !== undefined) {
    const beginIndex = Math.max(tab.url.indexOf("&q="),
      tab.url.indexOf("?q="))

    if (beginIndex == -1) {
      console.log("Cannot find search query!")
      return null
    }

    const sub_url = tab.url.substring(beginIndex+3, tab.url.length)
    const endIndex = (sub_url.indexOf("&") !== -1) ?
      sub_url.indexOf("&") : sub_url.length
    const searchQuery = sub_url.substring(0, endIndex)
    console.log(`Search query is ${searchQuery}`)

    return searchQuery
  } else {
    return null
  }
}

chrome.tabs.onUpdated.addListener(onUpdated)
chrome.tabs.onHighlighted.addListener(onUpdated)
