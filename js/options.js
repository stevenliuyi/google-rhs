// Saves options to chrome.storage.sync.
function save_options() {
  // sources
  let checked = {}
  Object.keys(sources.sources).map (source =>
    checked[source] = $(`#${source}`).prop('checked') 
  )

  // settings
  let settings = {}
  Object.keys(sources.settings_default).map( setting =>
    settings[setting] = $(`#${setting}`).val()
  )

  chrome.storage.sync.set({
    checked: checked,
    settings: settings
  },function() {
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
    checked: sources.checked_default,
    settings: sources.settings_default
  }, function(items) {
    // sources
    Object.keys(items.checked).map( source =>
      $(`#${source}`).prop('checked', items.checked[source])
    )

    // settings
    Object.keys(items.settings).map( setting =>
      $(`#${setting}`).val(items.settings[setting])
    )
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
      // find all sources with settings
      const sources_with_settings = Array.from(new Set(Object.keys(sources.settings_default)
        .map(setting=>setting.replace(/_.*/,''))))
      // hide settings for unselected sources
      sources_with_settings.map( source => {
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


function load_source_lang(source, langs) {
  // create <option/> for all languages
  langs.map ( lang => {
    $(`#${source}_lang`).append(
      $('<option/>', {
        value: lang,
        id: `${source}_${lang}`,
        text: languageText(lang)
      })   
    )
  })

  // sort languages alphabetically
  $(`#${source}_lang option`).sort((a,b) => (a.text.localeCompare(b.text))).appendTo(`#${source}_lang`)

  // add English as the default language
  $(`#${source}_lang`).prepend(
    $('<option/>', {
      value: 'en',
      id: `${source}_en`,
      text: 'English (default)',
      selected: ''
    })
  )
}

function load_source_num(source) {
  Array.from(Array(10).keys()).map( num => {
    $(`#${source}_n`).append(
      $('<option/>', {
        value: num+1,
        id: `${source}_${num+1}`,
        text: num+1
      })
    ) 
  })

  // default value
  $(`#${source}_3`).attr('selected', '')
}

function add_sources() {
  let col1 = $('<div/>', { class: 'col' })
  let col2 = $('<div/>', { class: 'col' })
  let odd = true

  Object.keys(sources.sources).map( source => {
      let label = $('<label/>', { class: 'form-check-label' })

      label.append($('<input/>', {
        class: 'form-check-input',
        type: 'checkbox',
        id: source
      })).append(sources.sources[source])

      let check = $('<div/>', { class: 'form-check' })
      check.append(label)

      if (odd) {
        col1.append(check)
        odd = false
      } else {
        col2.append(check)
        odd = true
      }
  })

  $('#sources-row').append(col1).append(col2)
}


document.addEventListener('DOMContentLoaded', function() {
  add_sources()

  // add language settings
  Object.keys(sources.languages).map( source => {
    load_source_lang(source, sources.languages[source])
  })

  // add settings for number of items
  const sources_num = Object.keys(sources.settings_default)
    .filter(setting => setting.match(/_n/))
    .map(setting => setting.substring(0,setting.length-2))
  sources_num.map( source => {
    load_source_num(source)
  })

  restore_options()
});
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('sources-btn').addEventListener('click', toggle_page);
document.getElementById('settings-btn').addEventListener('click', toggle_page);
