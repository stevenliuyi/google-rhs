function fetchMoeDict(searchQuery) {
  const q = searchQuery.replace(/\+/g," ")
  const appid = '20170907000081131'
  const key = 'oy1HbCrxvaId1Od_6XF8'
  const salt = '123456'

  // convert Simplified Chinese to Traditional Chinese
  fetch(`https://helloacm.com/api/md5/?s=${appid}${q}${salt}${key}`)
    .then(handleAPIErrors)
    .then(res => res.text())
    .then(sign => {
      params = {
        'q': q,
        'from': 'zh',
        'to': 'cht',
        'appid': appid,
        'salt': salt,
        'sign': sign.substring(1, sign.length-1)
      }
      fetch(`https://cors-anywhere.herokuapp.com/http://api.fanyi.baidu.com/api/trans/vip/translate?${queryParams(params)}`)
        .then(handleAPIErrors)
        .then(res => res.json())
        .then(data => {
          if (data.trans_result !== undefined ) {
            const cht = data.trans_result[0].dst
            fetch(`https://www.moedict.tw/raw/${cht}`)
              .then(handleAPIErrors)
              .then(res => res.json())
              .then(data => {
                showResults(data.heteronyms,
                            MoeDictContent,
                            "from Moedict",
                            cht)
              }).catch(e => console.log(e))
          }
        })
        .catch(e => console.log(e))

    })
    .catch(e => console.log(e))
}

function MoeDictContent(results, content, searchQuery) {

  results.map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let word = $('<div/>', { html: `<b><a href="https://www.moedict.tw/${searchQuery}">${decodeURIComponent(searchQuery)}</a></b>` })
    let pronunciation = $('<span/>', {
      class: 'grey-text',
      text: ` ${result.bopomofo} ${result.pinyin}`
    })
    word.append(pronunciation)
    item.append(word)

    let item_defs = $('<div/>', { class: 'rhs-item reduce-space' })
    result.definitions.map( def => {
      let def_type = (def.type !== undefined) ? `[${def.type}]` : ""
      let definition = $('<div/>', { html: `<b>${def_type}</b> ${def.def}` })
      item_defs.append(definition)
    })

    content.append(item).append(item_defs)
  })
}

