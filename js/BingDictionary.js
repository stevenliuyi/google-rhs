function fetchBingDictionary(searchQuery) {
  params = {
    'Word': searchQuery.replace(/\+/g, " "),
    'Samples': 'false'
  }
  fetch(`https://xtk.azurewebsites.net/BingDictService.aspx?${queryParams(params)}`)
    .then(handleAPIErrors)
    .then(res => res.json())
    .then(data => (data.word !== null) &&
            showResults(data,
                        BingDictionaryContent,
                        "from Bing Dictionary"))
    .catch(e => console.log(e))
}

function BingDictionaryContent(results, content) {

  let item = $('<div/>', { class: 'rhs-item' })

  let word = $('<div/>', { html: `<b>${results.word}</b>` })
  
  let pronunciation = $('<div/>', {
    class: 'grey-text',
    html: (results.pronunciation !== null) ?
    `US [${results.pronunciation.AmE}] UK[${results.pronunciation.BrE}]` :
    ""
  })

  item.append(word)
  item.append(pronunciation)

  let item_defs = $('<div/>', { class: 'rhs-item reduce-space' })

  results.defs.map( result => {
    let definition = $('<div/>', { html: `<b>${result.pos}</b> ${result.def}` })
    item_defs.append(definition)
  })

  content.append(item).append(item_defs)
}

