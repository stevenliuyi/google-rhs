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
  })

  function showResults(results, fillContent, footnote_text, options) {
    if (results.length === 0) return

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
      item.className = "mod rhs-item"

      let title = document.createElement("div")
      title.innerHTML = `<a href="https://${lang}.wikipedia.org/wiki?curid=${result.pageid}">${result.title}</a>`

      let snippet = document.createElement("div")
      snippet.innerHTML = `${result.snippet}...`

      item.appendChild(title)
      item.appendChild(snippet)
      content.appendChild(item)
    })
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

    fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&srlimit=3&format=json&origin=*`)
      .then(res => res.json())
      .then(data => showResults(data.query.search,
                                WikipediaContent,
                                `from ${lang_text} Wikipedia`,
                                lang))
  }

})();
