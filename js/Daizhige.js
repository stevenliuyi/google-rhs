function fetchDaizhige(searchQuery, num) {
  // send query to background page since HTTP request cannot be made here
  chrome.runtime.sendMessage({ source: 'Daizhige', query: searchQuery }, res => {
    console.log(res.html_string)
    const articles = $($.parseHTML(res.html_string)).find('article')
    if (articles.length > 0) {
      showResults(articles,
                  DaizhigeContent,
                  "from Daizhige", num)
    }
  })
}

function DaizhigeContent(results, content, num) {
  Object.values(results).slice(0, num).map( article => {
    let item = $('<div/>', { class: 'rhs-item' })

    let title = $(article).find('a')[0]
    $(title).attr('href', `http://www.daizhige.org${$(title).attr('href')}`)

    let snippet = $('<div/>', { html: $($(article).find('p')[0]).html() })
    // remove spaces at the begining
    $(snippet).find('.highlight').wrapInner('<b/>')
    if ($(snippet).html().substring(0,2) == '　　') {
      $(snippet).html(`${$(snippet).html().substring(2)}...`)
    }

    item.append(title).append(snippet)
    content.append(item)
  })
}

