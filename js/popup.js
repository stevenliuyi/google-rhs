document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get({ paused: false }, function(result) {
    if (result.paused) {
      $('#pause').addClass('active')
      $('#pause').text('Unpause RHS')
    }
  })
    
  // pause button
  document.querySelector('#pause').addEventListener('click', function() {
    if ($('#pause').hasClass('active')) {
      $('#pause').removeClass('active')
      $('#pause').text('Pause RHS')
      chrome.storage.local.set({ paused: false })
    } else {
      $('#pause').addClass('active')
      $('#pause').text('Unpause RHS')
      chrome.storage.local.set({ paused: true})
    }
  })

  // options button
  document.querySelector('#options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
      // New way to open options pages, if supported (Chrome 42+).
      chrome.runtime.openOptionsPage();
    } else {
      // Reasonable fallback.
      window.open(chrome.runtime.getURL('options.html'));
    }
})
})

