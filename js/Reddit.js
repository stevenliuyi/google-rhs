function fetchReddit(searchQuery, num) {
  params = {
    q: searchQuery,
    sort: 'relevance'
  }

  fetch(`https://www.reddit.com/search.json?${queryParams(params)}`)
    .then(handleAPIErrors)
    .then(res => res.json()).then( data => {
      if (data.data.children.length > 1) {
          showResults(data.data.children,
                      RedditContent,
                      "from Reddit",
                      num)
      }
    })
    .catch(e => console.log(e))
}

function RedditContent(results, content, num) {
  

  results.slice(0,num).map( result => {
    let item = $('<div/>', { class: 'rhs-item' })

    let title = $('<div/>', { 
      html : `<a href="https://www.reddit.com${result.data.permalink}">${result.data.title}</a>`
    })

    let subreddit = $('<div/>', {
      class: 'grey-text',
      text: result.data.subreddit_name_prefixed
    })

    item.append(title).append(subreddit)
    content.append(item)
  })

}
