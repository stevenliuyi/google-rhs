function fetchZhihu(searchQuery, num) {
  fetch(`https://zhihu.sogou.com/zhihu?query=${searchQuery}`)
    .then(res => res.text())
    .then(html => {
      let results = $($.parseHTML(html)).find('.result-about-list')
      if (results.length > 0) {
        showResults(results,
                    ZhihuContent,
                    "from Zhihu",
                    num)
      }
    })
}

function ZhihuContent(results, content, num) {
  Object.values(results).slice(0, num).map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let question = $('<div/>').append(
      $(result).find('.about-list-title')[0]
    )
    $(question).find('h4').contents().unwrap()
    $(question).find('em').contents().unwrap()

    let count = $('<div/>', { class: 'grey-text' }).append(
      $(result).find('span.count')[0]
    )

    let answer = $('<div/>').append(
      $(result).find('.summary-answer-num')[0]
    )
    $(answer).find('a').contents().unwrap()
    $(answer).find('p').contents().unwrap()
    $(answer).find('em').contents().unwrap().wrap('<b/>')

    item.append(question).append(count).append(answer)
    content.append(item)
  })
}

