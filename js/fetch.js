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

    case 'Wechat':
      fetch(`http://weixin.sogou.com/weixin?type=2&query=${request.query}`)
        .then(res => res.text())
        .then(html_string => {
           sendResponse({ html_string })
        })
      break

    case 'CnkiSearch':
      fetch(`http://gongjushu.cnki.net/refbook/basicsearch.aspx?kw=${request.query}`, {
          credentials: 'include',
          'Cookie': `inputkw=${request.query}`
        })
        .then(res => res.text())
        .then(html_string => {
          sendResponse({ html_string })
        })
      break

    case 'CnkiBrief':
      fetch(request.url, {
        credentials: 'include',
        'Cookie': `inputkw=${request.query}`
      }).then(res => res.text())
        .then(html_string => {
          sendResponse({ html_string })
        })
    
    default:
      return true
  }
  return true // important
}

chrome.runtime.onMessage.addListener(fetchSource)
