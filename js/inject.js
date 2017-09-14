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
      checked: sources.checked_default,
      settings: sources.settings_default
    }, function(options) {
      if (options.checked.wikipedia) {
        Object.values(options.settings.wikipedia_lang).map(lang =>
          fetchWikimedia(searchQuery, lang, Number(options.settings.wikipedia_n), 'wikipedia'))
      }


      if (options.checked.wolfram && Object.values(options.settings.wolfram_type).includes('short'))
        fetchWolframAlphaShortAnswer(searchQuery)
      if (options.checked.wolfram && Object.values(options.settings.wolfram_type).includes('full'))
        fetchWolframAlpha(searchQuery)

      if (options.checked.bing) fetchBingDictionary(searchQuery)

      if (options.checked.wiktionary) {
        Object.values(options.settings.wiktionary_lang).map(lang =>
          fetchWikimedia(searchQuery, lang, Number(options.settings.wiktionary_n), 'wiktionary'))
      }

      if (options.checked.wikisource) {
        Object.values(options.settings.wikisource_lang).map(lang =>
          fetchWikimedia(searchQuery, lang, Number(options.settings.wikisource_n), 'wikisource'))
      }

      if (options.checked.twitter) {
        Object.values(options.settings.twitter_lang).map(lang =>
          fetchTwitter(searchQuery, lang, Number(options.settings.twitter_n)))
      }

      if (options.checked.baidu) {
        Object.values(options.settings.baidu_lang).map(lang =>
          fetchBaiduTranslate(searchQuery, lang))
      }

      if (options.checked.reddit) fetchReddit(searchQuery, Number(options.settings.reddit_n))
      if (options.checked.quora) fetchQuora(searchQuery, Number(options.settings.quora_n))
      if (options.checked.zhihu) fetchZhihu(searchQuery, Number(options.settings.zhihu_n))
      if (options.checked.wechat) fetchWechat(searchQuery, Number(options.settings.wechat_n))
      if (options.checked.iciba) fetchIciba(searchQuery)
      if (options.checked.netspeak) fetchNetSpeak(searchQuery)
      if (options.checked.moedict) fetchMoeDict(searchQuery)
      if (options.checked.daizhige) fetchDaizhige(searchQuery, Number(options.settings.daizhige_n))
    })

  })
})();
