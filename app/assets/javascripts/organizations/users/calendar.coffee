$ ->
  role_type = $('meta[name="sail-role-type"]').attr 'content'
  $('table.conversations.calendar').each ->
    table = this
    page = parseInt $(this).attr('page')
    if role_type == 'univs'
      user_type = 'teacher'
    else
      user_type = 'student'
    $.ajax {
      url: '/organizations/ajax/calendar/waiting_' + user_type + '_conversations.json?page=' + page,
      success: (json) ->
        cols = $('.time', table)
        cols.removeClass 'waiting'
        for time of json
          col = cols.filter '[datetime="' + time + '"]'
          if col.filter('.matched').length == 0
            col.filter(':not(.disabled)').addClass 'waiting'
    }
    $('.time.matched', table).each ->
      if role_type == 'nhs'
        time = $(this).attr('datetime')
        $('.time[datetime="' + time + '"]:not(.disabled)').addClass('disabled')
