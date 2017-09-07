(function() {
  // check if the side bar is already injected
  if (document.getElementById("sidebar-flag") !== null) return

  let flag = document.createElement("div")
  flag.id = "sidebar-flag"
  document.body.appendChild(flag)

  chrome.storage.local.get("searchQuery", function(result) {
    // get search query
    const searchQuery = result.searchQuery

    fetchWikipedia(searchQuery, 'en')
    fetchWikipedia(searchQuery, 'zh')
    fetchBingDictionary(searchQuery)

  })

  function showResults(results, fillContent, footnote_text, options) {
    let rhs = document.getElementById("rhs_block")
    let site = document.createElement("div")
    site.className = "g rhs-view"

    content = document.createElement("div")
    content.className = "rhs-content"

    fillContent(results, content, options)

    let footnote = document.createElement("div")
    footnote.className="rhs-view rhs-footnote"
    footnote.innerHTML = footnote_text

    site.appendChild(content)
    site.appendChild(footnote)
    rhs.appendChild(site) 
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

  function fetchWikipedia(searchQuery, lang) {
    let lang_text = ""
    switch(lang) {
      case 'en':
        lang_text = "English"
        break
      case 'zh':
        lang_text = "Chinese"
        break
      default:
        console.log(`Cannot find lanugage code ${lang}!`)
        return
    }

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

  function fetchBingDictionary(searchQuery) {
    params = {
      'Word': searchQuery,
      'Samples': 'false'
    }
    fetch(`https://cors-anywhere.herokuapp.com/https://xtk.azurewebsites.net/BingDictService.aspx?${queryParams(params)}`)
      .then(res => res.json())
      .then(data => (data.word !== null) &&
              showResults(data,
                          BingDictionaryContent,
                          "from Bing Dictionary"))
      .catch(e => console.log(e))
  }

  function queryParams(params) {
    return Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
  }


})();
