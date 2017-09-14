function fetchWechat(searchQuery, num) {
  // send query to background page since HTTP request cannot be made here
  chrome.runtime.sendMessage({ source: 'Wechat', query: searchQuery }, res => {
    const results = $($.parseHTML(res.html_string)).find('.txt-box')
    if (results.length > 0) {
      showResults(results,
                    WechatContent,
                    "from Wechat Public Platform",
                    num)
    }
  })
}

function WechatContent(results, content, num) {
  Object.values(results).slice(0, num).map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let question = $('<div/>').append(
      $(result).find('h3')[0]
    )
    $(question).find('h3').contents().unwrap()
    $(question).find('em').contents().unwrap()

    let account = $('<div/>', { class: 'grey-text' }).append(
      $(result).find('.account')[0]
    )
    $(account).find('a').contents().unwrap()

    let snippet = $('<div/>').append(
      $(result).find('.txt-info')[0]
    )
    $(snippet).find('a').contents().unwrap()
    $(snippet).find('p').contents().unwrap()
    $(snippet).find('em').contents().unwrap().wrap('<b/>')

    item.append(question).append(account).append(snippet)
    content.append(item)
  })
}

