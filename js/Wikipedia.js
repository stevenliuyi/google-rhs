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
    let item = document.createElement("div")
    item.className = "rhs-item"

    let title = document.createElement("div")
    title.innerHTML = `<a href="https://${lang}.wikipedia.org/wiki?curid=${result.pageid}">${result.title}</a>`

    let snippet = document.createElement("div")
    snippet.innerHTML = `${result.snippet}...`

    item.appendChild(title)
    item.appendChild(snippet)
    content.appendChild(item)
  })
}
