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
}

function fetchWolframAlphaShortAnswer(searchQuery) {
  params = {
    appid: 'URU5QJ-RT8A4GRQ6Q',
    i: searchQuery
  }

  fetch(`https://api.wolframalpha.com/v1/result?${queryParams(params,false)}`)
    .then(res => res.text())
    .then(text => {
         (['Wolfram|Alpha did not understand your input',
            'No short answer available'].indexOf(text) === -1) && showResults(text,
                     WolframAlphaShortAnswerContent,
                     "from Wolfram Alpha")
       })
    
}

function WolframAlphaContent(results, content, searchQuery) {

  Array.from(results).slice(0,2).map( image => {
  let item = document.createElement("div")
  item.className = "rhs-item"
  item.appendChild(image)

  content.appendChild(item)
  })

  let item_more = document.createElement("div")
  item_more.className = "rhs-item"

  let more = document.createElement("div")
  more.innerHTML = `<a href="http://www.wolframalpha.com/input/?i=${searchQuery}">more...</a>`
  item_more.appendChild(more)

  content.appendChild(item_more)
}

function WolframAlphaShortAnswerContent(results, content) {

  let item = document.createElement("div")
  item.className = "rhs-item"

  let title = document.createElement("div")
  title.innerHTML = "<b>Short Answer</b>"
  
  let answer = document.createElement("div")
  answer.innerHTML = results

  item.appendChild(title)
  item.appendChild(answer)

  content.appendChild(item)
}

