$ ->
  $('#request_ajax_update')
    .on 'ajax:success', (event) ->
      response = event.detail[0]
      $('#updated_by_ajax').html(typeof response)
    .on 'ajax:error', (event) ->
      response = event.detail[0].response
      $('#updated_by_ajax').html(response)
