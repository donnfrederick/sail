module UserAccessDecorator
  def user_name
    if user.nil?
      ""
    elsif user.teacher?
      user.name_ja
    elsif user.student?
      user.name_en
    end
  end
end
