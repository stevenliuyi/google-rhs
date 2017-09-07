window.showResults = function(results, fillContent, footnote_text, options) {
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


window.queryParams = function(params, encode=true) {
  return Object.keys(params)
           .map(k => encode ? encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) : k + '=' + params[k])
           .join('&');
}

window.languageText = function(lang){
  let lang_text=  ""
  switch(lang) {
    case 'en':
      lang_text = "English"
      break
    case 'zh':
      lang_text = "Chinese"
      break
    default:
      console.log(`Cannot find lanugage code ${lang}!`)
  }

  return lang_text
}

