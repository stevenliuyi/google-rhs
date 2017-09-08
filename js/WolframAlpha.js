function fetchWolframAlpha(searchQuery) {
  // set width based on window size
  let width = 400
  if (document.getElementsByClassName("rhstc3").length >= 1) {
    width = 220
  } else if (document.getElementsByClassName("rhstc4").length >= 1) {
    width = 300
  }

  params = {
    appid: 'URU5QJ-RT8A4GRQ6Q',
    input: searchQuery,
    format: 'image',
    width: width,
    plotwidth: width,
    mag: 0.9
  }

  fetch(`https://api.wolframalpha.com/v2/query?${queryParams(params,false)}`)
    .then(handleAPIErrors)
    .then(res => res.text())
    .then(text => {
       let xml = document.createElement("xml")
       xml.innerHTML = text
       let images = xml.getElementsByTagName("img")
       
       if (images.length >= 1) {
         showResults(images,
                     WolframAlphaContent,
                     "from Wolfram Alpha",
                     searchQuery)
       }

    })
    .catch(e => console.log(e))
}

function fetchWolframAlphaShortAnswer(searchQuery) {
  params = {
    appid: 'URU5QJ-RT8A4GRQ6Q',
    i: searchQuery
  }

  fetch(`https://api.wolframalpha.com/v1/result?${queryParams(params,false)}`)
    .then(handleAPIErrors)
    .then(res => res.text())
    .then(text => {
         (['Wolfram|Alpha did not understand your input',
            'No short answer available'].indexOf(text) === -1) && showResults(text,
                     WolframAlphaShortAnswerContent,
                     "from Wolfram Alpha")
       })
    .catch(e => console.log(e))
    
}

function WolframAlphaContent(results, content, searchQuery) {

  Array.from(results).slice(0,2).map( image => {
    let item = $('<div/>', { class: 'rhs-item' })
    item.append(image)

    content.append(item)
  })

  let item_more = $('<div/>', {
    class: 'rhs-item',
    html: `<a href="http://www.wolframalpha.com/input/?i=${searchQuery}">more...</a>`
  })

  content.append(item_more)
}

function WolframAlphaShortAnswerContent(results, content) {

  let item = $('<div/>', { class: 'rhs-item' })

  let title = $('<div/>', {
    html: '<b>Short Answer</b>'
  })
  
  let answer = $('<div/>', {
    html: results
  })
  item.append(title).append(answer)

  content.append(item)
}

