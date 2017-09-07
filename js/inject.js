(function() {
  // check if the side bar is already injected
  if (document.getElementById("sidebar-flag") !== null) return

  let flag = document.createElement("div")
  flag.id = "sidebar-flag"
  document.body.appendChild(flag)

  chrome.storage.local.get("searchQuery", function(result) {
    // get search query
    const searchQuery = result.searchQuery

    fetchWikipedia(searchQuery, 'en')
    fetchWikipedia(searchQuery, 'zh')
    fetchBingDictionary(searchQuery)
    fetchWolframAlphaShortAnswer(searchQuery)
    fetchWolframAlpha(searchQuery)
    fetchTwitter(searchQuery, 'en')
    fetchTwitter(searchQuery, 'zh-cn')
    fetchBaiduTranslate(searchQuery, 'en')
    fetchBaiduTranslate(searchQuery, 'zh')
    fetchNetSpeak(searchQuery)

  })
})();
