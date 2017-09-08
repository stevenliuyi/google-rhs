// Saves options to chrome.storage.sync.
function save_options() {
  let wikipedia = document.getElementById('wikipedia').checked;
  let wolfram = document.getElementById('wolfram').checked;
  let twitter = document.getElementById('twitter').checked;
  let baidu = document.getElementById('baidu').checked;
  let bing = document.getElementById('bing').checked;
  let netspeak = document.getElementById('netspeak').checked;
  let moedict = document.getElementById('moedict').checked;

  chrome.storage.sync.set({
    wikipedia,
    wolfram,
    twitter,
    baidu,
    bing,
    netspeak,
    moedict
  }, function() {
    // Update status to let user know options were saved.
    $('#status-alert').removeAttr('hidden')
    setTimeout(function() {
      $('#status-alert').attr('hidden','')
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
    moedict: false
  }, function(items) {
    document.getElementById('wikipedia').checked = items.wikipedia;
    document.getElementById('wolfram').checked = items.wolfram;
    document.getElementById('twitter').checked = items.twitter;
    document.getElementById('baidu').checked = items.baidu;
    document.getElementById('bing').checked = items.bing;
    document.getElementById('netspeak').checked = items.netspeak;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
