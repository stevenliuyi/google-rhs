function fetchWikimedia(searchQuery, lang, num, project) {
  let lang_text = languageText(lang)

  let params = {
    'action': 'query',
    'list': 'search',
    'srsearch': searchQuery,
    'srlimit': num,
    'format': 'json',
    'origin': '*'
  }

  fetch(`https://${lang}.${project}.org/w/api.php?${queryParams(params)}`)
    .then(handleAPIErrors)
    .then(res => res.json())
    .then(data => (data.query.search.length !== 0) &&
            showResults(data.query.search,
                              WikimediaContent,
                              `from ${lang_text} ${sources.sources[project]}`,
                              {lang, project}))
    .catch(e => console.log(e))
}

function WikimediaContent(results, content, options) {
  results.map(result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let title = $('<div/>').append(
      $('<a/>', {
        href: `https://${options.lang}.${options.project}.org/wiki?curid=${result.pageid}`,
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
