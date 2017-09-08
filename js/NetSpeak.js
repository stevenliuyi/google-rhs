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
  
  let item = $('<div/>', { class: 'rhs-item' })

  results['4'].map( result => {
    const w = result['3'].reduce((a, b) => `${a} ${b['2']}`, "")
    let words = $('<div/>', {
      html: `<b>${w}</b> - ${Intl.NumberFormat().format(result['2'])} (${(result['2']/results['7']*100).toFixed(2)}%)`
    })

    item.append(words)
  })

  content.append(item)
}
