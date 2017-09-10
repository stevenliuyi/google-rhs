function fetchQuora(searchQuery, num) {
  fetch(`https://www.quora.com/search?q=${searchQuery}`)
    .then(res => res.text())
    .then(html => {
      let results = $($.parseHTML(html)).find('.QuestionQueryResult')
      showResults(results,
                  QuoraContent,
                  "from Quora",
                  num)
    })
}

function QuoraContent(results, content, num) {
  Object.values(results).slice(0, num).map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let link = $($(result).find('a')[0]).attr('href')
    let question = $(`<a href="https://www.quora.com${link}"></a>`)
      .append($($(result).find('span.question_text')[0]))

    let answer = $('<div/>')append(
      $(result).find('span.search_result_snippet')[0]
    )
    $(answer).find('p').contents().unwrap()

    item.append(question).append(answer)
    content.append(item)
  })
}

