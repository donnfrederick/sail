module UserDecorator
  def gender_ja
    names = %w[不明 男性 女性]
    names[sex] || "その他"
  end

  def gender_en
    names = %w[unknown male female]
    names[sex] || "other"
  end

  def hobby_list
    hobbies.
      map {|h| user.teacher? ? h.name_ja : h.name_en }.
      join(", ")
  end

  def picture_full_url
    "#{ENV["APP_SERVICE_HOST"]}#{user.picture_url}"
  end
end
