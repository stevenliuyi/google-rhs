// deal with HTTP requests in this script since they can only be in background pages

function fetchSource(request, sender, sendResponse) {
  switch(request.source) {
    case 'Daizhige':
     fetch(`http://www.daizhige.org/result.php?query=${request.query}`)
       .then(res => res.text())
       .then(html_string => {
          sendResponse({ html_string })
       })
     break
    
    default:
      return true
  }
  return true // important
}

chrome.runtime.onMessage.addListener(fetchSource)
