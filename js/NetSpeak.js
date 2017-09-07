function fetchNetSpeak(searchQuery) {
  params = {
    query: searchQuery,
    format: 'json',
    topk: 5
  }

  fetch(`https://cors-anywhere.herokuapp.com/http://api.netspeak.org/netspeak3/search?${queryParams(params,false)}`)
    .then(res => res.json()).then( data => {
      if (data['4'].length > 1) {
          showResults(data, NetSpeakContent, "from Netspeak")
      }
    })
}

function NetSpeakContent(results, content) {
  
  let item = document.createElement("div")
  item.className = "rhs-item"

  results['4'].map( result => {
    let words = document.createElement("div")
    const w = result['3'].reduce((a, b) => `${a} ${b['2']}`, "")
    words.innerHTML = `<b>${w}</b> - ${Intl.NumberFormat().format(result['2'])} (${(result['2']/results['7']*100).toFixed(2)}%)`

    item.appendChild(words)
  })

  content.appendChild(item)
}
