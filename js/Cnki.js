function fetchCnki(searchQuery, num) {
  // send query to background page since HTTP request cannot be made here
  document.cookie = `inputkw=${searchQuery}`
  chrome.runtime.sendMessage({ source: 'CnkiSearch', query: searchQuery }, res => {
    // obtain result url
    let url = $($.parseHTML(res.html_string)).find('#brief').attr('src')
    url = `http://gongjushu.cnki.net/refbook/${url}` 

    chrome.runtime.sendMessage({ source: 'CnkiBrief', url: url }, res => {
      const results = $($.parseHTML(res.html_string)).find('dl')
      if (results.length > 0) {
        showResults(results,
                    CnkiContent,
                    "from CNKI Reference Books",
                    num)
      }
    })
  })
}


function CnkiContent(results, content, num) {
  Object.values(results).slice(0, num).map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let title = $('<div/>').append(
      $(result).find('a')[0]
    )
    $(title).find('font').contents().unwrap()
    $(title).find('a').attr('href', `http://gongjushu.cnki.net/refbook/${ $(title).find('a').attr('href') }`)

    let snippet = $('<div/>').append(
      $(result).find('p').contents().get(0).nodeValue 
    )

    let ref = $('<div/>', { class: 'grey-text' }).append(
      $(result).find('.bookresource').find('a')
    )
    $(ref).find('a').contents().unwrap()

    item.append(title).append(snippet).append(ref)
    content.append(item)
  })
}

