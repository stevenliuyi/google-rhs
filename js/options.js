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

  // settings
  let wikipedia_n = $('#wikipedia_n').val()
  let wikipedia_lang = $('#wikipedia_lang').val()
  let wolfram_type = $('#wolfram_type').val()
  let twitter_n = $('#twitter_n').val()
  let twitter_lang = $('#twitter_lang').val()
  let baidu_lang = $('#baidu_lang').val()

  chrome.storage.sync.set({
    wikipedia,
    wolfram,
    twitter,
    baidu,
    bing,
    netspeak,
    moedict,
    wikipedia_n,
    wikipedia_lang,
    wolfram_type,
    twitter_n,
    twitter_lang,
    baidu_lang
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
    wikipedia_n: '3',
    wikipedia_lang: {0:'en'},
    wolfram_type: {0:'full'},
    twitter_n: '3',
    twitter_lang: {0:'en'},
    baidu_lang: {0:'en'}
  }, function(items) {
    // sources
    $('#wikipedia').prop('checked', items.wikipedia);
    $('#wolfram').prop('checked', items.wolfram);
    $('#twitter').prop('checked', items.twitter);
    $('#baidu').prop('checked', items.baidu);
    $('#bing').prop('checked', items.bing);
    $('#netspeak').prop('checked', items.netspeak);
    $('#moedict').prop('checked', items.moedict);

    // settings
    $('#wikipedia_n').val(items.wikipedia_n)
    $('#wikipedia_lang').val(items.wikipedia_lang)
    $('#wolfram_type').val(items.wolfram_type)
    $('#twitter_n').val(items.twitter_n)
    $('#twitter_lang').val(items.twitter_lang)
    $('#baidu_lang').val(items.baidu_lang)
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
      $('#settings').show().siblings('div').hide()
      $('#settings-btn').addClass('active').siblings('button').removeClass('active')
      break
    default:
      return
  }
 
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('sources-btn').addEventListener('click', toggle_page);
document.getElementById('settings-btn').addEventListener('click', toggle_page);
