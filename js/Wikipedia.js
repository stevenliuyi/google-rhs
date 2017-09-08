function fetchWikipedia(searchQuery, lang) {
  let lang_text = languageText(lang)

  let params = {
    'action': 'query',
    'list': 'search',
    'srsearch': searchQuery,
    'srlimit': 3,
    'format': 'json',
    'origin': '*'
  }

  fetch(`https://${lang}.wikipedia.org/w/api.php?${queryParams(params)}`)
    .then(res => res.json())
    .then(data => (data.query.search.length !== 0) &&
            showResults(data.query.search,
                              WikipediaContent,
                              `from ${lang_text} Wikipedia`,
                              lang))
}

function WikipediaContent(results, content, lang) {
  results.map(result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let title = $('<div/>').append(
      $('<a/>', {
        href: `https://${lang}.wikipedia.org/wiki?curid=${result.pageid}`,
        text: result.title
      })
    )

    let snippet = $('<div/>', {
      html: `${result.snippet}...`
    })

    item.append(title).append(snippet)

    content.append(item)
  })
}
