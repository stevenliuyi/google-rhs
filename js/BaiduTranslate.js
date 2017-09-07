function fetchBaiduTranslate(searchQuery, lang) {
  const q = searchQuery.replace(/\+/g," ")
  const appid = '20170907000081131'
  const key = 'oy1HbCrxvaId1Od_6XF8'
  const salt = '123456'

  fetch(`https://helloacm.com/api/md5/?s=${appid}${q}${salt}${key}`)
  .then(res => res.text())
  .then(sign => {
    params = {
      'q': q,
      'from': 'auto',
      'to': lang,
      'appid': appid,
      'salt': salt,
      'sign': sign.substring(1, sign.length-1)
    }
    fetch(`https://cors-anywhere.herokuapp.com/http://api.fanyi.baidu.com/api/trans/vip/translate?${queryParams(params,false)}`)
      .then(res => res.json())
      .then(data => (data.trans_result !== undefined ) &&
              (data.from !== data.to) &&
              showResults(data,
                          BaiduTranslateContent,
                          "from Baidu Translate"))

  })
}

function BaiduTranslateContent(results, content) {
  let item_source = document.createElement("div")
  item_source.className = "rhs-item"
  let source = document.createElement("div")
  source.innerHTML = `<b>${languageText(results.from)} text:</b> ${results.trans_result[0].src}</b>`

  item_source.appendChild(source)

  let item_target = document.createElement("div")
  item_target.className = "rhs-item"
  let target = document.createElement("div")
  target.innerHTML = `<b>${languageText(results.to)} translation:</b> ${results.trans_result[0].dst}</b>`
  item_target.appendChild(target)

  content.appendChild(item_source)
  content.appendChild(item_target)
}


