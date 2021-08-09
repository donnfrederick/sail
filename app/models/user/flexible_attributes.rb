class User
  def assign_picture=(data)
    return if data.blank?

    self.picture = if data.is_a? ActionDispatch::Http::UploadedFile
                     data
                   else
                     StringFileIO.from_base64(data)
                   end
  end

  def assign_hobbies=(hobby_ids)
    return if hobby_ids.blank?

    hobby_ids.map!(&:to_i)

    before_hobby_ids = users_hobbies.pluck(:hobby_id)
    new_hobby_ids    = hobby_ids - before_hobby_ids
    reject_hobby_ids = before_hobby_ids - hobby_ids

    # 新しく選択したもの
    new_hobby_ids.each do |id|
      users_hobbies.build(hobby_id: id)
    end

    # 選択しなかったもの
    attribute_params = {}
    reject_hobby_ids.each_with_index do |id, index|
      attribute_params[index.to_s] = { id: id, _destroy: 1 }
    end
    self.hobbies_attributes = attribute_params
  end

  def assign_purposes=(purpose_ids)
    return if purpose_ids.blank?

    purpose_ids.map!(&:to_i)

    before_purpose_ids = users_purposes.pluck(:purpose_id)
    new_purpose_ids    = purpose_ids - before_purpose_ids
    reject_purpose_ids = before_purpose_ids - purpose_ids

    # 新しく選択したもの
    new_purpose_ids.each do |id|
      users_purposes.build(purpose_id: id)
    end

    # 選択しなかったもの
    attribute_params = {}
    reject_purpose_ids.each_with_index do |id, index|
      attribute_params[index.to_s] = { id: id, _destroy: 1 }
    end
    self.purposes_attributes = attribute_params
  end

  def assign_new_password(current_password, password, password_confirmation = nil)
    return self if current_password.blank?

    unless authenticate(current_password)
      errors[:base] << I18n.t("errors.authentication")
      return
    end

    self.password = password
    self.password_confirmation = password_confirmation

    self
  end
end
