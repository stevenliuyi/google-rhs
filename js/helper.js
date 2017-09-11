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


window.queryParams = function(params, encode=false) {
  return Object.keys(params)
           .map(k => encode ? encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) : k + '=' + params[k])
           .join('&');
}

window.languageText = function(lang){
  languages = {
    'ar': 'Arabic',
    'ara': 'Arabic',
    'az': 'Azerbaijani',
    'be': 'Belarusian',
    'bg': 'Bulgarian',
    'bn': 'Bengali',
    'bul': 'Bulgarian',
    'ca': 'Catalan',
    'ce': 'Chechen',
    'ceb': 'Cebuano',
    'chr': 'Cherokee',
    'cht': 'Chinese (Traditional)',
    'cs': 'Czech',
    'da': 'Danish',
    'dan': 'Danish',
    'de': 'German',
    'el': 'Greek',
    'en': 'English',
    'eo': 'Esperanto',
    'es': 'Spanish',
    'est': 'Estonian',
    'et': 'Estonian',
    'eu': 'Basque',
    'fa': 'Persian',
    'fi': 'Finnish',
    'fil': 'Filipino',
    'fin': 'Finnish',
    'fr': 'French',
    'fra': 'French',
    'gl': 'Galego',
    'he': 'Herbrew',
    'hi': 'Hindi',
    'hr': 'Croatian',
    'hu': 'Hungarian',
    'hy': 'Armenian',
    'id': 'Indonesian',
    'io': 'Ido',
    'it': 'Italian',
    'ja': 'Japanese',
    'jp': 'Japanese',
    'ka': 'Georgian',
    'kk': 'Kazakh',
    'kn': 'Kannada',
    'ko': 'Korean',
    'kor': 'Korean',
    'ku': 'Kurdish',
    'la': 'Latin',
    'li': 'Limburgan',
    'lt': 'Lithuanian',
    'mg': 'Malagasy',
    'min': 'Minangkabau',
    'ml': 'Malayalam',
    'ms': 'Malay',
    'msa': 'Malay',
    'my': 'Burmese',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'nn': 'Norwegian Nynorsk',
    'or': 'Oriya',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'rom': 'Romanian',
    'ru': 'Russian',
    'sh': 'Serbo-Croatian',
    'simple': 'Simple English',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'slo': 'Slovenian',
    'spa': 'Spanish',
    'sr': 'Serbian',
    'sv': 'Swedish',
    'swe': 'Swedish',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vo': 'Volapuk',
    'war': 'Waray',
    'wyw': 'Classical Chinese',
    'vi': 'Vietnamese',
    'vie': 'Vietnamese',
    'yue': 'Cantonese',
    'zh': 'Chinese',
    'zh-cn': 'Chinese',
    'zh-min-nan': 'Minnan',
    'zh-yue': 'Cantonese'
  }

  if (Object.keys(languages).includes(lang)) {
    return languages[lang]
  } else {
    console.log(`Cannot find language code ${lang}!`)
    return ''
  }
}

window.handleAPIErrors = function(response) {
  if (!response.ok) {
    throw Error(`API error occurred: ${response.status} (${response.statusText})`)
  }
  return response
}
