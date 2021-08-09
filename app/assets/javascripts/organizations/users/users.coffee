# ユーザー情報の項目選択 (対象HTMLにdata-nameがないとだめです)
$ ->

  # ボタンのアクティブ/非アクティブのクラス
  active = 'btn-primary'
  inactive = 'btn-outline-primary'

  # 選択項目からinput要素を更新します
  update_inputs_by = (group, selected) ->
    $('input', group).attr('value', '')
    for hobby, i in selected
      input = $('input', group).get(i)
      $(input).val $(hobby).data('id')

  # 選択を有効にします
  enable = (elem) ->
    $(elem).removeClass inactive
    $(elem).addClass active

  # 選択を無効にします
  disable = (elem) ->
    $(elem).removeClass active
    $(elem).addClass inactive

  # リストから特定要素を消す
  remove = (examee, values) ->
    i = $.inArray(examee, values)
    values.splice(i, 1)

  # 数値またはデフォルト
  num_data = (elem, name, default_value) ->
    num = $(elem).data name
    if num
      num = parseInt(num)
      if isNaN(num)
        num = default_value
    else
      num = default_value
    num


  $('body.org .new .multiple, body.org .edit .multiple').each ->
    $(this).filter('.hobbies, .purposes').each ->
      group = $(this)
      selected = []
      name = group.data('name')
      upto = num_data(this, 'upto', 3)

      $('input', group).remove
      for i in [1..upto]
        group.append('<input type="hidden" name="' + name + '[]" value="">')

      $('.btn.' + active, this).each ->
        i = selected.length - 1
        input = $('input', group).get(i)
        $(input).val($(this).data('id'))
        selected.push(this)

      $('.btn', this).click ->
        if $(this).hasClass(inactive)
          if $.inArray(this, selected) < 0
            selected.push(this)
          enable($(this))
          if selected.length > upto
            last = selected.shift()
            disable($(last))
        else if $(this).hasClass(active)
          selected = remove(this, selected)
          disable($(this))

        update_inputs_by(group, selected)
