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
      baidu: false,
      bing: false,
      netspeak: false,
      moedict: false,
      reddit: false,
      wikipedia_n: '3',
      wikipedia_lang: {0:'en'},
      wolfram_type: {0:'full'},
      twitter_n: '3',
      twitter_lang: {0:'en'},
      baidu_lang:{0:'en'},
      reddit_n: '3'
    }, function(options) {
      if (options.wikipedia) {
        Object.values(options.wikipedia_lang).map(lang =>
          fetchWikipedia(searchQuery, lang, Number(options.wikipedia_n)))
      }

      if (options.bing) fetchBingDictionary(searchQuery)

      if (options.wolfram && Object.values(options.wolfram_type).includes('short'))
        fetchWolframAlphaShortAnswer(searchQuery)
      if (options.wolfram && Object.values(options.wolfram_type).includes('full'))
        fetchWolframAlpha(searchQuery)

      if (options.twitter) {
        Object.values(options.twitter_lang).map(lang =>
          fetchTwitter(searchQuery, lang, Number(options.twitter_n)))
      }

      if (options.baidu) {
        Object.values(options.baidu_lang).map(lang =>
          fetchBaiduTranslate(searchQuery, lang))
      }

      if (options.reddit) fetchReddit(searchQuery, Number(options.reddit_n))
      if (options.netspeak) fetchNetSpeak(searchQuery)
      if (options.moedict) fetchMoeDict(searchQuery)
    })

  })
})();
