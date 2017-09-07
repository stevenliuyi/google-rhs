function fetchBingDictionary(searchQuery) {
  params = {
    'Word': searchQuery.replace(/\+/g, " "),
    'Samples': 'false'
  }
  fetch(`https://xtk.azurewebsites.net/BingDictService.aspx?${queryParams(params)}`)
    .then(res => res.json())
    .then(data => (data.word !== null) &&
            showResults(data,
                        BingDictionaryContent,
                        "from Bing Dictionary"))
    .catch(e => console.log(e))
}

function BingDictionaryContent(results, content) {

  let item = document.createElement("div")
  item.className = "rhs-item"

  let word = document.createElement("div")
  word.innerHTML = `<b>${results.word}</b>`
  
  let pronunciation = document.createElement("div")
  pronunciation.className = "grey-text"
  pronunciation.innerHTML = (results.pronunciation !== null) ?
    `US [${results.pronunciation.AmE}] UK[${results.pronunciation.BrE}]` :
    ""

  item.appendChild(word)
  item.appendChild(pronunciation)

  let item_defs = document.createElement("div")
  item_defs.className = "rhs-item reduce-space"

  results.defs.map( result => {
    let definition = document.createElement("div")
    definition.innerHTML = `<b>${result.pos}</b> ${result.def}`
    item_defs.appendChild(definition)
  })

  content.appendChild(item)
  content.appendChild(item_defs)
}

