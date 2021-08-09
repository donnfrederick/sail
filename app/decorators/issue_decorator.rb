module IssueDecorator
  def user_name
    if user.nil?
      ""
    elsif user.teacher?
      user.name_ja
    elsif user.student?
      user.name_en
    end
  end

  def month
    self.created_at.strftime("%Y-%m")
  end

  def type_name
    Issue::TYPE_NAMES[self.type]
  end

  def status
    if self.succeeded?
      "成功"
    else
      "失敗"
    end
  end

  def paid_price
    "#{self.price.to_s(:delimited)} US Cents"
  end
end
