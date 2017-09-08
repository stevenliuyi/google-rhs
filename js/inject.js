(function() {
  // check if the side bar is already injected
  if (document.getElementById("sidebar-flag") !== null) return

  let flag = document.createElement("div")
  flag.id = "sidebar-flag"
  document.body.appendChild(flag)

  chrome.storage.local.get("searchQuery", function(result) {
    // get search query
    const searchQuery = result.searchQuery

    // read options
    chrome.storage.sync.get({
      wikipedia: true,
      wolfram: true, 
      twitter: true,
      baidu: true,
      bing: true,
      netspeak: true
    }, function(options) {
      if (options.wikipedia) fetchWikipedia(searchQuery, 'en')
      if (options.wikipedia) fetchWikipedia(searchQuery, 'zh')
      if (options.bing) fetchBingDictionary(searchQuery)
      if (options.wolfram) fetchWolframAlphaShortAnswer(searchQuery)
      if (options.wolfram) fetchWolframAlpha(searchQuery)
      if (options.twitter) fetchTwitter(searchQuery, 'en')
      if (options.twitter) fetchTwitter(searchQuery, 'zh-cn')
      if (options.baidu) fetchBaiduTranslate(searchQuery, 'en')
      if (options.baidu) fetchBaiduTranslate(searchQuery, 'zh')
      if (options.netspeak) fetchNetSpeak(searchQuery)
    })

  })
})();
