window.showResults = function(results, fillContent, footnote_text, options) {

  let site = $('<div/>', { class: 'g rhs-view' })

  let content = $('<div/>', { class: 'rhs-content' }) 

  fillContent(results, content, options)

  let footnote = $('<div/>', {
    class: 'rhs-view rhs-footnote',
    html: footnote_text
  })

  site.append(content).append(footnote)
  $('#rhs_block').append(site) 
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
      console.log(`Cannot find language code ${lang}!`)
  }

  return lang_text
}

window.handleAPIErrors = function(response) {
  if (!response.ok) {
    throw Error(`API error occurred: ${response.status} (${response.statusText})`)
  }
  return response
}
