function fetchTwitter(searchQuery, lang, num) {
  const key = encodeURIComponent("HejFYvgc9HdTXktkC2UX6PuQo")
  const secret = encodeURIComponent("rePNCQkzh5iIqLvsxZd1f5TEBjLx0z3WqkPEBhU29fuNBW9CKZ")
  const token = btoa(`${key}:${secret}`)

  fetch('https://api.twitter.com/oauth2/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
    .then(handleAPIErrors)
    .then(res => res.json()).then(data => {
      params = {
        'q': searchQuery,
        'lang': lang
      }
      fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${queryParams(params)}`,
        { headers: { 'Authorization': `Bearer ${data.access_token}` } })
          .then(handleAPIErrors)
          .then(res => res.json()).then(data => (data.statuses.length > 0) &&
                  showResults(data.statuses,
                              TwitterContent,
                              "from Twitter",
                              num))
          .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

function TwitterContent(results, content, num) {

  results.slice(0,num).map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let info = $('<div/>', {
      class: 'grey-text',
      html: `<a href="https://twitter.com/${result.user.screen_name}">${result.user.name}</a> @${result.user.screen_name} ${result.created_at.substring(4, 10)} ${result.created_at.substring(result.created_at.length-4)}`
    })
      
    let text = $('<div/>', { html: result.text })

    item.append(text)
    item.append(info)

    content.append(item)
 
  })

}

