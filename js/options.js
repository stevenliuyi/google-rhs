// Saves options to chrome.storage.sync.
function save_options() {
  // sources
  let wikipedia = $('#wikipedia').prop('checked')
  let wolfram = $('#wolfram').prop('checked')
  let twitter = $('#twitter').prop('checked')
  let baidu = $('#baidu').prop('checked')
  let bing = $('#bing').prop('checked')
  let netspeak = $('#netspeak').prop('checked')
  let moedict = $('#moedict').prop('checked')
  let reddit = $('#reddit').prop('checked')
  let daizhige = $('#daizhige').prop('checked')

  // settings
  let wikipedia_n = $('#wikipedia_n').val()
  let wikipedia_lang = $('#wikipedia_lang').val()
  let wolfram_type = $('#wolfram_type').val()
  let twitter_n = $('#twitter_n').val()
  let twitter_lang = $('#twitter_lang').val()
  let baidu_lang = $('#baidu_lang').val()
  let reddit_n = $('#reddit_n').val()
  let daizhige_n = $('#daizhige_n').val()

  chrome.storage.sync.set({
    wikipedia,
    wolfram,
    twitter,
    baidu,
    bing,
    netspeak,
    moedict,
    reddit,
    daizhige,
    wikipedia_n,
    wikipedia_lang,
    wolfram_type,
    twitter_n,
    twitter_lang,
    baidu_lang,
    reddit_n,
    daizhige_n,
  }, function() {
    // Update status to let user know options were saved.
    $('#status-alert').removeAttr('hidden')
    setTimeout(function() {
      $('#status-alert').attr('hidden', '')
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get({
    wikipedia: true,
    wolfram: true,
    twitter: true,
    baidu: false,
    bing: false,
    netspeak: false,
    moedict: false,
    reddit: false,
    daizhige: false,
    wikipedia_n: '3',
    wikipedia_lang: {0:'en'},
    wolfram_type: {0:'full'},
    twitter_n: '3',
    twitter_lang: {0:'en'},
    baidu_lang: {0:'en'},
    reddit_n: '3',
    daizhige_n: '3'
  }, function(items) {
    // sources
    $('#wikipedia').prop('checked', items.wikipedia);
    $('#wolfram').prop('checked', items.wolfram);
    $('#twitter').prop('checked', items.twitter);
    $('#baidu').prop('checked', items.baidu);
    $('#bing').prop('checked', items.bing);
    $('#netspeak').prop('checked', items.netspeak);
    $('#moedict').prop('checked', items.moedict);
    $('#reddit').prop('checked', items.reddit);
    $('#daizhige').prop('checked', items.daizhige);

    // settings
    $('#wikipedia_n').val(items.wikipedia_n)
    $('#wikipedia_lang').val(items.wikipedia_lang)
    $('#wolfram_type').val(items.wolfram_type)
    $('#twitter_n').val(items.twitter_n)
    $('#twitter_lang').val(items.twitter_lang)
    $('#baidu_lang').val(items.baidu_lang)
    $('#reddit_n').val(items.reddit_n)
    $('#daizhige_n').val(items.daizhige_n)

  });
}

function toggle_page(event) {
  const btn = event.target.id
  switch(btn) {
    case "sources-btn":
      $('#sources').show().siblings('div').hide()
      $('#sources-btn').addClass('active').siblings('button').removeClass('active')
      break
    case "settings-btn":
      // hide settings for unselected sources
      ['wikipedia', 'wolfram', 'twitter', 'baidu', 'reddit', 'daizhige'].map( source => {
        if ($(`#${source}`).prop('checked')) {
          $(`#${source}-settings`).removeAttr('hidden')
        } else {
          $(`#${source}-settings`).attr('hidden', '')
        }
      })
      $('#settings').show().siblings('div').hide()
      $('#settings-btn').addClass('active').siblings('button').removeClass('active')
      break
    default:
      return
  }
 
}

function load_wikipedia_lang() {
  langs = ['ar', 'az', 'be', 'bg', 'ca', 'ce', 'ceb', 'cs', 'da', 'de', 'el', 'eo', 'es', 'et', 'eu', 'fa', 'gl', 'ja', 'ko', 'fi', 'fr', 'hi', 'hr', 'hu', 'hy', 'id', 'it', 'kk', 'min', 'ms', 'nl', 'no', 'nn', 'pl', 'pt', 'ro', 'ru', 'sh', 'simple', 'sk', 'sl', 'sr', 'sv', 'ta', 'th', 'tr', 'uk', 'ur', 'uz', 'vi', 'vo', 'war', 'zh', 'zh-min-nan', 'zh-yue']
  langs.map ( lang => {
    $('#wikipedia_lang').append(
      $('<option/>', {
        value: lang,
        id: `wikipedia_${lang}`,
        text: languageText(lang)
      })   
    )
  })
  $('#wikipedia_lang option').sort((a,b) => (a.text.localeCompare(b.text))).appendTo('#wikipedia_lang')
  $('#wikipedia_lang option').sort((a,b) => (a.text.localeCompare(b.text))).appendTo('#wikipedia_lang')
  $('#wikipedia_lang').prepend(
    $('<option/>', {
      value: 'en',
      id: 'wikipedia_en',
      text: 'English (default)',
      selected: ''
    })
  )
}

function load_twitter_lang() {
  langs = ['ar', 'bn', 'cs', 'da', 'de', 'el', 'es', 'fa', 'fi', 'fil', 'fr', 'he', 'hi', 'hu', 'id', 'it', 'ja', 'ko', 'msa', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'zh-cn' ]
  langs.map ( lang => {
    $('#twitter_lang').append(
      $('<option/>', {
        value: lang,
        id: `twitter_${lang}`,
        text: languageText(lang)
      })   
    )
  })
  $('#twitter_lang option').sort((a,b) => (a.text.localeCompare(b.text))).appendTo('#twitter_lang')
  $('#twitter_lang').prepend(
    $('<option/>', {
      value: 'en',
      id: 'twitter_en',
      text: 'English (default)',
      selected: ''
    })
  )
}

function load_baidu_lang() {
  langs = ['ara', 'bul', 'cs', 'cht', 'dan', 'de', 'el', 'est', 'fin', 'fra', 'hu', 'kor', 'it', 'jp', 'nl', 'pt', 'rom', 'slo', 'spa', 'swe', 'th', 'ru', 'vie', 'wyw', 'yue', 'zh']
  langs.map ( lang => {
    $('#baidu_lang').append(
      $('<option/>', {
        value: lang,
        id: `baidu_${lang}`,
        text: languageText(lang)
      })   
    )
  })
  $('#baidu_lang option').sort((a,b) => (a.text.localeCompare(b.text))).appendTo('#baidu_lang')
  $('#baidu_lang').prepend(
    $('<option/>', {
      value: 'en',
      id: 'baidu_en',
      text: 'English (default)',
      selected: ''
    })
  )
}

document.addEventListener('DOMContentLoaded', function() {
  load_wikipedia_lang()
  load_twitter_lang()
  load_baidu_lang()
  restore_options()
});
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('sources-btn').addEventListener('click', toggle_page);
document.getElementById('settings-btn').addEventListener('click', toggle_page);
