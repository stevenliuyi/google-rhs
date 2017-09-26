function fetchIciba(searchQuery) {
  params = {
    'w': searchQuery,
    'type': 'json',
    'key': 'BA98FEB6ADF55B5A4D2CF704B5D2C2E9'
  }
  fetch(`https://dict-co.iciba.com/api/dictionary.php?${queryParams(params)}`)
    .then(handleAPIErrors)
    .then(res => res.json())
    .then(data => (data.symbols[0].parts !== undefined) &&
            showResults(data,
                        IcibaContent,
                        "from iCiba"))
    .catch(e => console.log(e))
}

function IcibaContent(results, content) {

  let item = $('<div/>', { class: 'rhs-item' })

  let word = $('<div/>', {
    html: `<a href="http://www.iciba.com/${results.word_name}">${results.word_name}</a>`
  })
  
  let ph_am = results.symbols[0].ph_am
  let ph_en = results.symbols[0].ph_en
  let pronunciation = $('<div/>', {
    class: 'grey-text',
    html: (ph_am !== undefined && ph_am !== '') ? 
            `US [${ph_am}] UK[${ph_en}]` :
            ""
  })

  item.append(word).append(pronunciation)

  let item_defs = $('<div/>', { class: 'rhs-item reduce-space' })

  results.symbols[0].parts.map( result => {
    let definition = $('<div/>', {
      html: (result.part !== undefined) ?
        `<b>${result.part}</b> ${result.means.join('; ')}` : // English
        `<b>[${result.part_name}]</b> ${ // Chinese
          result.means.reduce((a, b) => {
            return (a !== "") ? a.concat(`; ${b.word_mean}`) : b.word_mean
          }, "")
        }`
    })
    item_defs.append(definition)
  })

  content.append(item).append(item_defs)
}

